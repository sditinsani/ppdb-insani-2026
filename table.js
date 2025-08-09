const SHEET_ID = "AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ";
const TABLE_BODY = document.querySelector("#dataTable tbody");
const REFRESH_BTN = document.getElementById("refreshBtn");

async function loadData() {
    TABLE_BODY.innerHTML = `<tr><td colspan="6" class="loading">Memuat data...</td></tr>`;
    try {
        const res = await fetch(`https://script.google.com/macros/s/${SHEET_ID}/exec`);
        const data = await res.json();

        // Hanya tampilkan data yang tidak kosong
        const filtered = data.filter(row => row.nama && row.nama.trim() !== "");

        if (filtered.length === 0) {
            TABLE_BODY.innerHTML = `<tr><td colspan="6" class="loading">Tidak ada data</td></tr>`;
            return;
        }

        TABLE_BODY.innerHTML = filtered.map((row, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${row.nama}</td>
                <td>${row.asal_tk}</td>
                <td>${row.jk}</td>
                <td>${row.tanggal}</td>
                <td>${row.status}</td>
            </tr>
        `).join("");

    } catch (err) {
        console.error(err);
        TABLE_BODY.innerHTML = `<tr><td colspan="6" class="loading">Gagal memuat data</td></tr>`;
    }
}

REFRESH_BTN.addEventListener("click", loadData);

document.addEventListener("DOMContentLoaded", loadData);
