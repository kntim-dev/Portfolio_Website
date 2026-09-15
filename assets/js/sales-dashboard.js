/**
 * sales-dashboard.js
 * Renders KPI cards and Chart.js charts from window.SALES_DATA, and wires up
 * the Region, Period, and Campaign Metric filters so every chart updates
 * live on change.
 */
(function () {
  "use strict";

  const GLOW_CYAN = "#38f2e0";
  const GLOW_VIOLET = "#8b6bff";
  const GLOW_PINK = "#ff5fa2";
  const AMBER = "#ffb347";
  const SOFT = "#b9c2d0";
  const PALETTE = [GLOW_CYAN, GLOW_VIOLET, GLOW_PINK, AMBER, "#6bd1ff", "#c792ea"];

  const PERIOD_RANGES = {
    full: [0, 12], q1: [0, 3], q2: [3, 6], q3: [6, 9], q4: [9, 12], h1: [0, 6], h2: [6, 12]
  };
  const PERIOD_LABELS = {
    full: "Full Year", q1: "Q1", q2: "Q2", q3: "Q3", q4: "Q4", h1: "H1", h2: "H2"
  };
  const METRIC_LABELS = { roi: "ROI %", conversions: "Conversions", revenue: "Revenue (GHS)" };

  let charts = {};

  function fmtGHS(n) { return "GHS " + Math.round(n).toLocaleString("en-US"); }

  function baseOptions(extra) {
    return Object.assign({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: SOFT, font: { size: 11 } } },
        tooltip: { backgroundColor: "#0b0f19", borderColor: "rgba(255,255,255,.15)", borderWidth: 1 }
      },
      scales: {}
    }, extra || {});
  }
  function gridColor() { return "rgba(255,255,255,0.07)"; }
  function tickColor() { return SOFT; }
  function destroy(id) { if (charts[id]) { charts[id].destroy(); delete charts[id]; } }

  function sliceRange(arr, range) { return arr.slice(range[0], range[1]); }

  function renderKPIs(data, range, periodLabel, metricKey) {
    const revenueActual = sliceRange(data.revenueActual, range);
    const revenueTarget = sliceRange(data.revenueTarget, range);
    const totalRevenue = revenueActual.reduce((a, b) => a + b, 0);
    const totalTarget = revenueTarget.reduce((a, b) => a + b, 0);
    const vsTarget = ((totalRevenue - totalTarget) / totalTarget) * 100;

    const stages = data.pipeline;
    const leads = stages["Leads"] || 0;
    const closedWon = stages["Closed Won"] || 0;
    const conversionRate = leads ? (closedWon / leads) * 100 : 0;

    let bestCampaign = null, bestRoi = -Infinity;
    data.campaigns.forEach((c) => {
      const roi = ((c.revenue - c.spend) / c.spend) * 100;
      if (roi > bestRoi) { bestRoi = roi; bestCampaign = c; }
    });

    const kpis = [
      { label: "Revenue (" + periodLabel + ")", value: fmtGHS(totalRevenue) },
      { label: "Revenue vs Target", value: (vsTarget >= 0 ? "+" : "") + vsTarget.toFixed(1) + "%", delta: vsTarget >= 0 ? "up" : "down" },
      { label: "Pipeline Conversion", value: conversionRate.toFixed(1) + "%", sub: leads + " leads &rarr; " + closedWon + " closed won" },
      { label: "Deals Closed", value: closedWon },
      { label: "Top Campaign (" + METRIC_LABELS[metricKey] + ")", value: bestCampaign.name, sub: "+" + bestRoi.toFixed(0) + "% ROI" }
    ];

    document.getElementById("kpi-grid").innerHTML = kpis.map((k) => `
      <div class="kpi-card">
        <span class="kpi-label">${k.label}</span>
        <span class="kpi-value">${k.value}</span>
        ${k.delta ? `<span class="kpi-delta ${k.delta}">${k.delta === "up" ? "▲" : "▼"} vs target</span>` : ""}
        ${k.sub ? `<span class="kpi-delta">${k.sub}</span>` : ""}
      </div>
    `).join("");
  }

  function renderCharts(data, months, range, metricKey) {
    const rangeMonths = sliceRange(months, range);
    const ctxRevenue = document.getElementById("chart-revenue").getContext("2d");
    destroy("revenue");
    charts.revenue = new Chart(ctxRevenue, {
      type: "line",
      data: {
        labels: rangeMonths,
        datasets: [
          { label: "Actual", data: sliceRange(data.revenueActual, range), borderColor: GLOW_CYAN, backgroundColor: "rgba(56,242,224,.15)", fill: true, tension: 0.35, pointRadius: 3 },
          { label: "Target", data: sliceRange(data.revenueTarget, range), borderColor: GLOW_VIOLET, borderDash: [6, 5], fill: false, tension: 0.35, pointRadius: 0 }
        ]
      },
      options: baseOptions({
        scales: {
          x: { grid: { color: gridColor() }, ticks: { color: tickColor() } },
          y: { grid: { color: gridColor() }, ticks: { color: tickColor(), callback: (v) => "GHS " + (v / 1000) + "k" } }
        }
      })
    });

    const stageEntries = Object.entries(data.pipeline);
    const ctxPipeline = document.getElementById("chart-pipeline").getContext("2d");
    destroy("pipeline");
    charts.pipeline = new Chart(ctxPipeline, {
      type: "bar",
      data: { labels: stageEntries.map((e) => e[0]), datasets: [{ label: "Deals", data: stageEntries.map((e) => e[1]), backgroundColor: PALETTE, borderRadius: 6 }] },
      options: baseOptions({
        indexAxis: "y",
        plugins: { legend: { display: false }, tooltip: baseOptions().plugins.tooltip },
        scales: {
          x: { grid: { color: gridColor() }, ticks: { color: tickColor() } },
          y: { grid: { display: false }, ticks: { color: tickColor() } }
        }
      })
    });

    const catEntries = Object.entries(data.revenueByCategory);
    const ctxCategory = document.getElementById("chart-category").getContext("2d");
    destroy("category");
    charts.category = new Chart(ctxCategory, {
      type: "doughnut",
      data: { labels: catEntries.map((e) => e[0]), datasets: [{ data: catEntries.map((e) => e[1]), backgroundColor: PALETTE, borderColor: "#05070d", borderWidth: 2 }] },
      options: baseOptions({ cutout: "62%" })
    });

    const ctxCampaigns = document.getElementById("chart-campaigns").getContext("2d");
    destroy("campaigns");
    const campaignValues = data.campaigns.map((c) => {
      if (metricKey === "conversions") return c.conversions;
      if (metricKey === "revenue") return c.revenue;
      return +(((c.revenue - c.spend) / c.spend) * 100).toFixed(1);
    });
    charts.campaigns = new Chart(ctxCampaigns, {
      type: "bar",
      data: { labels: data.campaigns.map((c) => c.name), datasets: [{ label: METRIC_LABELS[metricKey], data: campaignValues, backgroundColor: GLOW_PINK, borderRadius: 6 }] },
      options: baseOptions({
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: tickColor(), maxRotation: 20, minRotation: 0 } },
          y: {
            grid: { color: gridColor() }, ticks: {
              color: tickColor(),
              callback: (v) => metricKey === "roi" ? v + "%" : (metricKey === "revenue" ? "GHS " + (v/1000) + "k" : v)
            }
          }
        }
      })
    });

    const segEntries = Object.entries(data.segments);
    const ctxSegments = document.getElementById("chart-segments").getContext("2d");
    destroy("segments");
    charts.segments = new Chart(ctxSegments, {
      type: "pie",
      data: { labels: segEntries.map((e) => e[0]), datasets: [{ data: segEntries.map((e) => e[1]), backgroundColor: PALETTE, borderColor: "#05070d", borderWidth: 2 }] },
      options: baseOptions()
    });
  }

  function currentFilters() {
    return {
      region: document.getElementById("region-select").value,
      period: document.getElementById("period-select").value,
      metric: document.getElementById("metric-select").value
    };
  }

  function render() {
    const { region, period, metric } = currentFilters();
    const data = window.SALES_DATA.regions[region];
    const range = PERIOD_RANGES[period];
    renderKPIs(data, range, PERIOD_LABELS[period], metric);
    renderCharts(data, window.SALES_DATA.months, range, metric);
  }

  function showError(message) {
    const box = document.getElementById("dash-error");
    if (!box) return;
    box.style.display = "block";
    box.innerHTML = "<strong>Dashboard failed to load:</strong> " + message;
  }

  function init() {
    if (typeof Chart === "undefined") {
      showError("the Chart.js library did not load (likely a network/CDN issue). Charts cannot render without it.");
      return;
    }
    Chart.defaults.font.family = "Roboto, sans-serif";

    const regionSelect = document.getElementById("region-select");
    const regionNames = Object.keys(window.SALES_DATA.regions);
    regionSelect.innerHTML = regionNames.map((r) => `<option value="${r}">${r}</option>`).join("");

    ["region-select", "period-select", "metric-select"].forEach((id) => {
      document.getElementById(id).addEventListener("change", render);
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Chart.js is loaded from a CDN via a normal <script> tag before this file,
    // so by DOMContentLoaded it should already be present. Retry briefly in
    // case of a slow connection before giving up and showing a visible error.
    let attempts = 0;
    (function tryInit() {
      if (typeof Chart !== "undefined") { init(); return; }
      attempts++;
      if (attempts < 20) { window.setTimeout(tryInit, 150); return; }
      init(); // final attempt - will show the visible error message
    })();
  });
})();
