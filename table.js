const sheetID = "AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ";
const sheetName = "tampilan_web";
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

fetch(url)
    .then(res => res.text())
    .then(data => {
        const jsonData = JSON.parse(data.substr(47).slice(0, -2));
        const rows = jsonData.table.rows;
        const tableBody = document.querySelector("#dataTable tbody");

        let count = 0;
        tableBody.innerHTML = "";

        rows.forEach(row => {
            // Cek jika data tidak kosong
            if (row.c[0] && row.c[1]) {
                const noUrut = row.c[0]?.v || "";
                const nama = row.c[1]?.v || "";
                const asal = row.c[2]?.v || "";
                const jk = row.c[3]?.v || "";
                const tgl = row.c[4]?.v || "";
                const status = row.c[5]?.v || "";

                const statusClass = status.toLowerCase().includes("diterima") ? "status-diterima" : "status-tidak";

                const tr = `
                    <tr>
                        <td>${noUrut}</td>
                        <td>${nama}</td>
                        <td>${asal}</td>
                        <td>${jk}</td>
                        <td>${tgl}</td>
                        <td><span class="${statusClass}">${status}</span></td>
                    </tr>
                `;

                tableBody.innerHTML += tr;
                count++;
            }
        });

        document.getElementById("jumlahPendaftar").innerText = `Jumlah Pendaftar: ${count}`;
    })
    .catch(err => console.error("Gagal memuat data:", err));
