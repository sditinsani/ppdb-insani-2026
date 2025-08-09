const API_URL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

const tableBody = document.querySelector("#dataTable tbody");
const jumlahPendaftar = document.getElementById("jumlahPendaftar");

async function loadData() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    tableBody.innerHTML = "";
    let count = 0;

    data.forEach((row, index) => {
      // Skip row jika "Nama Lengkap Siswa" kosong
      if (!row["Nama Lengkap Siswa"] || row["Nama Lengkap Siswa"].trim() === "") return;

      count++;
      const status = row["Status Pendaftaran"] || "";
      const statusClass = status.toLowerCase().includes("diterima") ? "status-diterima" : "status-tidak";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${row["Nama Lengkap Siswa"]}</td>
        <td>${row["Asal TK/RA"] || ""}</td>
        <td>${row["Jenis Kelamin"] || ""}</td>
        <td>${row["Tanggal Pendaftaran"] || ""}</td>
        <td><span class="${statusClass}">${status}</span></td>
      `;

      tableBody.appendChild(tr);
    });

    jumlahPendaftar.textContent = `Jumlah Pendaftar: ${count}`;
  } catch (error) {
    tableBody.innerHTML = '<tr><td colspan="6">Gagal memuat data</td></tr>';
    console.error("Gagal fetch data:", error);
  }
}

window.addEventListener("DOMContentLoaded", loadData);
