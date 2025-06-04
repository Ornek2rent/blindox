document.addEventListener("DOMContentLoaded", () => {
  // Header ve Footer bileşenlerini yükle
  loadComponent("components/header.html", "header");
  loadComponent("components/footer.html", "footer");

  // Ana sayfadaki "Araçları Gör" butonuna tıklayınca search-results sayfasını yükle
  const goSearchBtn = document.getElementById("go-search");
  goSearchBtn?.addEventListener("click", () => {
    loadPage("search-results.html");
  });

  // History API ve SPA sayfa yükleme için
  window.addEventListener("popstate", e => {
    if (e.state?.page) {
      loadPage(e.state.page, false);
    }
  });
});

function loadComponent(url, elementId) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.getElementById(elementId).innerHTML = html;
    })
    .catch(() => {
      document.getElementById(elementId).innerHTML = "";
    });
}

function loadPage(page, pushState = true) {
  fetch(`pages/${page}`)
    .then(res => {
      if (!res.ok) throw new Error("Sayfa yüklenemedi");
      return res.text();
    })
    .then(html => {
      const app = document.getElementById("app");
      app.innerHTML = html;

      if (pushState) {
        history.pushState({ page }, "", `#${page.replace(".html", "")}`);
      }

      // Sayfa yüklendikten sonra sayfaya özel script varsa çağır
      runPageScript(page);
    })
    .catch(err => {
      document.getElementById("app").innerHTML = `<p>Sayfa yüklenirken hata oluştu.</p>`;
      console.error(err);
    });
}

function runPageScript(page) {
  switch (page) {
    case "search-results.html":
      if (typeof searchResultsPage === "function") searchResultsPage();
      break;
    case "vehicle-details.html":
      if (typeof vehicleDetailsPage === "function") vehicleDetailsPage();
      break;
    case "booking.html":
      if (typeof bookingPage === "function") bookingPage();
      break;
  }
}
