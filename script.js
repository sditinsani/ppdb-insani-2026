const SHEET_URL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards-container");
  const loading = document.getElementById("loading");
  const errorMsg = document.getElementById("error");

  async function fetchData() {
    try {
      const response = await fetch(SHEET_URL);
      if (!response.ok) throw new Error("Gagal mengambil data");
      const data = await response.json();

      loading.style.display = "none";
      renderCards(data);
    } catch (error) {
      loading.style.display = "none";
      errorMsg.textContent = "Terjadi kesalahan saat memuat data.";
    }
  }

  function renderCards(data) {
    container.innerHTML = "";

    data.forEach(row => {
      const card = document.createElement("div");
      card.className = "card";

      const statusClass = row["Status Pendaftaran"] === "Diterima" ? "status-diterima" : "status-tidak";
      const statusText = `<span class="status ${statusClass}">${row["Status Pendaftaran"]}</span>`;

      card.innerHTML = `
        <h2>${row["Nama Lengkap Siswa"]}</h2>
        <p><strong>Asal TK/RA:</strong> ${row["Asal TK/RA"]}</p>
        <p><strong>Jenis Kelamin:</strong> ${row["Jenis Kelamin"]}</p>
        <p><strong>Tanggal Pendaftaran:</strong> ${row["Tanggal Pendaftaran"]}</p>
        <p>${statusText}</p>
      `;

      container.appendChild(card);
    });
  }

  fetchData();
});
