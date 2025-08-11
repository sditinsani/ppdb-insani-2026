const API_URL = "https://script.google.com/macros/s/AKfycbxy-Ph9RIQMnDDtsOhW8eFj03DK6gmbG1lupGDCYSZ7VBuf69FjvC810xL2U0hRoGfI0A/exec";

let allData = [];

async function fetchData() {
    const tableBody = document.querySelector("#data-table tbody");
    const cardContainer = document.getElementById("card-view");
    const totalPendaftar = document.getElementById("total-pendaftar");
    const refreshButton = document.getElementById('refresh-button');

    refreshButton.classList.add('is-loading');
    refreshButton.disabled = true;
    
    tableBody.innerHTML = `<tr><td colspan="6" class="loading">⏳ Memuat data...</td></tr>`;
    cardContainer.innerHTML = `<p class="loading-card">⏳ Memuat data...</p>`;
    totalPendaftar.textContent = "";

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        allData = data.filter(row =>
            row["No. Urut"] && row["Nama Lengkap Siswa"]
        );

        if (allData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="no-data">❌ Tidak ada data</td></tr>`;
            cardContainer.innerHTML = `<p class="no-data-card">❌ Tidak ada data</p>`;
            return;
        }

        renderData(allData);

    } catch (error) {
        console.error("Gagal memuat data:", error);
        tableBody.innerHTML = `<tr><td colspan="6" class="error">⚠️ Gagal memuat data</td></tr>`;
        cardContainer.innerHTML = `<p class="error-card">⚠️ Gagal memuat data</p>`;
    } finally {
        refreshButton.classList.remove('is-loading');
        refreshButton.disabled = false;
    }
}

function renderData(dataToRender) {
    const tableBody = document.querySelector("#data-table tbody");
    const cardContainer = document.getElementById("card-view");
    const totalPendaftar = document.getElementById("total-pendaftar");
    const searchInput = document.getElementById('search-input');

    totalPendaftar.textContent = `Total: ${dataToRender.length}`;

    tableBody.innerHTML = "";
    if (dataToRender.length === 0) {
        const searchTerm = searchInput.value;
        const noDataMessage = searchTerm ? `❌ Tidak ada data dengan nama '${searchTerm}'` : `❌ Tidak ada data`;
        tableBody.innerHTML = `<tr><td colspan="6" class="no-data">${noDataMessage}</td></tr>`;
    } else {
        dataToRender.forEach(row => {
            const tr = document.createElement("tr");
            const statusText = row["Status Pendaftaran"]?.toLowerCase();
            const statusClass = statusText === "diterima" ? "status-diterima" : "status-ditolak";
            
            tr.innerHTML = `
                <td>${row["No. Urut"] || ""}</td>
                <td>${row["Nama Lengkap Siswa"] || ""}</td>
                <td>${row["Asal TK/RA"] || ""}</td>
                <td>${row["Jenis Kelamin"] || ""}</td>
                <td>${row["Tanggal Pendaftaran"] || ""}</td>
                <td class="${statusClass}">${row["Status Pendaftaran"] || ""}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    cardContainer.innerHTML = "";
    if (dataToRender.length === 0) {
        const searchTerm = searchInput.value;
        const noDataMessage = searchTerm ? `❌ Tidak ada data dengan nama '${searchTerm}'` : `❌ Tidak ada data`;
        cardContainer.innerHTML = `<p class="no-data-card">${noDataMessage}</p>`;
    } else {
        dataToRender.forEach(row => {
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
                    <span class="card-value"><span class="${statusClass}">${row["Status Pendaftaran"] || ""}</span></span>
                </div>
            `;
            cardContainer.appendChild(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', fetchData);
    }
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredData = allData.filter(row => {
                return row["Nama Lengkap Siswa"]?.toLowerCase().includes(searchTerm);
            });
            renderData(filteredData);
        });
    }
});
