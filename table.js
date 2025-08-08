const API_URL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

const statusFilter = document.getElementById("statusFilter");
const totalDisplay = document.getElementById("totalPendaftar");
const tbody = document.querySelector("#pendaftarTable tbody");

let allData = [];

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    allData = data.filter(item => item["No. Urut"]);
    renderTable(allData);
    populateStatusOptions(allData);
  })
  .catch(error => {
    console.error("Gagal memuat data:", error);
  });

function populateStatusOptions(data) {
  const statuses = [...new Set(data.map(item => item["Status Pendaftaran"]))];
  statuses.forEach(status => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    statusFilter.appendChild(option);
  });

  statusFilter.addEventListener("change", () => {
    const selected = statusFilter.value;
    const filtered = selected === "semua"
      ? allData
      : allData.filter(item => item["Status Pendaftaran"] === selected);
    renderTable(filtered);
  });
}

function renderTable(data) {
  tbody.innerHTML = "";
  totalDisplay.textContent = data.length;

  data.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item["No. Urut"]}</td>
      <td>${item["Nama Lengkap Siswa"]}</td>
      <td>${item["Asal TK/RA"]}</td>
      <td>${item["Jenis Kelamin"]}</td>
      <td>${item["Tanggal Pendaftaran"]}</td>
      <td>${item["Status Pendaftaran"]}</td>
    `;
    tbody.appendChild(tr);
  });
}
