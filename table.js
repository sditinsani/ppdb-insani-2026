const API_URL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

const tableBody = document.querySelector("#dataTable tbody");
const jumlahPendaftar = document.getElementById("jumlahPendaftar");
const loadingIndicator = document.getElementById("loadingIndicator");
const tableContainer = document.getElementById("tableContainer");
const errorMessage = document.getElementById("errorMessage");

// Buat container kartu untuk mobile (dynamic)
let cardContainer = document.getElementById("cardContainer");
if (!cardContainer) {
  cardContainer = document.createElement("div");
  cardContainer.id = "cardContainer";
  cardContainer.style.display = "none"; // default hidden desktop
  document.querySelector("main").insertBefore(cardContainer, jumlahPendaftar);
}

function isMobile() {
  return window.innerWidth <= 768;
}

async function loadData() {
  errorMessage.style.display = "none";
  tableContainer.style.display = "none";
  cardContainer.style.display = "none";
  jumlahPendaftar.textContent = "";
  loadingIndicator.style.display = "block";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Bersihkan dulu
    tableBody.innerHTML = "";
    cardContainer.innerHTML = "";

    let count = 0;

    data.forEach((row) => {
      if (!row["Nama Lengkap Siswa"] || row["Nama Lengkap Siswa"].trim() === "") return;

      count++;

      const statusText = (row["Status Pendaftaran"] || "").toLowerCase();
      const diterima = statusText === "diterima";

      // Tambah baris tabel desktop
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td data-label="No. Urut">${count}</td>
        <td data-label="Nama Lengkap Siswa">${row["Nama Lengkap Siswa"]}</td>
        <td data-label="Asal TK/RA">${row["Asal TK/RA"] || ""}</td>
        <td data-label="Jenis Kelamin">${row["Jenis Kelamin"] || ""}</td>
        <td data-label="Tanggal Pendaftaran">${row["Tanggal Pendaftaran"] || ""}</td>
        <td data-label="Status Pendaftaran"><span class="status-${diterima ? "diterima" : "tidak"}">${row["Status Pendaftaran"] || ""}</span></td>
      `;
      tableBody.appendChild(tr);

      // Tambah card mobile
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h2>${row["Nama Lengkap Siswa"]}</h2>
        <p><strong>No. Urut:</strong> ${count}</p>
        <p><strong>Asal TK/RA:</strong> ${row["Asal TK/RA"] || "-"}</p>
        <p><strong>Jenis Kelamin:</strong> ${row["Jenis Kelamin"] || "-"}</p>
        <p><strong>Tanggal Pendaftaran:</strong> ${row["Tanggal Pendaftaran"] || "-"}</p>
        <p><strong>Status:</strong> <span class="status ${diterima ? "diterima" : "tidak"}">${row["Status Pendaftaran"] || "-"}</span></p>
      `;
      cardContainer.appendChild(card);
    });

    if (count === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" class="loading">Tidak ada data pendaftar.</td></tr>';
      cardContainer.innerHTML = '<p class="loading" style="text-align:center;">Tidak ada data pendaftar.</p>';
    }

    jumlahPendaftar.textContent = `Jumlah Pendaftar: ${count}`;

    // Tampilkan sesuai ukuran layar
    if (isMobile()) {
      tableContainer.style.display = "none";
      cardContainer.style.display = "block";
      jumlahPendaftar.style.textAlign = "center";
    } else {
      tableContainer.style.display = "block";
      cardContainer.style.display = "none";
      jumlahPendaftar.style.textAlign = "right";
    }

  } catch (error) {
    errorMessage.textContent = "Gagal memuat data. Silakan coba lagi.";
    errorMessage.style.display = "block";
    console.error("Gagal fetch data:", error);
  } finally {
    loadingIndicator.style.display = "none";
  }
}

// Perbarui tampilan saat resize window
window.addEventListener("resize", () => {
  if (!jumlahPendaftar.textContent) return; // data belum dimuat
  if (window.innerWidth <= 768) {
    tableContainer.style.display = "none";
    cardContainer.style.display = "block";
    jumlahPendaftar.style.textAlign = "center";
  } else {
    tableContainer.style.display = "block";
    cardContainer.style.display = "none";
    jumlahPendaftar.style.textAlign = "right";
  }
});

window.addEventListener("DOMContentLoaded", loadData);
