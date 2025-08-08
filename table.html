const statusFilter = document.getElementById("statusFilter");
const totalDisplay = document.getElementById("totalPendaftar");
let allData = [];

fetch("https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec")
  .then(response => response.json())
  .then(data => {
    const filteredData = data.filter(item => item["No. Urut"]);
    allData = filteredData;
    renderTable(filteredData);
    renderFilterOptions(filteredData);
  })
  .catch(error => {
    console.error("Gagal mengambil data:", error);
    document.getElementById("tabel-wrapper").innerHTML = "<p style='color:red'>Gagal memuat data. Silakan cek koneksi atau URL.</p>";
  });

function renderFilterOptions(data) {
  const statusSet = new Set(data.map(item => item["Status Pendaftaran"]));
  statusSet.forEach(status => {
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
  const wrapper = document.getElementById("tabel-wrapper");
  wrapper.innerHTML = `
    <div class="table-container">
      <table id="pendaftarTable">
        <thead>
          <tr>
            <th><i class="fas fa-hashtag"></i> No. Urut</th>
            <th><i class="fas fa-user"></i> Nama Lengkap</th>
            <th><i class="fas fa-school"></i> Asal TK/RA</th>
            <th><i class="fas fa-venus-mars"></i> Jenis Kelamin</th>
            <th><i class="fas fa-calendar-alt"></i> Tanggal Pendaftaran</th>
            <th><i class="fas fa-info-circle"></i> Status</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(item => `
            <tr>
              <td>${item["No. Urut"]}</td>
              <td>${item["Nama Lengkap Siswa"]}</td>
              <td>${item["Asal TK/RA"]}</td>
              <td>${item["Jenis Kelamin"]}</td>
              <td>${item["Tanggal Pendaftaran"]}</td>
              <td>${item["Status Pendaftaran"]}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  if (totalDisplay) {
    totalDisplay.textContent = data.length;
  }
}
