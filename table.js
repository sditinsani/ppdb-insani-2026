fetch('https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec')
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector("#pendaftarTable tbody");
    let count = 0;

    data.forEach(item => {
      // Lewati data kosong
      if (!item["No. Urut"] || !item["Nama Lengkap Siswa"]) return;

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
      count++;
    });

    document.getElementById("totalCount").textContent = count;
  })
  .catch(error => {
    console.error("Gagal mengambil data:", error);
  });
