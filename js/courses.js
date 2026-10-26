/* Course catalogue: search, category + level filters, sorting, empty state. */
(() => {
  const { COURSES } = window.ROBONEST, $ = id => document.getElementById(id);
  const q = $("q"), cat = $("cat"), lvl = $("lvl"), sort = $("sort");
  cat.insertAdjacentHTML("beforeend", [...new Set(COURSES.map(c => c.cat))].map(x => `<option>${x}</option>`).join(""));
  const pre = new URLSearchParams(location.search).get("cat"); if (pre) cat.value = pre;
  function draw() {
    const r = COURSES.filter(c => c.name.toLowerCase().includes(q.value.trim().toLowerCase()) && (!cat.value || c.cat === cat.value) && (!lvl.value || c.level === lvl.value))
      .sort((a, b) => sort.value === "za" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
    $("list").innerHTML = r.map(window.RN.card).join("");
    $("empty").hidden = r.length > 0;
    $("count").textContent = `${r.length} of ${COURSES.length} courses`;
    window.RN.reveal();
  }
  [q, cat, lvl, sort].forEach(e => e.addEventListener("input", draw));
  $("clear").addEventListener("click", () => { q.value = cat.value = lvl.value = ""; sort.value = "az"; draw(); });
  draw();
})();
