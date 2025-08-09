const SHEET_ID = "AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ";
const TABLE_BODY = document.querySelector("#dataTable tbody");
const REFRESH_BTN = document.getElementById("refreshBtn");

async function fetchData() {
  try {
    const res = await fetch(`https://script.google.com/macros/s/${SHEET_ID}/exec`);
    const data = await res.json();

    // Hapus isi tabel lama
    TABLE_BODY.innerHTML = "";

    // Filter data kosong (misal kolom Nama Lengkap Siswa kosong)
    const filteredData = data.filter(row => row[1] && row[1].trim() !== "");

    // Masukkan data ke tabel
    filteredData.forEach(row => {
      const tr = document.createElement("tr");
      row.forEach(cell => {
        const td = document.createElement("td");
        td.textContent = cell || "-";
        tr.appendChild(td);
      });
      TABLE_BODY.appendChild(tr);
    });
  } catch (err) {
    console.error("Gagal mengambil data:", err);
  }
}

// Jalankan pertama kali
fetchData();

// Event tombol refresh
REFRESH_BTN.addEventListener("click", fetchData);
