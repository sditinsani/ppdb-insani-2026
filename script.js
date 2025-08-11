// Konfigurasi
const CONFIG = {
    API_URL: "https://script.google.com/macros/s/AKfycbxy-Ph9RIQMnDDtsOhW8eFj03DK6gmbG1lupGDCYSZ7VBuf69FjvC810xL2U0hRoGfI0A/exec",
    CACHE_TIME: 15 * 60 * 1000 // 15 menit
};

let allData = [];

// Fungsi Utama
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    
    const refreshButton = document.getElementById('refresh-data-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', fetchData);
    }
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
});

// Inisialisasi Halaman
function initializePage() {
    const cachedData = localStorage.getItem('ppdbData');
    const cacheTime = localStorage.getItem('ppdbCacheTime');
    
    if (cachedData && cacheTime && Date.now() - cacheTime < CONFIG.CACHE_TIME) {
        allData = JSON.parse(cachedData);
        renderData(allData);
        showNotification('Menggunakan data cache', 'info');
    } else {
        fetchData();
    }
}

// Ambil Data dari API
async function fetchData() {
    const tableBody = document.querySelector("#data-table tbody");
    const cardContainer = document.getElementById("card-view");
    const totalPendaftar = document.getElementById("total-pendaftar");
    const refreshButton = document.getElementById('refresh-data-button');

    // Tampilkan status loading
    if (refreshButton) {
        refreshButton.classList.add('is-loading');
        refreshButton.disabled = true;
    }
    
    tableBody.innerHTML = `<tr><td colspan="6" class="loading">⏳ Memuat data...</td></tr>`;
    cardContainer.innerHTML = `<p class="loading-card">⏳ Memuat data...</p>`;
    totalPendaftar.textContent = "";

    try {
        const response = await fetch(CONFIG.API_URL);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Gagal mengambil data`);
        }
        
        const data = await response.json();
        
        if (!data || data.error) {
            throw new Error(data.error || "Data tidak valid diterima dari server");
        }
        
        // Filter data yang valid
        allData = data.filter(row => row["No. Urut"] && row["Nama Lengkap Siswa"]);
        
        // Simpan ke cache
        localStorage.setItem('ppdbData', JSON.stringify(allData));
        localStorage.setItem('ppdbCacheTime', Date.now());
        
        renderData(allData);
        showNotification('Data diperbarui', 'success');
        
    } catch (error) {
        console.error("Error:", error);
        
        // Jika online gagal tetapi ada data cache, gunakan itu
        const cachedData = localStorage.getItem('ppdbData');
        if (cachedData) {
            allData = JSON.parse(cachedData);
            renderData(allData);
            showNotification('Menggunakan data cache - ' + error.message, 'warning');
        } else {
            tableBody.innerHTML = `<tr><td colspan="6" class="error">⚠️ Gagal memuat data: ${error.message}</td></tr>`;
            cardContainer.innerHTML = `<p class="error-card">⚠️ Gagal memuat data: ${error.message}</p>`;
            showNotification('Gagal memuat data', 'error');
        }
    } finally {
        if (refreshButton) {
            refreshButton.classList.remove('is-loading');
            refreshButton.disabled = false;
        }
    }
}

// Render Data ke Tabel dan Kartu
function renderData(dataToRender) {
    const tableBody = document.querySelector("#data-table tbody");
    const cardContainer = document.getElementById("card-view");
    const totalPendaftar = document.getElementById("total-pendaftar");
    const searchInput = document.getElementById('search-input');

    // Update total pendaftar
    totalPendaftar.textContent = `Total: ${dataToRender.length}`;

    // Render tabel (desktop)
    tableBody.innerHTML = "";
    if (dataToRender.length === 0) {
        const searchTerm = searchInput ? searchInput.value : '';
        const noDataMessage = searchTerm ? 
            `❌ Tidak ada data dengan nama '${searchTerm}'` : 
            `❌ Tidak ada data`;
        tableBody.innerHTML = `<tr><td colspan="6" class="no-data">${noDataMessage}</td></tr>`;
    } else {
        dataToRender.forEach(row => {
            const tr = document.createElement("tr");
            const status = row["Status Pendaftaran"] ? row["Status Pendaftaran"].toLowerCase() : '';
            const statusClass = status === 'diterima' ? 'status-diterima' : 
                              status === 'ditolak' ? 'status-ditolak' : '';
            
            tr.innerHTML = `
                <td>${row["No. Urut"] || "-"}</td>
                <td>${row["Nama Lengkap Siswa"] || "-"}</td>
                <td>${row["Asal TK/RA"] || "-"}</td>
                <td>${row["Jenis Kelamin"] || "-"}</td>
                <td>${row["Tanggal Pendaftaran"] || "-"}</td>
                <td class="${statusClass}">${row["Status Pendaftaran"] || "-"}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // Render kartu (mobile)
    cardContainer.innerHTML = "";
    if (dataToRender.length === 0) {
        const searchTerm = searchInput ? searchInput.value : '';
        const noDataMessage = searchTerm ? 
            `❌ Tidak ada data dengan nama '${searchTerm}'` : 
            `❌ Tidak ada data`;
        cardContainer.innerHTML = `<p class="no-data-card">${noDataMessage}</p>`;
    } else {
        dataToRender.forEach(row => {
            const card = document.createElement("div");
            card.classList.add("card");
            
            const status = row["Status Pendaftaran"] ? row["Status Pendaftaran"].toLowerCase() : '';
            const statusClass = status === 'diterima' ? 'status-diterima' : 
                              status === 'ditolak' ? 'status-ditolak' : '';
            
            card.innerHTML = `
                <div class="card-item">
                    <span class="card-label">No. Urut:</span>
                    <span class="card-value">${row["No. Urut"] || "-"}</span>
                </div>
                <div class="card-item">
                    <span class="card-label">Nama:</span>
                    <span class="card-value">${row["Nama Lengkap Siswa"] || "-"}</span>
                </div>
                <div class="card-item">
                    <span class="card-label">Asal TK/RA:</span>
                    <span class="card-value">${row["Asal TK/RA"] || "-"}</span>
                </div>
                <div class="card-item">
                    <span class="card-label">Jenis Kelamin:</span>
                    <span class="card-value">${row["Jenis Kelamin"] || "-"}</span>
                </div>
                <div class="card-item">
                    <span class="card-label">Tgl. Daftar:</span>
                    <span class="card-value">${row["Tanggal Pendaftaran"] || "-"}</span>
                </div>
                <div class="card-item">
                    <span class="card-label">Status:</span>
                    <span class="card-value"><span class="${statusClass}">${row["Status Pendaftaran"] || "-"}</span></span>
                </div>
            `;
            cardContainer.appendChild(card);
        });
    }
}

// Handle Pencarian
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = allData.filter(row => {
        return row["Nama Lengkap Siswa"]?.toLowerCase().includes(searchTerm) ||
               row["No. Urut"]?.toString().includes(searchTerm);
    });
    renderData(filteredData);
}

// Tampilkan Notifikasi
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    let icon;
    switch(type) {
        case 'success': icon = 'check-circle'; break;
        case 'error': icon = 'times-circle'; break;
        case 'warning': icon = 'exclamation-circle'; break;
        default: icon = 'info-circle';
    }
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Fungsi untuk Dashboard
function updateDashboard(data) {
    const total = data.length;
    const diterima = data.filter(row => row["Status Pendaftaran"] === "Diterima").length;
    const ditolak = data.filter(row => row["Status Pendaftaran"] === "Ditolak").length;

    document.getElementById('total-pendaftar-dashboard').textContent = total;
    document.getElementById('pendaftar-diterima').textContent = diterima;
    document.getElementById('pendaftar-ditolak').textContent = ditolak;
}
