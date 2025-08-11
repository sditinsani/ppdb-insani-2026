document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#data-table tbody");
  const cardsContainer = document.querySelector("#data-cards");
  const loading = document.getElementById("loading");
  const errorDiv = document.getElementById("error");

  // ID Deployment Web Apps Google Apps Script
  const scriptURL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      loading.classList.add("hidden");

      if (!data || data.length === 0) {
        errorDiv.textContent = "Tidak ada data pendaftaran.";
        return;
      }

      document.querySelector(".desktop-view").classList.remove("hidden");
      document.querySelector(".mobile-view").classList.remove("hidden");

      data.forEach(row => {
        // Desktop table
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.no}</td>
          <td>${row.nama}</td>
          <td>${row.asal}</td>
          <td>${row.jk}</td>
          <td>${row.tanggal}</td>
          <td><span class="${row.status === 'Diterima' ? 'status-diterima' : 'status-tidak'}">${row.status}</span></td>
        `;
        tableBody.appendChild(tr);

        // Mobile card
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h3>${row.nama}</h3>
          <p><strong>Asal TK/RA:</strong> ${row.asal}</p>
          <p><strong>Jenis Kelamin:</strong> ${row.jk}</p>
          <p><strong>Tanggal Pendaftaran:</strong> ${row.tanggal}</p>
          <span class="status ${row.status === 'Diterima' ? 'status-diterima' : 'status-tidak'}">${row.status}</span>
        `;
        cardsContainer.appendChild(card);
      });
    })
    .catch(err => {
      loading.classList.add("hidden");
      errorDiv.textContent = "Terjadi kesalahan saat memuat data.";
      console.error(err);
    });
});
