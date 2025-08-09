const sheetURL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";
const tableBody = document.querySelector("#dataTable tbody");
const refreshButton = document.getElementById("refreshButton");

async function fetchData() {
    tableBody.innerHTML = `<tr><td colspan="6" class="loading">Memuat data...</td></tr>`;

    try {
        const response = await fetch(sheetURL);
        const data = await response.json();

        if (!data || data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="loading">Tidak ada data</td></tr>`;
            return;
        }

        tableBody.innerHTML = "";

        data.forEach((row) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row["No. Urut"] || ""}</td>
                <td>${row["Nama Lengkap Siswa"] || ""}</td>
                <td>${row["Asal TK/RA"] || ""}</td>
                <td>${row["Jenis Kelamin"] || ""}</td>
                <td>${row["Tanggal Pendaftaran"] || ""}</td>
                <td>${row["Status Pendaftaran"] || ""}</td>
            `;
            tableBody.appendChild(tr);
        });

    } catch (error) {
        console.error("Gagal memuat data:", error);
        tableBody.innerHTML = `<tr><td colspan="6" class="loading">Gagal memuat data</td></tr>`;
    }
}

// Event klik tombol refresh
refreshButton.addEventListener("click", fetchData);

// Ambil data pertama kali saat halaman dibuka
fetchData();

