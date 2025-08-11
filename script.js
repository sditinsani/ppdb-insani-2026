const API_URL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

async function fetchData() {
  const tableBody = document.querySelector("#data-table tbody");
  tableBody.innerHTML = `<tr><td colspan="6" class="loading">⏳ Memuat data...</td></tr>`;

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    // Filter data kosong
    const filteredData = data.filter(row =>
      row["No. Urut"] && row["Nama Lengkap Siswa"]
    );

    if (filteredData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" class="no-data">❌ Tidak ada data</td></tr>`;
      return;
    }

    tableBody.innerHTML = "";
    filteredData.forEach(row => {
      const tr = document.createElement("tr");

      const statusClass = row["Status Pendaftaran"]?.toLowerCase() === "diterima"
        ? "status-accepted"
        : "status-rejected";

      tr.innerHTML = `
        <td>${row["No. Urut"] || ""}</td>
        <td>${row["Nama Lengkap Siswa"] || ""}</td>
        <td>${row["Asal TK/RA"] || ""}</td>
        <td>${row["Jenis Kelamin"] || ""}</td>
        <td>${row["Tanggal Pendaftaran"] || ""}</td>
        <td class="${statusClass}">${row["Status Pendaftaran"] || ""}</td>
      `;

      tableBody.appendChild(tr);
    });

  } catch (error) {
    console.error("Gagal memuat data:", error);
    tableBody.innerHTML = `<tr><td colspan="6" class="error">⚠️ Gagal memuat data</td></tr>`;
  }
}

fetchData();
