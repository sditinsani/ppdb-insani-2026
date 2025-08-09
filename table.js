const sheetURL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

document.addEventListener("DOMContentLoaded", () => {
  fetchData();

  // Event tombol refresh
  document.getElementById("refreshBtn").addEventListener("click", () => {
    fetchData();
  });
});

function fetchData() {
  fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector("#dataTable tbody");
      tbody.innerHTML = "";
      data.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td data-label="No">${index + 1}</td>
          <td data-label="Nama Lengkap Siswa">${row["Nama Lengkap Siswa"]}</td>
          <td data-label="Asal TK/RA">${row["Asal TK/RA"]}</td>
          <td data-label="Jenis Kelamin">${row["Jenis Kelamin"]}</td>
          <td data-label="Tanggal Pendaftaran">${row["Tanggal Pendaftaran"]}</td>
          <td data-label="Status Pendaftaran">${row["Status Pendaftaran"]}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => console.error("Gagal mengambil data:", error));
}
