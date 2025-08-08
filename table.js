// table.js

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec';

const tableBody = document.querySelector("#pendaftarTable tbody");
const totalCount = document.getElementById("totalCount");
const refreshButton = document.getElementById("refreshButton");

function fetchData() {
  fetch(SHEET_URL)
    .then(response => response.json())
    .then(data => {
      tableBody.innerHTML = ""; // Bersihkan isi tabel
      let count = 0;
      data.forEach(item => {
        if (
          item["No. Urut"] &&
          item["Nama Lengkap Siswa"] &&
          item["Asal TK/RA"] &&
          item["Jenis Kelamin"] &&
          item["Tanggal Pendaftaran"] &&
          item["Status Pendaftaran"]
        ) {
          const tr = document.createElement("tr");

          const statusRaw = item["Status Pendaftaran"].toLowerCase();
          let statusClass = "menunggu";
          if (statusRaw.includes("diterima")) statusClass = "diterima";
          else if (statusRaw.includes("gagal") || statusRaw.includes("tidak")) statusClass = "ditolak";
          else if (statusRaw.includes("verifikasi")) statusClass = "verifikasi";

          tr.innerHTML = `
            <td>${item["No. Urut"]}</td>
            <td>${item["Nama Lengkap Siswa"]}</td>
            <td>${item["Asal TK/RA"]}</td>
            <td>${item["Jenis Kelamin"]}</td>
            <td>${item["Tanggal Pendaftaran"]}</td>
            <td><span class="status ${statusClass}">${item["Status Pendaftaran"]}</span></td>
          `;
          tableBody.appendChild(tr);
          count++;
        }
      });
      totalCount.textContent = count;
    })
    .catch(error => {
      console.error("Gagal mengambil data:", error);
    });
}

// Load saat pertama kali
fetchData();

// Refresh saat tombol diklik
refreshButton.addEventListener("click", () => {
  fetchData();
});
