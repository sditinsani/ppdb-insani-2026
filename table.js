const SHEET_ID = "AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ";
const SHEET_NAME = "tampilan_web";
const ENDPOINT = `https://script.google.com/macros/s/${SHEET_ID}/exec?sheet=${SHEET_NAME}`;

const tableBody = document.querySelector("#data-table tbody");
const jumlahPendaftar = document.getElementById("jumlah-pendaftar");

async function loadData() {
  try {
    const res = await fetch(ENDPOINT);
    const data = await res.json();

    tableBody.innerHTML = "";
    let count = 0;

    data.forEach((row, index) => {
      count++;
      const tr = document.createElement("tr");

      const statusClass = row["Status Pendaftaran"].toUpperCase() === "DITERIMA" 
        ? "status-diterima" 
        : "status-tidak";

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${row["Nama Lengkap Siswa"]}</td>
        <td>${row["Asal TK/RA"]}</td>
        <td>${row["Jenis Kelamin"]}</td>
        <td>${row["Tanggal Pendaftaran"]}</td>
        <td><span class="${statusClass}">${row["Status Pendaftaran"]}</span></td>
      `;
      tableBody.appendChild(tr);
    });

    jumlahPendaftar.textContent = `Jumlah Pendaftar: ${count}`;
  } catch (err) {
    console.error("Gagal memuat data", err);
  }
}

document.getElementById("refresh-btn").addEventListener("click", loadData);
window.addEventListener("DOMContentLoaded", loadData);
