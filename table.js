const scriptURL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";
const tableBody = document.getElementById("tableBody");
const refreshBtn = document.getElementById("refreshBtn");

async function loadData() {
  tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Memuat data...</td></tr>";
  
  try {
    const res = await fetch(scriptURL);
    const data = await res.json();

    tableBody.innerHTML = "";

    // Filter data kosong
    const filteredData = data.filter(row => row["Nama Lengkap Siswa"] && row["Nama Lengkap Siswa"].trim() !== "");

    if (filteredData.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Tidak ada data</td></tr>";
      return;
    }

    filteredData.forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${row["Nama Lengkap Siswa"]}</td>
        <td>${row["Asal TK/RA"] || "-"}</td>
        <td>${row["Jenis Kelamin"] || "-"}</td>
        <td>${row["Tanggal Pendaftaran"] || "-"}</td>
        <td>${row["Status Pendaftaran"] || "-"}</td>
      `;
      tableBody.appendChild(tr);
    });

  } catch (error) {
    console.error("Gagal memuat data", error);
    tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center;color:red;'>Gagal memuat data</td></tr>";
  }
}

// Event klik tombol refresh
refreshBtn.addEventListener("click", loadData);

// Load data pertama kali
loadData();
