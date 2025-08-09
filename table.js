// ====== KONFIGURASI ======
const WEB_APP_ID = "AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ";
const WEB_APP_URL = `https://script.google.com/macros/s/${WEB_APP_ID}/exec`;

// ====== FUNGSI AMBIL DATA ======
async function fetchData() {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = `<tr><td colspan="6" class="loading">Memuat data...</td></tr>`;

    try {
        const response = await fetch(WEB_APP_URL);
        const data = await response.json();

        // Filter data kosong
        const filteredData = data.filter(row => row[0] && row[1]);

        if (filteredData.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="loading">Tidak ada data.</td></tr>`;
            return;
        }

        tbody.innerHTML = "";
        filteredData.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Gagal memuat data:", error);
        tbody.innerHTML = `<tr><td colspan="6" class="loading">Gagal memuat data.</td></tr>`;
    }
}

// ====== EVENT TOMBOL REFRESH ======
document.querySelector("#refreshBtn").addEventListener("click", () => {
    fetchData();
});

// ====== LOAD AWAL ======
fetchData();
