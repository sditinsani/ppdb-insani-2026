const API_URL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

const tableBody = document.querySelector("#dataTable tbody");
const jumlahPendaftar = document.getElementById("jumlahPendaftar");
const loadingIndicator = document.getElementById("loadingIndicator");
const tableContainer = document.getElementById("tableContainer");
const errorMessage = document.getElementById("errorMessage");

async function loadData() {
  errorMessage.style.display = "none";
  tableContainer.style.display = "none";
  jumlahPendaftar.textContent = "";
  loadingIndicator.style.display = "block";

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    tableBody.innerHTML = "";
    let count = 0;

    data.forEach((row, index) => {
      if (!row["Nama Lengkap Siswa"] || row["Nama Lengkap Siswa"].trim() === "") return;

      count++;
      const status = (row["Status Pendaftaran"] || "").toLowerCase();
      const statusClass = status.includes("diterima") ? "status-diterima" : "status-tidak";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td data-label="No. Urut">${index + 1}</td>
        <td data-label="Nama Lengkap Siswa">${row["Nama Lengkap Siswa"]}</td>
        <td data-label="Asal TK/RA">${row["Asal TK/RA"] || ""}</td>
        <td data-label="Jenis Kelamin">${row["Jenis Kelamin"] || ""}</td>
        <td data-label="Tanggal Pendaftaran">${row["Tanggal Pendaftaran"] || ""}</td>
        <td data-label="Status Pendaftaran"><span class="${statusClass}">${row["Status Pendaftaran"] || ""}</span></td>
      `;
      tableBody.appendChild(tr);
    });

    if (count === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" class="loading">Tidak ada data pendaftar.</td></tr>';
    }

    jumlahPendaftar.textContent = `Jumlah Pendaftar: ${count}`;
    tableContainer.style.display = "block";

  } catch (error) {
    errorMessage.textContent = "Gagal memuat data. Silakan coba lagi.";
    errorMessage.style.display = "block";
    console.error("Gagal fetch data:", error);
  } finally {
    loadingIndicator.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", loadData);
