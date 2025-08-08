// table.js - Menampilkan Data Pendaftar dari Google Sheets

const sheetURL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

fetch(sheetURL)
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector("#pendaftarTable tbody");
    const totalCount = document.getElementById("totalCount");
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

        // Tambahkan class status warna
        const statusClass = getStatusClass(item["Status Pendaftaran"]);

        tr.innerHTML = `
          <td>${item["No. Urut"]}</td>
          <td>${item["Nama Lengkap Siswa"]}</td>
          <td>${item["Asal TK/RA"]}</td>
          <td>${item["Jenis Kelamin"]}</td>
          <td>${item["Tanggal Pendaftaran"]}</td>
          <td><span class="status ${statusClass}">${item["Status Pendaftaran"]}</span></td>
        `;

        tbody.appendChild(tr);
        count++;
      }
    });

    totalCount.textContent = count;
  })
  .catch(error => {
    console.error("Gagal mengambil data:", error);
  });

function getStatusClass(status) {
  status = status.toLowerCase();
  if (status.includes("diterima")) return "diterima";
  if (status.includes("tidak") || status.includes("gagal")) return "ditolak";
  if (status.includes("verifikasi")) return "verifikasi";
  return "menunggu";
}
