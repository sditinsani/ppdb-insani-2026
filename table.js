const scriptURL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";
const tableBody = document.querySelector("#dataTable tbody");
const refreshBtn = document.getElementById("refreshBtn");

async function loadData() {
  tableBody.innerHTML = `<tr><td colspan="6" class="loading">Memuat data...</td></tr>`;

  try {
    const response = await fetch(scriptURL);
    const data = await response.json();

    // Hapus data kosong
    const filteredData = data.filter(row => row.nama && row.nama.trim() !== "");

    if (filteredData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="loading">Tidak ada data</td></tr>`;
      return;
    }

    tableBody.innerHTML = filteredData.map((row, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${row.nama}</td>
        <td>${row.asal}</td>
        <td>${row.jk}</td>
        <td>${row.tanggal}</td>
        <td class="${row.status.toLowerCase()}">${row.status}</td>
      </tr>
    `).join("");
  } catch (error) {
    console.error("Gagal memuat data:", error);
    tableBody.innerHTML = `<tr><td colspan="6" class="loading">Gagal memuat data</td></tr>`;
  }
}

// Event refresh
refreshBtn.addEventListener("click", loadData);

// Load pertama kali
loadData();
