(() => {
  "use strict";

  // ---------- DOM helpers ----------
  const $ = (id) => document.getElementById(id);

  // Theme
  const btnDark = $("btnDark");
  const btnLight = $("btnLight");
  const THEME_KEY = "ccm_theme";

  function applyTheme(mode) {
    const isLight = mode === "light";
    document.body.classList.toggle("light", isLight);
    btnDark.classList.toggle("active", !isLight);
    btnLight.classList.toggle("active", isLight);
    localStorage.setItem(THEME_KEY, mode);
  }

  function initTheme() {
    applyTheme(localStorage.getItem(THEME_KEY) || "light");
    btnDark.addEventListener("click", () => applyTheme("dark"));
    btnLight.addEventListener("click", () => applyTheme("light"));
  }

  // ---------- Data ----------
  const SUBSIDIARIES = [
    { name:"Asia HQ", bdays:2 },{ name:"Emea HQ", bdays:2 },{ name:"Americas HQ", bdays:2 },
    { name:"Australia", bdays:2 }, { name:"New Zealand", bdays:2 }, { name:"Vietnam", bdays:2 },
    { name:"Thailand", bdays:2 }, { name:"Singapore", bdays:2 }, { name:"South East Asia Multi Country", bdays:2 },
    { name:"Indonesia", bdays:2 }, { name:"Malaysia", bdays:2 }, { name:"Brunei", bdays:2 }, { name:"Cambodia", bdays:2 },
    { name:"Philippines", bdays:2 }, { name:"Myanmar", bdays:2 }, { name:"Canada", bdays:2 }, { name:"(Unspecified)", bdays:2 },

    { name:"MEA EMCC Scale", bdays:3 }, { name:"Iran", bdays:3 }, { name:"Israel", bdays:3 }, { name:"Uganda", bdays:3 },
    { name:"Angola", bdays:3 }, { name:"Egypt", bdays:3 }, { name:"South Africa", bdays:3 }, { name:"Jordan", bdays:3 },
    { name:"Pakistan", bdays:3 }, { name:"Iraq", bdays:3 }, { name:"Qatar", bdays:3 }, { name:"Kuwait", bdays:3 },
    { name:"Botswana", bdays:3 }, { name:"Bahrain", bdays:3 }, { name:"Côte d'Ivoire", bdays:3 }, { name:"Nigeria", bdays:3 },
    { name:"Algeria", bdays:3 }, { name:"Oman", bdays:3 }, { name:"Zambia", bdays:3 }, { name:"Kenya", bdays:3 },
    { name:"Mauritius", bdays:3 }, { name:"Morocco", bdays:3 }, { name:"Ghana", bdays:3 }, { name:"Libya", bdays:3 },
    { name:"Turkey", bdays:3 }, { name:"Saudi Arabia", bdays:3 }, { name:"Senegal", bdays:3 }, { name:"Lebanon", bdays:3 },
    { name:"United Arab Emirates", bdays:3 }, { name:"Cameroon", bdays:3 }, { name:"Tunisia", bdays:3 }, { name:"France", bdays:3 },

    { name:"Greece", bdays:2 }, { name:"Slovenia", bdays:2 }, { name:"Slovakia", bdays:2 }, { name:"Kazakhstan", bdays:2 },
    { name:"Ukraine", bdays:2 }, { name:"Bulgaria", bdays:2 }, { name:"Georgia", bdays:2 }, { name:"Serbia", bdays:2 },
    { name:"Montenegro", bdays:2 }, { name:"Azerbaijan", bdays:2 }, { name:"Hungary", bdays:2 }, { name:"North Macedonia", bdays:2 },
    { name:"Turkmenistan", bdays:2 }, { name:"Czechia", bdays:2 }, { name:"Malta", bdays:2 }, { name:"Cyprus", bdays:2 },
    { name:"Russia", bdays:2 }, { name:"Moldova", bdays:2 }, { name:"Belarus", bdays:2 }, { name:"Lithuania", bdays:2 },
    { name:"Armenia", bdays:2 }, { name:"Albania", bdays:2 }, { name:"Poland", bdays:2 }, { name:"Kosovo", bdays:2 },
    { name:"Romania", bdays:2 }, { name:"Estonia", bdays:2 }, { name:"Bosnia and Herzegovina", bdays:2 }, { name:"Latvia", bdays:2 },
    { name:"Croatia", bdays:2 },

    { name:"Germany", bdays:2 }, { name:"Hong Kong", bdays:2 }, { name:"Taiwan", bdays:2 }, { name:"China", bdays:2 },
    { name:"Sri Lanka", bdays:2 }, { name:"India SC", bdays:2 }, { name:"Bangladesh", bdays:2 }, { name:"Japan", bdays:2 },
    { name:"Korea", bdays:2 },

    { name:"Trinidad & Tobago", bdays:2 }, { name:"Uruguay", bdays:2 }, { name:"Venezuela", bdays:2 }, { name:"Colombia", bdays:2 },
    { name:"El Salvador", bdays:2 }, { name:"Caribbean New Markets", bdays:2 }, { name:"Puerto Rico", bdays:2 }, { name:"Ecuador", bdays:2 },
    { name:"LNM - HQ", bdays:2 }, { name:"Latin America HQ", bdays:2 }, { name:"Honduras", bdays:2 }, { name:"Panama", bdays:2 },
    { name:"Chile", bdays:2 }, { name:"Guatemala", bdays:2 }, { name:"Paraguay", bdays:2 }, { name:"Brazil", bdays:2 },
    { name:"Bolivia", bdays:2 }, { name:"Costa Rica", bdays:2 }, { name:"Jamaica", bdays:2 }, { name:"Dominican Republic", bdays:2 },
    { name:"Peru", bdays:2 }, { name:"Mexico", bdays:2 }, { name:"Argentina", bdays:2 },

    { name:"Netherlands", bdays:2 }, { name:"Switzerland", bdays:2 }, { name:"United Kingdom", bdays:2 }, { name:"United States", bdays:2 },
    { name:"Italy", bdays:2 }, { name:"Norway", bdays:2 }, { name:"Spain", bdays:2 }, { name:"Denmark", bdays:2 }, { name:"Austria", bdays:2 },
    { name:"Belgium", bdays:2 }, { name:"Ireland", bdays:2 }, { name:"Iceland", bdays:2 }, { name:"Portugal", bdays:2 }, { name:"Finland", bdays:2 },
    { name:"Sweden", bdays:2 }, { name:"Luxembourg", bdays:2 },
  ];

  // Preserve order, but also build fast lookup map (case-insensitive)
  const byName = new Map();
  // Precompute lowercase for filtering
  const items = SUBSIDIARIES.map((s) => ({
    name: s.name,
    bdays: s.bdays,
    lower: s.name.toLowerCase()
  }));
  for (const s of items) byName.set(s.lower, s);

  // ---------- DOM ----------
  const combo = $("combo");
  const comboBtn = $("comboBtn");
  const comboList = $("comboList");
  const subsidiaryInput = $("subsidiaryInput");
  const rangeHint = $("rangeHint");
  const unknownHint = $("unknownHint");

  const elCCM = $("ccmDate");
  const elCPM = $("cpmDate");

  const overallChip = $("overallChip");
  const overallText = $("overallText");
  const overallShort = $("overallShort");
  const cpmEndEl = $("cpmEnd");
  const cpmStatusEl = $("cpmStatus");
  const ccmEndEl = $("ccmEnd");
  const ccmStatusEl = $("ccmStatus");
  const jsonOut = $("jsonOut");
  const toast = $("toast");
  const todayText = $("todayText");

  // Today (date-only)
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
  todayText.textContent = "As of: " + fmt(today);

  // ---------- Utilities ----------
  function parseDate(val) {
    if (!val) return null;
    const [y, m, d] = val.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d, 12, 0, 0);
  }

  function stamp(d) {
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function fmt(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function addCalendarDays(d, days) {
    const x = new Date(d);
    x.setDate(x.getDate() + days);
    return x;
  }

  // N business days, weekend = Sat/Sun
  function addBusinessDays(startDate, businessDays) {
    let d = new Date(startDate);
    let added = 0;
    while (added < businessDays) {
      d = addCalendarDays(d, 1);
      const dow = d.getDay(); // 0 Sun .. 6 Sat
      if (dow !== 0 && dow !== 6) added++;
    }
    return d;
  }

  function setOverall(ok, text) {
    overallChip.classList.remove("good", "bad");
    overallChip.classList.add(ok ? "good" : "bad");
    overallText.textContent = ok ? "DATA VALID" : "DATA NOT VALID";
    overallShort.textContent = text;
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("show"), 900);
  }

  // ---------- ComboBox ----------
  function isOpen() {
    return combo.classList.contains("open");
  }
  function openCombo() {
    if (!isOpen()) {
      combo.classList.add("open");
      combo.setAttribute("aria-expanded", "true");
    }
    renderMenu(); // keep results fresh
  }
  function closeCombo() {
    if (isOpen()) {
      combo.classList.remove("open");
      combo.setAttribute("aria-expanded", "false");
    }
  }
  function toggleCombo() {
    isOpen() ? closeCombo() : openCombo();
  }

  function selectedSubsidiary() {
    const key = (subsidiaryInput.value || "").trim().toLowerCase();
    return byName.get(key) || null;
  }

  function updateHint() {
    const s = selectedSubsidiary();
    if (s) {
      rangeHint.textContent = `CCM Range: +/- ${s.bdays} Days`;
      unknownHint.style.display = "none";
    } else {
      rangeHint.textContent = "CCM Range: —";
      unknownHint.style.display = subsidiaryInput.value.trim() ? "block" : "none";
    }
  }

  // Cache DOM nodes for full list (fast)
  const optionNodes = items.map((s) => {
    const item = document.createElement("div");
    item.className = "combo-item";
    item.setAttribute("role", "option");
    item.setAttribute("tabindex", "-1");
    item.dataset.value = s.name;
    item.innerHTML = `<span>${escapeHtml(s.name)}</span><small>+/- ${s.bdays} Days</small>`;
    // mousedown to prevent blur before selection
    item.addEventListener("mousedown", (e) => {
      e.preventDefault();
      selectSubsidiary(s.name);
    });
    return { s, node: item };
  });

  function renderMenu() {
    const q = (subsidiaryInput.value || "").trim().toLowerCase();
    if (!q) {
      // show all, preserve original order
      comboList.replaceChildren(...optionNodes.map(o => o.node));
      return;
    }

    const filtered = [];
    for (const o of optionNodes) {
      if (o.s.lower.includes(q)) filtered.push(o.node);
    }

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "combo-empty";
      empty.textContent = "No matches";
      comboList.replaceChildren(empty);
      return;
    }

    comboList.replaceChildren(...filtered);
  }

  function selectSubsidiary(name) {
    subsidiaryInput.value = name;
    updateHint();
    closeCombo();
    if (elCCM.value || elCPM.value) calculate();
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  // Micro-debounce for input filtering (keeps UI snappy)
  let inputTimer = 0;
  function onType() {
    window.clearTimeout(inputTimer);
    inputTimer = window.setTimeout(() => {
      openCombo();
      updateHint();
    }, 10);
  }

  // Events
  comboBtn.addEventListener("click", () => {
    toggleCombo();
    subsidiaryInput.focus();
  });
  subsidiaryInput.addEventListener("focus", openCombo);
  subsidiaryInput.addEventListener("input", onType);
  subsidiaryInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCombo();
      return;
    }
    if (e.key === "Enter") {
      const s = selectedSubsidiary();
      if (s) {
        closeCombo();
        calculate();
      } else {
        // select first visible option if any
        const first = comboList.querySelector(".combo-item");
        if (first) selectSubsidiary(first.dataset.value);
      }
      e.preventDefault();
    }
  });

  document.addEventListener("mousedown", (e) => {
    if (!combo.contains(e.target)) closeCombo();
  });

  // ---------- Calculator ----------
  function calculate() {
    const sel = selectedSubsidiary();
    const ccm = parseDate(elCCM.value);
    const cpm = parseDate(elCPM.value);

    // reset outputs quickly
    cpmEndEl.textContent = "—";
    cpmStatusEl.textContent = "—";
    ccmEndEl.textContent = "—";
    ccmStatusEl.textContent = "—";

    if (!sel) {
      setOverall(false, "Select a valid subsidiary.");
      jsonOut.value = JSON.stringify({ issues: ["Select a valid subsidiary."] }, null, 2);
      return null;
    }
    if (!ccm) {
      setOverall(false, "Enter CCM date.");
      jsonOut.value = JSON.stringify({ issues: ["Enter CCM date."] }, null, 2);
      return null;
    }
    if (!cpm) {
      setOverall(false, "Enter CPM date.");
      jsonOut.value = JSON.stringify({ issues: ["Enter CPM date."] }, null, 2);
      return null;
    }

    // Formula
    const cpmEnd = addCalendarDays(cpm, 4);
    const ccmEnd = addBusinessDays(ccm, sel.bdays);

    const cpmExpired = stamp(today) > stamp(cpmEnd);
    const ccmExpired = stamp(today) > stamp(ccmEnd);

    cpmEndEl.textContent = fmt(cpmEnd);
    cpmStatusEl.textContent = cpmExpired ? "EXPIRED" : "VALID";
    ccmEndEl.textContent = fmt(ccmEnd);
    ccmStatusEl.textContent = ccmExpired ? "EXPIRED" : "VALID";

    const overallValid = !(cpmExpired || ccmExpired);
    const short = overallValid
      ? "Both CPM and CCM are still valid."
      : (cpmExpired && ccmExpired) ? "Both CPM and CCM are expired."
      : cpmExpired ? "CPM is expired." : "CCM is expired.";

    setOverall(overallValid, short);

    const payload = {
      asOf: fmt(today),
      subsidiary: sel.name,
      cpmDate: fmt(cpm),
      cpmEndDate: fmt(cpmEnd),
      cpmExpired,
      ccmDate: fmt(ccm),
      ccmBusinessDays: sel.bdays,
      ccmEndDate: fmt(ccmEnd),
      ccmExpired,
      overallValid
    };

    jsonOut.value = JSON.stringify(payload, null, 2);
    return payload;
  }

  // Buttons
  $("calcBtn").addEventListener("click", calculate);

  $("resetBtn").addEventListener("click", () => {
    subsidiaryInput.value = "";
    elCCM.value = "";
    elCPM.value = "";
    closeCombo();
    updateHint();
    renderMenu();

    overallChip.classList.remove("good", "bad");
    overallText.textContent = "Waiting for input";
    overallShort.textContent = "—";
    cpmEndEl.textContent = "—";
    cpmStatusEl.textContent = "—";
    ccmEndEl.textContent = "—";
    ccmStatusEl.textContent = "—";
    jsonOut.value = "";
  });

  $("copyBtn").addEventListener("click", async () => {
    const payload = calculate();
    const text = payload
      ? `As of ${payload.asOf} | ${payload.subsidiary} | CPM END: ${payload.cpmEndDate} (${payload.cpmExpired ? "EXPIRED" : "VALID"}) | CCM END: ${payload.ccmEndDate} (${payload.ccmExpired ? "EXPIRED" : "VALID"}) | FINAL: ${payload.overallValid ? "DATA VALID" : "DATA NOT VALID"}`
      : (jsonOut.value || "");

    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied!");
    } catch {
      jsonOut.focus();
      jsonOut.select();
      document.execCommand("copy");
      showToast("Copied (fallback)");
    }
  });

  // Auto-calc when dates change (only if subsidiary valid)
  const autoCalc = () => { if (selectedSubsidiary()) calculate(); };
  elCCM.addEventListener("input", autoCalc);
  elCPM.addEventListener("input", autoCalc);

  // ---------- Init ----------
  initTheme();
  updateHint();
  renderMenu();
})();
