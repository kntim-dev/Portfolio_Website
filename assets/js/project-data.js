/**
 * project-data.js
 * Single source of truth for project.html detail pages.
 * Every entry here is real, verifiable work - no placeholder/example filler.
 */
window.PROJECT_DATA = {

  "safesight": {
    type: "project",
    category: "End-to-End Systems",
    title: "SafeSight: Real-Time Hazard Reporting App",
    tag: "Mobile Web App · GPS Geolocation · Back4App (Parse)",
    hero: "assets/img/portfolio/safesight/report-hazard-form.png",
    gallery: [
      { src: "assets/img/portfolio/safesight/report-hazard-entry.png", caption: "Report Hazard entry screen" },
      { src: "assets/img/portfolio/safesight/login-screen.png", caption: "SafeSight login screen" },
      { src: "assets/img/portfolio/safesight/award-photo.jpg", caption: "Receiving the 2nd Runner-Up award at Perseus Mining Edikan" }
    ],
    summary: [
      "Mine sites lacked a fast, structured, location-aware way to log safety hazards, which meant slow response times and poor incident documentation.",
      "Built a mobile-first application that lets field personnel log a hazard with GPS coordinates and photo or video evidence in under a minute, routed through a supervisor email workflow with instant visibility for the safety team.",
      "Awarded 2nd Runner-Up in the Perseus Mining Edikan innovation programme and adopted operationally for active hazard management on site."
    ],
    tools: ["Mobile-first Web App", "Back4App (Parse) backend", "GPS Geolocation", "Base64 media storage"],
    liveUrl: "https://devkwabs94.github.io/SafeSight"
  },

  "ore-tracking-system": {
    type: "project",
    category: "End-to-End Systems",
    title: "Ore Tracking & Fleet Management System",
    tag: "Excel VBA · KPI Dashboard Design · Data Modelling",
    hero: "assets/img/portfolio/Final Thumbnail Mine Fleet.JPG",
    videoSrc: "assets/img/portfolio/My Video.mp4",
    gallery: [],
    summary: [
      "Ore movement from the pit to the ROMpad had no unified way to track it in real time, which made fleet utilisation almost impossible to monitor or optimise.",
      "Built a fully integrated Excel VBA platform that traces ore from the excavator loading point through to the ROMpad stockpile, with dashboards surfacing truck cycle times and excavator productivity.",
      "In operational use on site. Management can now identify idle equipment time and act on it directly, and ore delivery accuracy to the crusher has improved."
    ],
    tools: ["Excel VBA", "KPI Dashboard Design", "Data Modelling"]
  },

  "weather-alert-system": {
    type: "project",
    category: "End-to-End Systems",
    title: "Acts of God: Automated Weather Alert & Response System",
    tag: "Python · Live Weather API · Scheduled Automation",
    hero: "assets/img/portfolio/weather/architecture-diagram.jpg",
    gallery: [
      { src: "assets/img/portfolio/weather/code.jpg", caption: "Core weather-fetching logic (rain_alert.py)" },
      { src: "assets/img/portfolio/weather/gmail-alerts.jpg", caption: "Live alert emails landing in the field team's inbox" }
    ],
    summary: [
      "Field and mining teams had no automated way to monitor weather conditions, so responses to rain, wind and storms were reactive rather than planned.",
      "Built a Python system that continuously queries the Open-Meteo API, evaluates rainfall probability, wind speed and thunderstorm codes against operational thresholds using shift-aligned time logic, then emails categorised alerts to field and management teams.",
      "Improved team preparedness ahead of weather events and reduced weather-related production stoppages by giving supervisors lead time to plan around forecasted conditions rather than reacting to them."
    ],
    tools: ["Python", "Open-Meteo API", "Threshold Logic", "Scheduled Automation", "Gmail Alerts"]
  },

  "facial-recognition-system": {
    type: "project",
    category: "End-to-End Systems",
    title: "Facial Recognition Attendance & Workforce Management System",
    tag: "Python · OpenCV · Pandas · SQLite",
    hero: "assets/img/portfolio/face.png",
    gallery: [],
    summary: [
      "Manual attendance tracking was slow, error-prone, and gave no real-time visibility for workforce planning.",
      "Built an automated system using Python and OpenCV to identify staff at check-in points, log attendance directly into a SQLite database, and generate workforce reports automatically via Pandas.",
      "Eliminated manual attendance errors, cut administrative processing time by more than 5 hours a week, and gave management real-time data for smarter shift planning."
    ],
    tools: ["Python", "OpenCV", "Pandas", "SQLite"]
  },

  "equipment-analysis-nks": {
    type: "project",
    category: "End-to-End Systems",
    title: "Equipment Performance Analysis, NKS Pit",
    tag: "Excel · Statistical Summaries · Dashboard Visualization",
    hero: "https://images.pexels.com/photos/28442180/pexels-photo-28442180.jpeg?auto=compress&cs=tinysrgb&w=1600",
    gallery: [],
    summary: [
      "Fleet performance at NKS Pit was hard to reason about because availability, utilisation and downtime data lived in separate, inconsistent records.",
      "Built an analytical Excel workbook covering excavator and haul truck availability, utilisation and downtime categorisation, with visualisations designed to isolate the biggest contributors to lost productive time.",
      "Gave management a repeatable framework for identifying and ranking equipment performance losses, rather than relying on anecdote."
    ],
    tools: ["Excel (advanced formulas)", "Statistical Summaries", "Dashboard Visualization"]
  },

  "sample-ticket-tool": {
    type: "project",
    category: "Automation & Tools",
    title: "Sample Ticket Generation & QA/QC Automation Tool",
    tag: "Excel VBA",
    hero: "assets/img/portfolio/code-1.png",
    gallery: [],
    summary: [
      "QA/QC sample tickets for drilling output were being typed manually, which was slow and left room for inconsistent labelling.",
      "Built an Excel VBA tool that generates structured sample tickets automatically, standardising Sample ID, QA/QC type (standard, blank, field duplicate) and category fields.",
      "Removed a manual, error-prone step from the data chain and enforced consistent QA/QC insertion across drilling output."
    ],
    tools: ["Excel VBA"]
  },

  "cert-knust": {
    type: "certification",
    title: "BSc. Geological Engineering",
    tag: "Kwame Nkrumah University of Science and Technology (KNUST), Ghana · 2015 - 2019",
    hero: "assets/img/portfolio/KNUST.png",
    summary: [
      "Second Class Upper Division. Coursework included Engineering Statistics, Mineral Resource Estimation, GIS and Remote Sensing, and Project Management."
    ]
  },

  "cert-bond": {
    type: "certification",
    title: "Data Analytics Certificate",
    tag: "Bond University",
    hero: "assets/img/portfolio/bond.png",
    summary: [
      "Certification covering core data analytics fundamentals, applied throughout subsequent dashboard and reporting work."
    ]
  },

  "cert-qgis": {
    type: "certification",
    title: "QGIS Certificate",
    tag: "Central University of Karnataka & State Institute of Urban Development, India",
    hero: "assets/img/portfolio/QGIS.png",
    summary: [
      "Certification in QGIS for spatial data analysis, underpinning the geospatial work behind the resource-estimation side of this portfolio."
    ]
  }

};
