const tableBody = document.getElementById("tableBody");
const refreshBtn = document.getElementById("refreshBtn");

const scriptURL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

// Fungsi ambil data
async function loadData() {
    tableBody.innerHTML = "<tr><td colspan='6'>Memuat data...</td></tr>";
    try {
        const res = await fetch(scriptURL);
        const data = await res.json();

        // Filter data kosong
        const filteredData = data.filter(row => row['Nama Lengkap Siswa'] && row['Nama Lengkap Siswa'].trim() !== "");

        tableBody.innerHTML = "";
        filteredData.forEach(row => {
            const statusClass = row['Status Pendaftaran'].toLowerCase() === "diterima" ? "status-diterima" : "status-tolak";

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row['No. Urut']}</td>
                <td>${row['Nama Lengkap Siswa']}</td>
                <td>${row['Asal TK/RA']}</td>
                <td>${row['Jenis Kelamin']}</td>
                <td>${row['Tanggal Pendaftaran']}</td>
                <td><span class="${statusClass}">${row['Status Pendaftaran'].toUpperCase()}</span></td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        tableBody.innerHTML = `<tr><td colspan='6'>Gagal memuat data</td></tr>`;
        console.error(error);
    }
}

refreshBtn.addEventListener("click", loadData);

// Load data saat pertama kali
loadData();
