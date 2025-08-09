// ID Google Apps Script yang diberikan
const scriptURL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

document.addEventListener("DOMContentLoaded", loadData);
document.getElementById("refreshBtn").addEventListener("click", loadData);

function loadData() {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = `<tr><td colspan="6" class="loading">Memuat data...</td></tr>`;

    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            // Hapus data kosong
            const filteredData = data.filter(row => row["Nama Lengkap Siswa"] && row["Nama Lengkap Siswa"].trim() !== "");

            if (filteredData.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="loading">Tidak ada data</td></tr>`;
                return;
            }

            tbody.innerHTML = "";
            filteredData.forEach((row, index) => {
                const statusClass = row["Status Pendaftaran"]?.toLowerCase().includes("diterima")
                    ? "status-diterima"
                    : row["Status Pendaftaran"]?.toLowerCase().includes("proses")
                        ? "status-proses"
                        : "status-ditolak";

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${row["Nama Lengkap Siswa"]}</td>
                    <td>${row["Asal TK/RA"]}</td>
                    <td>${row["Jenis Kelamin"]}</td>
                    <td>${row["Tanggal Pendaftaran"]}</td>
                    <td class="${statusClass}">${row["Status Pendaftaran"]}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error("Gagal mengambil data:", error);
            tbody.innerHTML = `<tr><td colspan="6" class="loading">Gagal memuat data</td></tr>`;
        });
}
