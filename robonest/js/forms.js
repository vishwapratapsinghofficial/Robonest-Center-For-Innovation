/* Enquiry form: field validation + configurable submission (see CONFIG.FORM_ENDPOINT in data.js). */
(() => {
  const { CONFIG, COURSES } = window.ROBONEST, f = document.getElementById("enq"); if (!f) return;
  const sel = f.elements.course, st = document.getElementById("status");
  sel.insertAdjacentHTML("beforeend", COURSES.map(c => `<option value="${c.id}">${c.name}</option>`).join("") + '<option value="other">Not sure yet</option>');
  const pre = new URLSearchParams(location.search).get("course"); if (pre) sel.value = pre;
  const els = [...f.elements].filter(e => e.name);
  els.forEach(el => { const s = document.createElement("small"); s.className = "err"; s.id = el.name + "-e"; el.setAttribute("aria-describedby", s.id); el.closest("label").append(s); });

  function check(el) {
    const v = el.value.trim(); el.setCustomValidity(""); let m = "";
    if (el.required && !(el.type === "checkbox" ? el.checked : v)) m = el.type === "checkbox" ? "Tick this box so we can contact you." : "This field is required.";
    else if (el.type === "email" && v && !el.checkValidity()) m = "Enter an email like name@example.com.";
    else if (el.name === "phone" && !/^(\+91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/.test(v)) m = "Enter a valid 10-digit Indian mobile number.";
    el.setCustomValidity(m);
    document.getElementById(el.name + "-e").textContent = m;
    el.setAttribute("aria-invalid", !!m);
  }
  f.addEventListener("input", e => e.target.name && check(e.target));
  f.addEventListener("focusout", e => e.target.name && check(e.target));

  const mailto = d => {
    const n = sel.selectedOptions[0].text;
    const body = `Student: ${d.student}\nParent/guardian: ${d.guardian || "-"}\nEmail: ${d.email}\nPhone: ${d.phone}\nAge/class: ${d.age || "-"}\nCourse: ${n}\nLearning mode: ${d.mode || "-"}\nMessage: ${d.message || "-"}`;
    return `mailto:${CONFIG.EMAIL}?subject=${encodeURIComponent("Enquiry: " + n)}&body=${encodeURIComponent(body)}`;
  };
  const say = (cls, html) => { st.className = cls; st.innerHTML = html; };

  f.addEventListener("submit", async e => {
    e.preventDefault();
    els.forEach(check);
    const bad = els.find(x => !x.validity.valid); if (bad) { bad.focus(); return; }
    const d = Object.fromEntries(new FormData(f)), b = f.querySelector("[type=submit]");
    const fallback = `<a href="${mailto(d)}">Open your email app</a> and press Send to deliver this enquiry.`;
    if (!CONFIG.FORM_ENDPOINT) return say("warn", `Online submission is not enabled yet, so your enquiry has <strong>not</strong> been sent. ${fallback}`);
    b.disabled = true; b.textContent = "Sending…";
    try {
      const r = await fetch(CONFIG.FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
      if (!r.ok) throw new Error(r.status);
      say("ok", "Your enquiry was sent. We will get back to you using the details you gave."); f.reset();
    } catch { say("warn", `We could not send your enquiry. ${fallback}`); }
    finally { b.disabled = false; b.textContent = "Send enquiry"; }
  });
})();
