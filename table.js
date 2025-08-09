const SHEET_ID = "AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ";
const SHEET_URL = `https://script.google.com/macros/s/${SHEET_ID}/exec`;

const tableBody = document.querySelector("#dataTable tbody");
const refreshBtn = document.getElementById("refreshBtn");

// Fungsi ambil data dari Spreadsheet
async function loadData() {
    tableBody.innerHTML = `<tr><td colspan="6" class="loading">Memuat data...</td></tr>`;
    try {
        const res = await fetch(SHEET_URL);
        const data = await res.json();

        // Filter agar data kosong tidak ditampilkan
        const validData = data.filter(row => row["Nama Lengkap Siswa"] && row["Nama Lengkap Siswa"].trim() !== "");

        if (validData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="loading">Tidak ada data</td></tr>`;
            return;
        }

        // Tampilkan data
        tableBody.innerHTML = validData.map(row => `
            <tr>
                <td>${row["No. Urut"] || ""}</td>
                <td>${row["Nama Lengkap Siswa"] || ""}</td>
                <td>${row["Asal TK/RA"] || ""}</td>
                <td>${row["Jenis Kelamin"] || ""}</td>
                <td>${row["Tanggal Pendaftaran"] || ""}</td>
                <td><span class="status ${row["Status Pendaftaran"]?.toLowerCase()}">${row["Status Pendaftaran"] || ""}</span></td>
            </tr>
        `).join("");

    } catch (err) {
        tableBody.innerHTML = `<tr><td colspan="6" class="loading">Gagal memuat data</td></tr>`;
        console.error("Error:", err);
    }
}

// Event tombol refresh
refreshBtn.addEventListener("click", loadData);

// Load pertama kali
loadData();
