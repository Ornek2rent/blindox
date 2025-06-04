document.addEventListener("DOMContentLoaded", () => {
  // Örnek araç listesi (ilerde backend’den çekilecek)
  const vehicles = [
    { id: 1, brand: "Renault", model: "Clio", price: 850, img: "img/renault-clio.jpg" },
    { id: 2, brand: "Fiat", model: "Egea", price: 900, img: "img/fiat-egea.jpg" },
  ];

  const listEl = document.getElementById("vehicle-list");
  vehicles.forEach((v) => {
    const card = document.createElement("div");
    card.className = "vehicle-card";
    card.dataset.id = v.id;
    card.dataset.brand = v.brand;
    card.dataset.model = v.model;
    card.dataset.price = v.price;

    card.innerHTML = `
      <img src="${v.img}" alt="${v.brand} ${v.model}" />
      <h3>${v.brand} ${v.model}</h3>
      <p>Günlük Fiyat: ${v.price}₺</p>
      <button class="select-car-btn">Seç</button>
    `;

    listEl.appendChild(card);
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("select-car-btn")) {
      const card = e.target.closest(".vehicle-card");
      const selectedCar = {
        id: card.dataset.id,
        brand: card.dataset.brand,
        model: card.dataset.model,
        price: card.dataset.price,
      };
      localStorage.setItem("selectedCar", JSON.stringify(selectedCar));
      window.location.href = "details.html";
    }
  });
});

