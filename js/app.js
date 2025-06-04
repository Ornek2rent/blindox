document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "components/header.html");
  loadComponent("footer", "components/footer.html");
  router();
  window.addEventListener("hashchange", router);
});

function loadComponent(id, path) {
  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
    });
}

function router() {
  const hash = location.hash || "#search";
  const page = hash.substring(1);
  fetch(`pages/${page}.html`)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("app").innerHTML = html;
      if (page === "search-results") loadVehicles();
    });
}

function loadVehicles() {
  fetch("https://script.google.com/macros/s/YOUR_DEPLOYED_URL/exec?page=vehicles")
    .then((res) => res.json())
    .then((vehicles) => {
      const container = document.getElementById("vehicle-list");
      container.innerHTML = "";
      vehicles.forEach((v) => {
        const card = document.createElement("div");
        card.className = "car-card";
        card.innerHTML = `
          <img src="${v.Image}" alt="${v.Name}" />
          <h3>${v.Name}</h3>
          <p>${v.Brand} - ${v.Price} TL</p>
        `;
        container.appendChild(card);
      });
    });
}
