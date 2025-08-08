// table.js versi sederhana tanpa filter & ikon
const url = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

const tableBody = document.querySelector("#pendaftarTable tbody");
const totalCount = document.getElementById("totalCount");

fetch(url)
  .then(response => response.json())
  .then(data => {
    let count = 0;
    tableBody.innerHTML = "";

    data.forEach(item => {
      if (!item["No. Urut"] || !item["Nama Lengkap Siswa"] || !item["Asal TK/RA"] || !item["Jenis Kelamin"] || !item["Tanggal Pendaftaran"] || !item["Status Pendaftaran"]) return;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item["No. Urut"]}</td>
        <td>${item["Nama Lengkap Siswa"]}</td>
        <td>${item["Asal TK/RA"]}</td>
        <td>${item["Jenis Kelamin"]}</td>
        <td>${item["Tanggal Pendaftaran"]}</td>
        <td>${item["Status Pendaftaran"]}</td>
      `;
      tableBody.appendChild(tr);
      count++;
    });

    totalCount.textContent = count;
  })
  .catch(error => {
    console.error("Gagal mengambil data:", error);
  });
