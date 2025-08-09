const sheetURL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

async function loadData() {
  const tbody = document.querySelector("#data-table tbody");
  tbody.innerHTML = `<tr><td colspan="6" class="loading">Memuat data...</td></tr>`;

  try {
    const res = await fetch(sheetURL);
    const data = await res.json();

    // Filter data kosong (Nama Lengkap kosong)
    const filteredData = data.filter(row => row["Nama Lengkap Siswa"] && row["Nama Lengkap Siswa"].trim() !== "");

    if (filteredData.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="loading">Tidak ada data</td></tr>`;
      return;
    }

    tbody.innerHTML = "";
    filteredData.forEach((row, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td data-label="No">${row["No. Urut"] || index + 1}</td>
        <td data-label="Nama Lengkap">${row["Nama Lengkap Siswa"]}</td>
        <td data-label="Asal TK/RA">${row["Asal TK/RA"] || "-"}</td>
        <td data-label="Jenis Kelamin">${row["Jenis Kelamin"] || "-"}</td>
        <td data-label="Tanggal Pendaftaran">${row["Tanggal Pendaftaran"] || "-"}</td>
        <td data-label="Status">${row["Status Pendaftaran"] || "-"}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="6" class="loading">Gagal memuat data</td></tr>`;
    console.error("Error:", error);
  }
}

// Tombol refresh status
document.getElementById("refreshBtn").addEventListener("click", () => {
  loadData();
});

// Load awal
loadData();
