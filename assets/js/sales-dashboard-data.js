/**
 * sales-dashboard-data.js
 * Sample/demo data for the interactive Sales & Retail Performance dashboard.
 * This is illustrative data built to demonstrate dashboard design and
 * interactivity - it is not connected to any real client's live data.
 */
window.SALES_DATA = {

  months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],

  regions: {

    "All Regions": {
      revenueActual: [42000, 45500, 48200, 51000, 53500, 58000, 61200, 63500, 60800, 66500, 71200, 78500],
      revenueTarget: [45000, 45000, 47000, 49000, 51000, 54000, 57000, 59000, 60000, 62000, 65000, 70000],
      pipeline: { "Leads": 480, "Qualified": 260, "Proposal": 140, "Negotiation": 78, "Closed Won": 46 },
      revenueByCategory: { "Electronics": 210000, "Home Goods": 138000, "Apparel": 96000, "Groceries": 122000, "Other": 34000 },
      campaigns: [
        { name: "New Year Promo", spend: 4200, conversions: 310, revenue: 38500 },
        { name: "Easter Bundle", spend: 3100, conversions: 245, revenue: 27600 },
        { name: "Back to School", spend: 5000, conversions: 402, revenue: 51200 },
        { name: "Black Friday", spend: 8600, conversions: 690, revenue: 98400 },
        { name: "Festive Season", spend: 7200, conversions: 588, revenue: 82300 }
      ],
      segments: { "High Value": 18, "Mid Value": 34, "Low Value": 29, "New Customers": 19 }
    },

    "Greater Accra": {
      revenueActual: [19500, 21000, 22400, 23800, 24900, 27000, 28600, 29800, 28200, 31000, 33200, 36800],
      revenueTarget: [21000, 21000, 22000, 23000, 24000, 25500, 27000, 28000, 28500, 29500, 31000, 33000],
      pipeline: { "Leads": 220, "Qualified": 128, "Proposal": 70, "Negotiation": 40, "Closed Won": 24 },
      revenueByCategory: { "Electronics": 108000, "Home Goods": 62000, "Apparel": 48000, "Groceries": 51000, "Other": 16000 },
      campaigns: [
        { name: "New Year Promo", spend: 1900, conversions: 145, revenue: 18200 },
        { name: "Easter Bundle", spend: 1400, conversions: 112, revenue: 12900 },
        { name: "Back to School", spend: 2300, conversions: 189, revenue: 24500 },
        { name: "Black Friday", spend: 4000, conversions: 322, revenue: 46800 },
        { name: "Festive Season", spend: 3300, conversions: 271, revenue: 38900 }
      ],
      segments: { "High Value": 22, "Mid Value": 33, "Low Value": 26, "New Customers": 19 }
    },

    "Ashanti": {
      revenueActual: [12800, 13600, 14500, 15600, 16400, 17800, 18900, 19600, 18500, 20200, 21600, 23900],
      revenueTarget: [13500, 13500, 14000, 15000, 15500, 16500, 17500, 18000, 18500, 19000, 20000, 21500],
      pipeline: { "Leads": 150, "Qualified": 80, "Proposal": 42, "Negotiation": 23, "Closed Won": 14 },
      revenueByCategory: { "Electronics": 64000, "Home Goods": 44000, "Apparel": 30000, "Groceries": 41000, "Other": 11000 },
      campaigns: [
        { name: "New Year Promo", spend: 1300, conversions: 96, revenue: 11800 },
        { name: "Easter Bundle", spend: 980, conversions: 76, revenue: 8600 },
        { name: "Back to School", spend: 1550, conversions: 124, revenue: 15600 },
        { name: "Black Friday", spend: 2700, conversions: 214, revenue: 29800 },
        { name: "Festive Season", spend: 2250, conversions: 182, revenue: 25100 }
      ],
      segments: { "High Value": 15, "Mid Value": 35, "Low Value": 31, "New Customers": 19 }
    },

    "Western": {
      revenueActual: [9700, 10900, 11300, 11600, 12200, 13200, 13700, 14100, 14100, 15300, 16400, 17800],
      revenueTarget: [10500, 10500, 11000, 11000, 11500, 12000, 12500, 13000, 13000, 13500, 14000, 15500],
      pipeline: { "Leads": 110, "Qualified": 52, "Proposal": 28, "Negotiation": 15, "Closed Won": 8 },
      revenueByCategory: { "Electronics": 38000, "Home Goods": 32000, "Apparel": 18000, "Groceries": 30000, "Other": 7000 },
      campaigns: [
        { name: "New Year Promo", spend: 1000, conversions: 69, revenue: 8500 },
        { name: "Easter Bundle", spend: 720, conversions: 57, revenue: 6100 },
        { name: "Back to School", spend: 1150, conversions: 89, revenue: 11100 },
        { name: "Black Friday", spend: 1900, conversions: 154, revenue: 21800 },
        { name: "Festive Season", spend: 1650, conversions: 135, revenue: 18300 }
      ],
      segments: { "High Value": 12, "Mid Value": 32, "Low Value": 34, "New Customers": 22 }
    }
  }
};
