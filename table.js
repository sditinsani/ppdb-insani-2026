const url = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

const tableBody = document.querySelector("#pendaftarTable tbody");
const totalCount = document.getElementById("totalCount");
const statusFilter = document.getElementById("statusFilter");
const searchNama = document.getElementById("searchNama");

let allData = [];

function renderTable(data) {
  tableBody.innerHTML = "";
  let count = 0;

  data.forEach(item => {
    // Lewati data yang kolomnya kosong
    if (!item["No. Urut"] || !item["Nama Lengkap Siswa"] || !item["Asal TK/RA"] || !item["Jenis Kelamin"] || !item["Tanggal Pendaftaran"] || !item["Status Pendaftaran"]) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item["No. Urut"]}</td>
      <td>${item["Nama Lengkap Siswa"]}</td>
      <td>${item["Asal TK/RA"]}</td>
      <td>${item["Jenis Kelamin"]}</td>
      <td>${item["Tanggal Pendaftaran"]}</td>
      <td>${item["Status Pendaftaran"]}</td>
    `;
    tableBody.appendChild(tr);
    count++;
  });

  totalCount.textContent = count;
}

function applyFilters() {
  const statusValue = statusFilter.value.toLowerCase();
  const namaValue = searchNama.value.toLowerCase();

  const filtered = allData.filter(item => {
    const statusMatch = statusValue === "" || (item["Status Pendaftaran"] && item["Status Pendaftaran"].toLowerCase() === statusValue);
    const namaMatch = namaValue === "" || (item["Nama Lengkap Siswa"] && item["Nama Lengkap Siswa"].toLowerCase().includes(namaValue));
    return statusMatch && namaMatch;
  });

  renderTable(filtered);
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    allData = data;
    applyFilters();
  })
  .catch(error => {
    console.error("Gagal mengambil data:", error);
  });

statusFilter.addEventListener("change", applyFilters);
searchNama.addEventListener("input", applyFilters);
