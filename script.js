const API_URL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

async function fetchData() {
    const tableBody = document.querySelector("#data-table tbody");
    const cardContainer = document.getElementById("card-view");

    tableBody.innerHTML = `<tr><td colspan="6" class="loading">⏳ Memuat data...</td></tr>`;
    cardContainer.innerHTML = `<p class="loading-card">⏳ Memuat data...</p>`;

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const filteredData = data.filter(row =>
            row["No. Urut"] && row["Nama Lengkap Siswa"]
        );

        if (filteredData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="no-data">❌ Tidak ada data</td></tr>`;
            cardContainer.innerHTML = `<p class="no-data-card">❌ Tidak ada data</p>`;
            return;
        }

        tableBody.innerHTML = "";
        filteredData.forEach(row => {
            const tr = document.createElement("tr");
            const statusText = row["Status Pendaftaran"]?.toLowerCase();
            const statusClass = statusText === "diterima" ? "status-diterima" : "status-ditolak";
            
            tr.innerHTML = `
                <td>${row["No. Urut"] || ""}</td>
                <td>${row["Nama Lengkap Siswa"] || ""}</td>
                <td>${row["Asal TK/RA"] || ""}</td>
                <td>${row["Jenis Kelamin"] || ""}</td>
                <td>${row["Tanggal Pendaftaran"] || ""}</td>
                <td class="${statusClass}"><div class="status-content">${row["Status Pendaftaran"] || ""}</div></td>
            `;
            tableBody.appendChild(tr);
        });

        cardContainer.innerHTML = "";
        filteredData.forEach(row => {
            const card = document.createElement("div");
            card.classList.add("card");
            
            const statusText = row["Status Pendaftaran"]?.toLowerCase();
            const statusClass = statusText === "diterima" ? "status-diterima" : "status-ditolak";
            
            card.innerHTML = `
                <div class="card-item">
                    <span class="card-label">No. Urut:</span>
                    <span class="card-value">${row["No. Urut"] || ""}</span>
                </div>
                <div class="card-item">
                    <span class="card-label">Nama:</span>
                    <span class="card-value">${row["Nama Lengkap Siswa"] || ""}</span>
                </div>
                <div class="card-item">
                    <span class="card-label">Asal TK/RA:</span>
                    <span class="card-value">${row["Asal TK/RA"] || ""}</span>
                </div>
                <div class="card-item">
                    <span class="card-label">Jenis Kelamin:</span>
                    <span class="card-value">${row["Jenis Kelamin"] || ""}</span>
                </div>
                <div class="card-item">
                    <span class="card-label">Tgl. Daftar:</span>
                    <span class="card-value">${row["Tanggal Pendaftaran"] || ""}</span>
                </div>
                <div class="card-item">
                    <span class="card-label">Status:</span>
                    <span class="card-value"><div class="${statusClass}">${row["Status Pendaftaran"] || ""}</div></span>
                </div>
            `;
            cardContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Gagal memuat data:", error);
        tableBody.innerHTML = `<tr><td colspan="6" class="error">⚠️ Gagal memuat data</td></tr>`;
        cardContainer.innerHTML = `<p class="error-card">⚠️ Gagal memuat data</p>`;
    }
}

// Tambahkan event listener untuk tombol refresh
document.addEventListener('DOMContentLoaded', () => {
    fetchData(); // Panggil saat halaman dimuat
    
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', fetchData);
    }
});
