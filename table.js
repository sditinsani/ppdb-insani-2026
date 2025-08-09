const SHEET_ID = "AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ";
const SHEET_URL = `https://script.google.com/macros/s/${SHEET_ID}/exec`;

async function loadTableData() {
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Memuat data...</td></tr>`;

  try {
    const response = await fetch(SHEET_URL);
    const data = await response.json();

    // Filter data kosong
    const filteredData = data.filter(row => row["Nama Lengkap Siswa"]?.trim() !== "");

    if (filteredData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Tidak ada data</td></tr>`;
      return;
    }

    tableBody.innerHTML = "";
    filteredData.forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${row["Nama Lengkap Siswa"]}</td>
        <td>${row["Asal TK/RA"]}</td>
        <td>${row["Jenis Kelamin"]}</td>
        <td>${row["Tanggal Pendaftaran"]}</td>
        <td>${row["Status Pendaftaran"]}</td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">Gagal memuat data</td></tr>`;
    console.error("Error:", error);
  }
}

// Load pertama kali
document.addEventListener("DOMContentLoaded", loadTableData);
