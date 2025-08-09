const SHEET_ID = "AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ";
const SHEET_NAME = "tampilan_web";
const ENDPOINT = `https://script.google.com/macros/s/${SHEET_ID}/exec?sheet=${SHEET_NAME}`;

const tableBody = document.querySelector("#dataTable tbody");
const jumlahPendaftar = document.getElementById("totalPendaftar");
const refreshBtn = document.getElementById("refreshBtn");

async function loadData() {
    try {
        const res = await fetch(ENDPOINT);
        const data = await res.json();

        tableBody.innerHTML = "";
        let count = 0;

        data.forEach((row, index) => {
            // Cek jika baris kosong, jangan tampilkan
            if (!row["Nama Lengkap Siswa"] || row["Nama Lengkap Siswa"].trim() === "") return;

            count++;
            const tr = document.createElement("tr");

            const statusClass = row["Status Pendaftaran"]?.toUpperCase() === "DITERIMA" 
                ? "status-diterima" 
                : "status-tidak";

            tr.innerHTML = `
                <td>${count}</td>
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
        tableBody.innerHTML = `<tr><td colspan="6">Gagal memuat data</td></tr>`;
    }
}

refreshBtn.addEventListener("click", loadData);
window.addEventListener("DOMContentLoaded", loadData);
