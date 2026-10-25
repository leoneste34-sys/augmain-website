/* La rue vivante de l'accueil : un quartier en vue isométrique où les passants cherchent sur Google,
   trouvent « votre commerce », y entrent et en ressortent avec un sac jaune.
   Tout est dessiné en SVG par ce fichier. Si le visiteur demande moins d'animations, la scène reste fixe. */
(() => {
  const hote = document.getElementById("rue");
  if (!hote) return;

  const NS = "http://www.w3.org/2000/svg";
  const U = 30, CX = 0.866, CY = 0.5;
  const NUIT = [15, 35, 64];
  const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const petit = matchMedia("(max-width: 700px)").matches;

  const iso = (x, y, z = 0) => [(x - y) * CX * U, (x + y) * CY * U - z * U];
  const pts = (...l) => l.map(p => iso(...p).map(n => n.toFixed(1)).join(",")).join(" ");
  const cree = (tag, at = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in at) e.setAttribute(k, at[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  /* Assombrit une couleur vers le bleu nuit (f = 1 : couleur d'origine). */
  const vers = (hex, f, cible = NUIT) => {
    const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255];
    return "#" + c.map((v, i) => Math.round(v * f + cible[i] * (1 - f)).toString(16).padStart(2, "0")).join("");
  };
  const ombre = (hex, f) => vers(hex, f);
  const clair = (hex, f) => vers(hex, f, [255, 255, 255]);

  /* ---- Cadre ---- */
  /* Le sol déborde du cadre ; le cadre est resserré sur la rue et ses bords s'effacent (masque CSS). */
  const X0 = -2.6, X1 = 17.4, Y0 = -3.4, Y1 = 6.8;
  const svg = cree("svg", { class: "scene", viewBox: "-175 -215 620 520", "aria-hidden": "true" });
  hote.prepend(svg);
  const sol = cree("g", {}, svg), bati = cree("g", {}, svg), gens = cree("g", {}, svg),
        route = cree("g", {}, svg), devant = cree("g", {}, svg), effets = cree("g", {}, svg);

  const bande = (y0, y1, fill, parent = sol) => cree("polygon", { points: pts([X0, y0], [X1, y0], [X1, y1], [X0, y1]), fill }, parent);
  bande(Y0, Y1, "#eaefe9");
  bande(Y0, 0, "#dfe6de");
  bande(0, 1.6, "#f7f9f6");
  bande(1.6, 4.3, "#ffffff");
  bande(4.3, 5.3, "#f7f9f6");
  bande(5.3, Y1, "#d6e4d2");
  for (const y of [1.6, 4.3]) cree("line", { x1: iso(X0, y)[0], y1: iso(X0, y)[1], x2: iso(X1, y)[0], y2: iso(X1, y)[1], stroke: "#d3dbd4", "stroke-width": 2 }, sol);
  cree("line", { x1: iso(X0, 2.95)[0], y1: iso(X0, 2.95)[1], x2: iso(X1, 2.95)[0], y2: iso(X1, 2.95)[1], stroke: "#d3dbd4", "stroke-width": 2.5, "stroke-dasharray": "14 16" }, sol);
  /* passage piéton devant votre commerce */
  for (let i = 0; i < 6; i++) {
    const y = 1.8 + i * 0.42;
    cree("polygon", { points: pts([6.3, y], [8.0, y], [8.0, y + 0.22], [6.3, y + 0.22]), fill: "#eef1ee" }, sol);
  }

  /* ---- Commerces ---- */
  const D = 2.6;
  const COMMERCES = [
    { x: 0.0, w: 2.7, h: 2.6, mur: "#f4e9d8", store: "#9fb0c8", nom: "Boulangerie" },
    { x: 2.9, w: 2.5, h: 3.3, mur: "#e6ece5", store: "#b9cdb6", nom: "Coiffure" },
    { x: 5.6, w: 3.1, h: 3.0, mur: "#ffffff", store: "#ffc83d", nom: "Votre commerce", client: true },
    { x: 8.9, w: 2.5, h: 2.5, mur: "#efe4d2", store: "#c3cddc", nom: "Café" },
    { x: 11.6, w: 2.8, h: 3.5, mur: "#f4e9d8", store: "#d9c3c3", nom: "Fleuriste" }
  ];

  const facade = (c, u0, v0, u1, v1, fill, parent, extra = {}) =>
    cree("polygon", { points: pts([c.x + u0, 0, v0], [c.x + u1, 0, v0], [c.x + u1, 0, v1], [c.x + u0, 0, v1]), fill, ...extra }, parent);

  for (const c of COMMERCES) {
    const g = cree("g", { class: c.client ? "client" : "" }, bati);
    const x1 = c.x + c.w, h = c.h;
    cree("polygon", { points: pts([x1, 0, 0], [x1, -D, 0], [x1, -D, h], [x1, 0, h]), fill: ombre(c.mur, 0.8) }, g);
    cree("polygon", { points: pts([c.x, 0, h], [x1, 0, h], [x1, -D, h], [c.x, -D, h]), fill: clair(c.mur, 0.7) }, g);
    facade(c, 0, 0, c.w, h, c.mur, g);
    facade(c, 0, 0, c.w, 0.16, ombre(c.mur, 0.82), g);
    facade(c, 0, h - 0.14, c.w, h, ombre(c.mur, 0.9), g);
    /* porte et vitrine */
    const p0 = c.w * 0.12, p1 = p0 + 0.62;
    facade(c, p0, 0.16, p1, 1.28, "#1c3560", g);
    facade(c, p0 + 0.1, 0.5, p1 - 0.1, 1.18, c.client ? "#ffe7a3" : "#3a5683", g);
    facade(c, p1 + 0.18, 0.34, c.w - 0.18, 1.28, ombre(c.mur, 0.86), g);
    const vitre = facade(c, p1 + 0.24, 0.4, c.w - 0.24, 1.22, c.client ? "#fff3c4" : "#cfe1ea", g);
    if (c.client) vitre.setAttribute("class", "vitre-allumee");
    facade(c, p1 + 0.5, 0.45, p1 + 0.62, 1.17, "rgba(255,255,255,.55)", g);
    /* étage */
    if (h >= 2.9) {
      for (const u of [c.w * 0.22, c.w * 0.62]) {
        facade(c, u, 2.45, u + 0.5, h - 0.38, ombre(c.mur, 0.86), g);
        facade(c, u + 0.05, 2.5, u + 0.45, h - 0.43, c.client ? "#fff3c4" : "#cfe1ea", g);
      }
    }
    /* store rayé */
    const n = Math.max(4, Math.round(c.w / 0.34)), pas = (c.w - 0.2) / n;
    for (let i = 0; i < n; i++) {
      const u0 = 0.1 + i * pas, u1 = u0 + pas;
      cree("polygon", { points: pts([c.x + u0, 0, 1.6], [c.x + u1, 0, 1.6], [c.x + u1, 0.55, 1.25], [c.x + u0, 0.55, 1.25]),
        fill: i % 2 ? "#ffffff" : c.store, stroke: ombre(c.store, 0.85), "stroke-width": 0.6 }, g);
    }
    cree("polygon", { points: pts([c.x + 0.1, 0.55, 1.25], [x1 - 0.1, 0.55, 1.25], [x1 - 0.1, 0.55, 1.12], [c.x + 0.1, 0.55, 1.12]), fill: ombre(c.store, 0.82) }, g);
    /* enseigne */
    facade(c, 0.22, 1.78, c.w - 0.22, 2.22, c.client ? "#0f2340" : "#ffffff", g, { stroke: c.client ? "#0f2340" : "#d3dbd4", "stroke-width": 1 });
    const [ox, oy] = iso(c.x, 0, 0);
    const t = cree("text", { transform: `matrix(${CX},${CY},0,1,${ox.toFixed(1)},${oy.toFixed(1)})`, x: (c.w / 2) * U, y: -1.89 * U,
      "text-anchor": "middle", "font-size": c.client ? 9.5 : 9, "font-weight": 800, fill: c.client ? "#ffc83d" : "#0f2340", class: "enseigne" }, g);
    t.textContent = c.nom;
    c.porte = c.x + (p0 + p1) / 2;
    c.toit = iso(c.x + c.w / 2, -D / 2, h);
  }
  const CLIENT = COMMERCES.find(c => c.client);

  /* ---- Lampadaires et arbres ---- */
  for (const x of [2.75, 8.8, 14.45]) {
    const [a, b] = iso(x, 1.45, 0), [, e] = iso(x, 1.45, 2.3);
    const l = cree("g", {}, devant);
    cree("line", { x1: a, y1: b, x2: a, y2: e, stroke: "#0f2340", "stroke-width": 2.2, "stroke-linecap": "round" }, l);
    cree("circle", { cx: a, cy: e, r: 3.8, fill: "#ffc83d", stroke: "#0f2340", "stroke-width": 1.5 }, l);
  }
  for (const x of [0.8, 4.2, 7.6, 11.0, 14.4]) {
    const [a, b] = iso(x, 4.85, 0), [, e] = iso(x, 4.85, 0.75), [, f] = iso(x, 4.85, 1.35);
    const arbre = cree("g", {}, devant);
    cree("ellipse", { cx: a + 4, cy: b + 2, rx: 17, ry: 7, fill: "rgba(15,35,64,.10)" }, arbre);
    cree("line", { x1: a, y1: b, x2: a, y2: e, stroke: "#7a6a55", "stroke-width": 3.4, "stroke-linecap": "round" }, arbre);
    cree("circle", { cx: a, cy: f, r: 17, fill: "#a9c2a5" }, arbre);
    cree("circle", { cx: a - 5, cy: f - 6, r: 8, fill: "#c2d6bf" }, arbre);
  }

  /* ---- Épingles ---- */
  const EPINGLE = "M0 0 C0 0 -13 -16 -13 -25 A13 13 0 0 1 13 -25 C13 -16 0 0 0 0 Z";
  const epingle = (c, grande) => {
    const g = cree("g", { class: grande ? "epingle grande" : "epingle" }, effets);
    const [a, b] = c.toit;
    const s = grande ? 1.9 : 1;
    g.setAttribute("transform", `translate(${a.toFixed(1)},${(b - 4).toFixed(1)}) scale(${s})`);
    cree("path", { d: EPINGLE, fill: grande ? "#ffc83d" : "#9aa8b5", stroke: "#0f2340", "stroke-width": grande ? 2 : 1.6 }, g);
    cree("circle", { cx: 0, cy: -25, r: 5, fill: "#0f2340" }, g);
    return g;
  };
  const grises = COMMERCES.filter(c => !c.client && c.nom !== "Café").map(c => epingle(c, false));
  const jaune = epingle(CLIENT, true);
  const [dpx, dpy] = iso(CLIENT.porte, 0.7, 0);
  const ondes = [0, 1].map(i => cree("ellipse", { cx: dpx, cy: dpy, rx: 10, ry: 5, fill: "none", stroke: "#ffc83d", "stroke-width": 3, opacity: 0, class: "onde" }, sol));

  /* ---- Passants ---- */
  const TENUES = ["#0f2340", "#1c8f4e", "#9fb0c8", "#e07a5f", "#5b7db1", "#c3cddc", "#2f4858", "#b5838d"];
  const PEAUX = ["#f1c9a5", "#d9a77c", "#a8714a", "#6b4630", "#f6d7b8"];
  const CHEVEUX = ["#2b1d14", "#5a3b26", "#0f2340", "#c9a227", "#7a6a55"];
  const hasard = l => l[Math.floor(Math.random() * l.length)];
  const passants = [];

  function dessinePassant(p) {
    const g = cree("g", { class: "passant" }, gens);
    cree("ellipse", { cx: 0, cy: 0, rx: 6, ry: 3, fill: "rgba(15,35,64,.18)" }, g);
    p.jambeA = cree("line", { x1: -2, y1: -9, x2: -2, y2: 0, stroke: "#22324d", "stroke-width": 2.6, "stroke-linecap": "round" }, g);
    p.jambeB = cree("line", { x1: 2, y1: -9, x2: 2, y2: 0, stroke: "#22324d", "stroke-width": 2.6, "stroke-linecap": "round" }, g);
    p.corps = cree("g", {}, g);
    cree("rect", { x: -5, y: -21, width: 10, height: 13.5, rx: 4.5, fill: p.tenue }, p.corps);
    cree("circle", { cx: 0, cy: -25.5, r: 4.4, fill: p.peau }, p.corps);
    cree("path", { d: "M-4.6 -26.2 A4.6 4.6 0 0 1 4.6 -26.2 Q0 -28.2 -4.6 -26.2 Z", fill: p.cheveux }, p.corps);
    if (p.sac) {
      p.sacEl = cree("g", {}, p.corps);
      cree("rect", { x: p.dir > 0 ? 4 : -11, y: -14, width: 7, height: 8, rx: 1.5, fill: "#ffc83d", stroke: "#0f2340", "stroke-width": 1.2 }, p.sacEl);
    }
    p.el = g;
  }

  function nouveau(opt = {}) {
    const dir = opt.dir ?? (Math.random() < 0.5 ? 1 : -1);
    const p = {
      dir, x: opt.x ?? (dir > 0 ? X0 + 0.4 : X1 - 0.4), y: opt.y ?? (0.4 + Math.random() * 0.95),
      v: 0.9 + Math.random() * 0.55, ph: Math.random() * 6, etat: opt.etat || "marche",
      va: opt.va ?? Math.random() < 0.55, sac: !!opt.sac, alpha: opt.etat === "sort" ? 0 : 1,
      voie: 0.4 + Math.random() * 0.95,
      tenue: hasard(TENUES), peau: hasard(PEAUX), cheveux: hasard(CHEVEUX)
    };
    dessinePassant(p);
    passants.push(p);
    return p;
  }

  /* ---- Pièces qui montent devant votre commerce ---- */
  const pieces = [];
  function piece() {
    const g = cree("g", { class: "piece" }, effets);
    cree("circle", { cx: 0, cy: 0, r: 9, fill: "#ffc83d", stroke: "#0f2340", "stroke-width": 2 }, g);
    const t = cree("text", { x: 0, y: 3.6, "text-anchor": "middle", "font-size": 11, "font-weight": 800, fill: "#0f2340" }, g);
    t.textContent = "€";
    pieces.push({ el: g, t: 0, x: iso(CLIENT.porte, 0.1, 1.6)[0] + (Math.random() * 16 - 8), y: iso(CLIENT.porte, 0.1, 1.6)[1] });
  }

  /* ---- Voitures ---- */
  const voitures = [];
  const COULEURS_AUTO = ["#0f2340", "#ffffff", "#a9c2a5", "#9fb0c8"];
  function voiture() {
    const dir = Math.random() < 0.5 ? 1 : -1;
    const c = { dir, x: dir > 0 ? X0 - 1.6 : X1 + 1.6, y: dir > 0 ? 2.15 : 3.45, v: 2.4 + Math.random(), couleur: hasard(COULEURS_AUTO), faces: [] };
    c.el = cree("g", {}, route);
    for (let i = 0; i < 7; i++) c.faces.push(cree("polygon", {}, c.el));
    voitures.push(c);
  }
  function placeVoiture(c) {
    const L = 1.5, W = 0.85, x = c.x, y = c.y, col = c.couleur;
    const boite = (x0, x1, y0, y1, z0, z1, fi, fd, ft) => {
      fi.setAttribute("points", pts([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]));
      fd.setAttribute("points", pts([x1, y1, z0], [x1, y0, z0], [x1, y0, z1], [x1, y1, z1]));
      ft.setAttribute("points", pts([x0, y1, z1], [x1, y1, z1], [x1, y0, z1], [x0, y0, z1]));
    };
    const [f0, f1, f2, f3, f4, f5, f6] = c.faces;
    f0.setAttribute("points", pts([x - 0.1, y + W + 0.1, 0], [x + L + 0.1, y + W + 0.1, 0], [x + L + 0.1, y - 0.1, 0], [x - 0.1, y - 0.1, 0]));
    f0.setAttribute("fill", "rgba(15,35,64,.12)");
    boite(x, x + L, y, y + W, 0.12, 0.58, f1, f2, f3);
    boite(x + 0.35, x + L - 0.35, y + 0.08, y + W - 0.08, 0.58, 0.95, f4, f5, f6);
    f1.setAttribute("fill", col); f2.setAttribute("fill", ombre(col, 0.8)); f3.setAttribute("fill", clair(col, 0.85));
    f4.setAttribute("fill", "#cfe1ea"); f5.setAttribute("fill", "#a9c0cf"); f6.setAttribute("fill", clair(col, 0.85));
  }

  /* ---- Recherche et fiche (calques HTML posés sur la scène) ---- */
  const champ = hote.querySelector(".recherche .tape");
  const fiche = hote.querySelector(".fiche");
  const RECHERCHES = ["restaurant près d'ici", "coiffeur ouvert maintenant", "café en terrasse", "boulangerie Montpellier", "fleuriste près de moi"];

  function etatFixe() {
    for (const e of grises) e.style.opacity = 1;
    jaune.style.opacity = 1;
    if (fiche) fiche.classList.add("visible");
    if (champ) champ.textContent = RECHERCHES[0];
    const places = [[1.2, 0.8, 1], [3.8, 1.1, -1], [CLIENT.porte - 0.6, 0.9, 1], [10.2, 0.6, -1], [12.8, 1.2, 1]];
    places.forEach(([x, y, dir], i) => { const p = nouveau({ x, y, dir, sac: i === 3 }); placePassant(p, 0); });
    voiture(); voitures[0].x = 9; placeVoiture(voitures[0]);
    piece(); pieces[0].el.setAttribute("transform", `translate(${pieces[0].x},${pieces[0].y - 18})`);
  }

  function placePassant(p, dt) {
    const [a, b] = iso(p.x, p.y, 0);
    const bal = calme ? 0 : Math.abs(Math.sin(p.ph)) * 1.6;
    p.el.setAttribute("transform", `translate(${a.toFixed(1)},${b.toFixed(1)})`);
    p.el.style.opacity = p.alpha;
    const s = calme ? 0 : Math.sin(p.ph) * 3;
    p.jambeA.setAttribute("x2", (-2 + s).toFixed(1));
    p.jambeB.setAttribute("x2", (2 - s).toFixed(1));
    p.corps.setAttribute("transform", `translate(0,${(-bal).toFixed(1)})`);
  }

  if (calme) { etatFixe(); return; }

  /* ---- Boucle d'animation ---- */
  const MAX = petit ? 7 : 11;
  let t0 = performance.now(), horloge = 0, prochain = 0, prochaineAuto = 1.5, cycle = -1, tri = 0, actif = true;

  function sequence(t) {
    /* toutes les 9 s : une nouvelle recherche, les épingles tombent, votre commerce sort en premier */
    const k = Math.floor(t / 9), r = t - k * 9;
    if (k !== cycle) {
      cycle = k;
      for (const e of grises) e.style.opacity = 0;
      jaune.classList.remove("tombe"); jaune.style.opacity = 0;
      if (fiche) fiche.classList.remove("visible");
      if (champ) champ.textContent = "";
    }
    const q = RECHERCHES[k % RECHERCHES.length];
    if (champ) champ.textContent = q.slice(0, Math.max(0, Math.min(q.length, Math.floor((r - 0.2) * 22))));
    grises.forEach((e, i) => { if (r > 1.5 + i * 0.12 && r < 8.4) e.style.opacity = 0.75; else if (r >= 8.4) e.style.opacity = 0; });
    if (r > 2.1 && !jaune.classList.contains("tombe")) { jaune.style.opacity = 1; jaune.classList.add("tombe"); ondes.forEach((o, i) => o.animate([{ rx: 8, ry: 4, opacity: 0.9 }, { rx: 46, ry: 23, opacity: 0 }], { duration: 1400, delay: i * 350, iterations: 2 })); }
    if (fiche && r > 2.8 && r < 8.4) fiche.classList.add("visible"); else if (fiche && r >= 8.4) fiche.classList.remove("visible");
  }

  function boucle(now) {
    if (!actif) return;
    /* l'horodatage d'une image peut précéder t0 de quelques ms : jamais de temps négatif */
    const dt = Math.max(0, Math.min(0.05, (now - t0) / 1000)); t0 = Math.max(t0, now); horloge += dt;
    sequence(horloge);

    if (horloge > prochain && passants.length < MAX) { nouveau(); prochain = horloge + 0.7 + Math.random() * 1.1; }
    if (horloge > prochaineAuto) { if (voitures.length < 2) voiture(); prochaineAuto = horloge + 3.5 + Math.random() * 4; }

    for (let i = passants.length - 1; i >= 0; i--) {
      const p = passants[i];
      p.ph += dt * 9 * p.v;
      if (p.etat === "marche") {
        p.x += p.dir * p.v * dt;
        p.y += (p.voie - p.y) * Math.min(1, dt * 2);
        const devant = Math.abs(p.x - CLIENT.porte) < 0.12;
        if (p.va && !p.sac && devant) p.etat = "entre";
        if (p.x < X0 - 0.5 || p.x > X1 + 0.5) { p.el.remove(); passants.splice(i, 1); continue; }
      } else if (p.etat === "entre") {
        p.x += (CLIENT.porte - p.x) * Math.min(1, dt * 6);
        p.y -= p.v * 0.9 * dt;
        if (p.y < 0.35) p.alpha -= dt * 3;
        if (p.alpha <= 0) {
          p.el.remove(); passants.splice(i, 1);
          piece();
          if (Math.random() < 0.7) setTimeout(() => actif && nouveau({ x: CLIENT.porte, y: 0.1, etat: "sort", sac: true, dir: Math.random() < 0.5 ? 1 : -1, va: false }), 900 + Math.random() * 900);
          continue;
        }
      } else if (p.etat === "sort") {
        p.alpha = Math.min(1, p.alpha + dt * 3);
        p.y += p.v * 0.9 * dt;
        if (p.y >= p.voie) p.etat = "marche";
      }
      placePassant(p, dt);
    }

    if ((tri += dt) > 0.4) { tri = 0; passants.sort((a, b) => a.x + a.y - (b.x + b.y)).forEach(p => gens.appendChild(p.el)); }

    for (let i = voitures.length - 1; i >= 0; i--) {
      const c = voitures[i];
      c.x += c.dir * c.v * dt;
      if (c.x < X0 - 2 || c.x > X1 + 2) { c.el.remove(); voitures.splice(i, 1); continue; }
      placeVoiture(c);
    }

    for (let i = pieces.length - 1; i >= 0; i--) {
      const m = pieces[i]; m.t += dt;
      const k = m.t / 1.3, s = k < 0.15 ? 0.6 + k * 2.7 : 1;
      m.el.setAttribute("transform", `translate(${m.x.toFixed(1)},${(m.y - k * 44).toFixed(1)}) scale(${s.toFixed(2)})`);
      m.el.style.opacity = k < 0.7 ? 1 : Math.max(0, 1 - (k - 0.7) / 0.3);
      if (k >= 1) { m.el.remove(); pieces.splice(i, 1); }
    }
    requestAnimationFrame(boucle);
  }

  /* Démarrage : quelques passants déjà dans la rue, pause quand la scène n'est pas visible. */
  for (let i = 0; i < (petit ? 4 : 7); i++) nouveau({ x: X0 + 1 + Math.random() * (X1 - X0 - 2) });
  const relance = () => { if (!actif) { actif = true; t0 = performance.now(); requestAnimationFrame(boucle); } };
  new IntersectionObserver(e => { if (e[0].isIntersecting && !document.hidden) relance(); else actif = false; }).observe(hote);
  document.addEventListener("visibilitychange", () => { if (document.hidden) actif = false; else relance(); });
  actif = false; relance();
})();
