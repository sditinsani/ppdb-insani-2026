const SHEET_URL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

async function loadData() {
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Memuat data...</td></tr>`;

  try {
    const response = await fetch(SHEET_URL);
    const data = await response.json();

    tableBody.innerHTML = "";

    data.forEach(row => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${row["No. Urut"]}</td>
        <td>${row["Nama Lengkap Siswa"]}</td>
        <td>${row["Asal TK/RA"]}</td>
        <td>${row["Jenis Kelamin"]}</td>
        <td>${row["Tanggal Pendaftaran"]}</td>
        <td class="${row["Status Pendaftaran"] === 'Diterima' ? 'status-diterima' : 'status-tidak'}">
          ${row["Status Pendaftaran"]}
        </td>
      `;

      tableBody.appendChild(tr);
    });

  } catch (error) {
    console.error("Gagal memuat data:", error);
    tableBody.innerHTML = `<tr><td colspan="6" style="color:red;text-align:center;">Gagal memuat data!</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", loadData);
