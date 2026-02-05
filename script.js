
    // Theme
    const btnDark = document.getElementById("btnDark");
    const btnLight = document.getElementById("btnLight");
    function applyTheme(mode){
      document.body.classList.toggle("light", mode === "light");
      btnDark.classList.toggle("active", mode !== "light");
      btnLight.classList.toggle("active", mode === "light");
      localStorage.setItem("ccm_theme", mode);
    }
    btnDark.addEventListener("click", () => applyTheme("dark"));
    btnLight.addEventListener("click", () => applyTheme("light"));
    applyTheme(localStorage.getItem("ccm_theme") || "dark");

    const SUBSIDIARIES = [
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

    const byName = new Map();
    for (const s of SUBSIDIARIES) byName.set(s.name.toLowerCase(), s);

    // DOM
    const combo = document.getElementById("combo");
    const comboBtn = document.getElementById("comboBtn");
    const comboList = document.getElementById("comboList");
    const subsidiaryInput = document.getElementById("subsidiaryInput");
    const rangeHint = document.getElementById("rangeHint");
    const unknownHint = document.getElementById("unknownHint");

    const elCCM = document.getElementById("ccmDate");
    const elCPM = document.getElementById("cpmDate");

    const overallChip = document.getElementById("overallChip");
    const overallText = document.getElementById("overallText");
    const overallShort = document.getElementById("overallShort");
    const cpmEndEl = document.getElementById("cpmEnd");
    const cpmStatusEl = document.getElementById("cpmStatus");
    const ccmEndEl = document.getElementById("ccmEnd");
    const ccmStatusEl = document.getElementById("ccmStatus");
    const jsonOut = document.getElementById("jsonOut");
    const toast = document.getElementById("toast");

    // Today
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
    document.getElementById("todayText").textContent = "As of: " + fmt(today);

    // helpers
    function parseDate(val){
      if (!val) return null;
      const [y,m,d] = val.split("-").map(Number);
      if (!y || !m || !d) return null;
      return new Date(y, m-1, d, 12, 0, 0);
    }
    function stamp(d){ return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()); }
    function fmt(d){
      const y = d.getFullYear();
      const m = String(d.getMonth()+1).padStart(2,"0");
      const day = String(d.getDate()).padStart(2,"0");
      return `${y}-${m}-${day}`;
    }
    function addCalendarDays(d, days){
      const x = new Date(d.getTime());
      x.setDate(x.getDate() + days);
      return x;
    }
    function addBusinessDays(startDate, businessDays){
      let d = new Date(startDate.getTime());
      let added = 0;
      while (added < businessDays){
        d = addCalendarDays(d, 1);
        const day = d.getDay();
        const isWeekend = (day === 0 || day === 6);
        if (!isWeekend) added++;
      }
      return d;
    }
    function setOverall(ok, text){
      overallChip.classList.remove("good","bad");
      overallChip.classList.add(ok ? "good" : "bad");
      overallText.textContent = ok ? "DATA VALID" : "DATA NOT VALID";
      overallShort.textContent = text;
    }
    function showToast(msg){
      toast.textContent = msg;
      toast.classList.add("show");
      setTimeout(()=>toast.classList.remove("show"), 900);
    }

    function escapeHtml(str){
      return str.replace(/[&<>"']/g, (c) => ({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
      }[c]));
    }

    function openCombo(){
      combo.classList.add("open");
      combo.setAttribute("aria-expanded","true");
      renderMenu();
    }
    function closeCombo(){
      combo.classList.remove("open");
      combo.setAttribute("aria-expanded","false");
      for (const el of comboList.querySelectorAll(".combo-item")) el.setAttribute("aria-selected","false");
    }
    function toggleCombo(){
      combo.classList.contains("open") ? closeCombo() : openCombo();
    }

    function getSelectedSubsidiary(){
      const key = (subsidiaryInput.value || "").trim().toLowerCase();
      return byName.get(key) || null;
    }

    function updateHint(){
      const s = getSelectedSubsidiary();
      if (s){
        rangeHint.textContent = `CCM Range: +/- ${s.bdays} Days`;

        unknownHint.style.display = "none";
      } else {
        rangeHint.textContent = "CCM Business Days: —";
        unknownHint.style.display = subsidiaryInput.value.trim() ? "block" : "none";
      }
    }

    function renderMenu(){
      const q = (subsidiaryInput.value || "").trim().toLowerCase();
      const list = Array.from(byName.values())
        // .sort((a,b)=>a.name.localeCompare(b.name))
        .filter(s => !q || s.name.toLowerCase().includes(q));

      comboList.innerHTML = "";

      if (list.length === 0){
        const empty = document.createElement("div");
        empty.className = "combo-empty";
        empty.textContent = "No matches";
        comboList.appendChild(empty);
        return;
      }

      for (const s of list){
        const item = document.createElement("div");
        item.className = "combo-item";
        item.setAttribute("role","option");
        item.setAttribute("tabindex","-1");
        item.setAttribute("aria-selected","false");
        item.dataset.value = s.name;
        item.innerHTML = `<span>${escapeHtml(s.name)}</span><small>+/- ${s.bdays} Days</small>`;

        item.addEventListener("mousedown", (e) => {
          e.preventDefault(); // prevent blur before select
          selectSubsidiary(s.name);
        });

        comboList.appendChild(item);
      }
    }

    function selectSubsidiary(name){
      subsidiaryInput.value = name;
      updateHint();
      closeCombo();
      if (elCCM.value || elCPM.value) calculate();
    }

    // combobox events
    comboBtn.addEventListener("click", () => { toggleCombo(); subsidiaryInput.focus(); });
    subsidiaryInput.addEventListener("focus", () => openCombo());
    subsidiaryInput.addEventListener("input", () => { openCombo(); renderMenu(); updateHint(); });
    subsidiaryInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape"){ closeCombo(); return; }
      if (e.key === "Enter"){
        const s = getSelectedSubsidiary();
        if (s){ closeCombo(); calculate(); }
        else{
          const first = comboList.querySelector(".combo-item");
          if (first) selectSubsidiary(first.dataset.value);
        }
        e.preventDefault();
      }
    });

    // close when clicking outside
    document.addEventListener("mousedown", (e) => { if (!combo.contains(e.target)) closeCombo(); });

    // calculator
    function calculate(){
      const sel = getSelectedSubsidiary();
      const ccm = parseDate(elCCM.value);
      const cpm = parseDate(elCPM.value);

      const issues = [];
      if (!sel) issues.push("Select a valid subsidiary.");
      if (!ccm) issues.push("Enter CCM date.");
      if (!cpm) issues.push("Enter CPM date.");

      cpmEndEl.textContent = "—";
      cpmStatusEl.textContent = "—";
      ccmEndEl.textContent = "—";
      ccmStatusEl.textContent = "—";

      if (issues.length){
        setOverall(false, issues[0]);
        jsonOut.value = JSON.stringify({ issues }, null, 2);
        return { ok:false, issues };
      }

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

    document.getElementById("calcBtn").addEventListener("click", calculate);

    document.getElementById("resetBtn").addEventListener("click", () => {
      subsidiaryInput.value = "";
      updateHint();
      closeCombo();
      elCCM.value = "";
      elCPM.value = "";

      overallChip.classList.remove("good","bad");
      overallText.textContent = "Waiting for input";
      overallShort.textContent = "—";

      cpmEndEl.textContent = "—";
      cpmStatusEl.textContent = "—";
      ccmEndEl.textContent = "—";
      ccmStatusEl.textContent = "—";
      jsonOut.value = "";
    });

    document.getElementById("copyBtn").addEventListener("click", async () => {
      const payload = calculate();
      const text =
        payload && payload.subsidiary
          ? `As of ${payload.asOf} | ${payload.subsidiary} | CPM END: ${payload.cpmEndDate} (${payload.cpmExpired ? "EXPIRED" : "VALID"}) | CCM END: ${payload.ccmEndDate} (${payload.ccmExpired ? "EXPIRED" : "VALID"}) | FINAL: ${payload.overallValid ? "DATA VALID" : "DATA NOT VALID"}`
          : jsonOut.value;

      try{
        await navigator.clipboard.writeText(text);
        showToast("Copied!");
      }catch(e){
        jsonOut.focus();
        jsonOut.select();
        document.execCommand("copy");
        showToast("Copied (fallback)");
      }
    });

    [elCCM, elCPM].forEach(el => el.addEventListener("input", () => {
      if (getSelectedSubsidiary()) calculate();
    }));

    // initial
    updateHint();
    renderMenu();
