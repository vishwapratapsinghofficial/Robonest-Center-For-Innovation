/* Shared behaviour: header/footer, navigation, reveal, back-to-top, card rendering. */
(() => {
  document.documentElement.classList.add("js");
  const { CONFIG, AREAS, COURSES } = window.ROBONEST;
  const page = location.pathname.split("/").pop() || "index.html";
  const nav = [["index.html","Home"],["index.html#about","About Us"],["courses.html","Courses"],["index.html#faq","FAQ"],["admissions.html","Admissions"]];
  const logo = '<img src="assets/images/logo/robonest-logo.png" alt="ROBONEST Center for Innovation" height="44">';
  let dismissed = false; try { dismissed = localStorage.getItem("rn-bar") === "1"; } catch {}

  document.getElementById("site-header").outerHTML = `
    <a class="skip" href="#main">Skip to content</a>
    <div class="bar${dismissed ? " gone" : ""}" id="bar"><p>Welcome to ROBONEST Center for Innovation. Explore the future of technology.</p><button type="button" aria-label="Dismiss announcement">×</button></div>
    <header class="nav" id="nav"><div class="wrap">
      <a class="brand" href="index.html">${logo}</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu">☰</button>
      <ul class="menu" id="menu">${nav.map(([h,t]) => `<li><a href="${h}"${h === page ? ' aria-current="page"' : ""}>${t}</a></li>`).join("")}
      <li><a class="btn btn-sm" href="admissions.html">Enquire Now</a></li></ul>
    </div></header>`;

  const links = [["Robotics","Robotics"],["Coding","Coding"],["Artificial Intelligence","AI"],["Arduino","Arduino"],["IoT","IoT"],["Electronics","Electronics"]];
  document.getElementById("site-footer").outerHTML = `
    <footer class="foot"><div class="wrap fgrid">
      <div><a class="flogo" href="index.html">${logo}</a><p class="slogan">Where Dreams Turn Into Innovations</p><p>Practical robotics, coding and electronics learning in Haidergarh, Lucknow.</p></div>
      <div><h3>Quick Links</h3><ul>${nav.map(([h,t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
      <div><h3>Learning Areas</h3><ul>${links.map(([n,c]) => `<li><a href="courses.html?cat=${encodeURIComponent(c)}">${n}</a></li>`).join("")}</ul></div>
      <div><h3>Contact</h3><ul><li><a href="mailto:${CONFIG.EMAIL}">${CONFIG.EMAIL}</a></li><li>Haidergarh, Lucknow, Uttar Pradesh, India</li><li><a href="${CONFIG.MAP}" target="_blank" rel="noopener">View on Google Maps</a></li></ul></div>
    </div><p class="copy">© ${new Date().getFullYear()} ROBONEST Center for Innovation. All rights reserved.</p></footer>
    <button class="top" id="top" type="button" aria-label="Back to top" hidden>↑</button>`;

  const nv = document.getElementById("nav"), bt = nv.querySelector(".burger"), mn = document.getElementById("menu");
  const bar = document.getElementById("bar"), up = document.getElementById("top");
  const setMenu = o => { mn.classList.toggle("open", o); bt.setAttribute("aria-expanded", o); bt.setAttribute("aria-label", o ? "Close menu" : "Open menu"); bt.textContent = o ? "✕" : "☰"; };
  bt.addEventListener("click", () => setMenu(!mn.classList.contains("open")));
  mn.addEventListener("click", e => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", e => e.key === "Escape" && setMenu(false));
  bar.querySelector("button").addEventListener("click", () => { bar.classList.add("gone"); try { localStorage.setItem("rn-bar", "1"); } catch {} });
  addEventListener("scroll", () => { nv.classList.toggle("scrolled", scrollY > 10); up.hidden = scrollY < 600; }, { passive: true });
  up.addEventListener("click", () => scrollTo({ top: 0 }));

  // Scroll reveal
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); } }), { threshold: .12 }) : null;
  const reveal = () => document.querySelectorAll(".reveal:not(.in)").forEach(el => io ? io.observe(el) : el.classList.add("in"));

  const card = c => `<article class="card course reveal"><div class="ico" aria-hidden="true">${c.icon}</div><span class="tag">${c.level}</span><h3>${c.name}</h3><p>${c.desc}</p><ul class="topics">${c.topics.map(t => `<li>${t}</li>`).join("")}</ul><a class="btn btn-sm" href="admissions.html?course=${c.id}">Enquire Now</a></article>`;
  const ag = document.getElementById("areas-grid");
  if (ag) ag.innerHTML = AREAS.map(([i,n,d,c]) => `<article class="card reveal"><div class="ico" aria-hidden="true">${i}</div><h3>${n}</h3><p>${d}</p><a class="link" href="courses.html?cat=${encodeURIComponent(c)}">Explore Program</a></article>`).join("");
  const fg = document.getElementById("featured-grid");
  if (fg) fg.innerHTML = COURSES.filter(c => c.featured).map(card).join("");
  reveal();
  window.RN = { card, reveal };
})();
