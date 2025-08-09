// URL JSON dari Google Spreadsheet (ubah dengan link JSON kamu)
const sheetURL = "https://opensheet.elk.sh/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/tampilan_web";

async function fetchData() {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Memuat data...</td></tr>";

    try {
        const response = await fetch(sheetURL);
        if (!response.ok) throw new Error("Gagal mengambil data");
        const data = await response.json();

        tableBody.innerHTML = "";

        if (data.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Tidak ada data</td></tr>";
            return;
        }

        data.forEach(row => {
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
        console.error(error);
        tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center; color:red;'>Gagal memuat data</td></tr>";
    }
}

// Tombol refresh status
document.querySelector("#refreshBtn").addEventListener("click", fetchData);

// Ambil data pertama kali saat halaman dibuka
fetchData();
