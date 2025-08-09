// ===== KONFIGURASI =====
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

// ===== AMBIL DATA =====
async function fetchData() {
    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();
        
        // Filter agar data kosong tidak ditampilkan
        const filteredData = data.filter(row => row.nama && row.nama.trim() !== "");

        renderTable(filteredData);
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

// ===== TAMPILKAN DATA KE TABEL =====
function renderTable(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    data.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${row.nama}</td>
            <td>${row.asal}</td>
            <td>${row.jk}</td>
            <td>${row.tanggal}</td>
            <td>${row.status}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// ===== EVENT LISTENER =====
document.getElementById("refreshBtn").addEventListener("click", () => {
    fetchData();
});

// ===== LOAD AWAL =====
fetchData();
