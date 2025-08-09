const sheetID = "AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ";
const sheetName = "tampilan_web";
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

const tableBody = document.querySelector("#dataTable tbody");
const jumlahPendaftar = document.getElementById("jumlahPendaftar");

fetch(url)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    tableBody.innerHTML = "";
    let count = 0;

    rows.forEach(row => {
      // Pastikan kolom Nama Lengkap Siswa tidak kosong
      const nama = row.c[1]?.v?.trim() || "";
      if (!nama) return;

      count++;
      const noUrut = row.c[0]?.v || count;
      const asal = row.c[2]?.v || "";
      const jk = row.c[3]?.v || "";
      const tgl = row.c[4]?.v || "";
      const status = row.c[5]?.v || "";

      const statusClass = status.toLowerCase().includes("diterima") ? "status-diterima" : "status-tidak";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${noUrut}</td>
        <td>${nama}</td>
        <td>${asal}</td>
        <td>${jk}</td>
        <td>${tgl}</td>
        <td><span class="${statusClass}">${status}</span></td>
      `;

      tableBody.appendChild(tr);
    });

    jumlahPendaftar.textContent = `Jumlah Pendaftar: ${count}`;
  })
  .catch(err => {
    tableBody.innerHTML = '<tr><td colspan="6">Gagal memuat data</td></tr>';
    console.error("Error fetch data:", err);
  });
