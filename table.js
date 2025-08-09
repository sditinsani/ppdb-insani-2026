const apiUrl = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";
const tableBody = document.querySelector("#dataTable tbody");
const refreshBtn = document.getElementById("refreshBtn");

async function loadData() {
    tableBody.innerHTML = `<tr><td colspan="6">Memuat data...</td></tr>`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.length > 0) {
            tableBody.innerHTML = "";
            data.forEach(row => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${row["No. Urut"]}</td>
                    <td>${row["Nama Lengkap Siswa"]}</td>
                    <td>${row["Asal TK/RA"]}</td>
                    <td>${row["Jenis Kelamin"]}</td>
                    <td>${row["Tanggal Pendaftaran"]}</td>
                    <td>${row["Status Pendaftaran"]}</td>
                `;
                tableBody.appendChild(tr);
            });
        } else {
            tableBody.innerHTML = `<tr><td colspan="6">Tidak ada data</td></tr>`;
        }
    } catch (error) {
        console.error("Gagal memuat data:", error);
        tableBody.innerHTML = `<tr><td colspan="6">Gagal memuat data</td></tr>`;
    }
}

// Event tombol refresh
refreshBtn.addEventListener("click", loadData);

// Load data pertama kali
loadData();
