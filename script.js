const API_URL = "https://script.google.com/macros/s/AKfycbzQsYJ_clOLKVOaA_kcW6T271aBwxNETVhOqWEYLIH8LB_X0gl6KxqnA3feR1uhJAyIzQ/exec";

async function fetchData() {
    const loadingEl = document.getElementById("loading");
    const errorEl = document.getElementById("error");
    const container = document.getElementById("data-container");

    loadingEl.classList.remove("hidden");
    errorEl.classList.add("hidden");
    container.innerHTML = "";

    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Gagal fetch");
        const data = await res.json();

        loadingEl.classList.add("hidden");

        if (data.length === 0) {
            container.innerHTML = "<p style='text-align:center;'>Tidak ada data pendaftar.</p>";
            return;
        }

        data.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${item["Nama Lengkap Siswa"]}</h3>
                <p><strong>Asal TK/RA:</strong> ${item["Asal TK/RA"]}</p>
                <p><strong>Jenis Kelamin:</strong> ${item["Jenis Kelamin"]}</p>
                <p><strong>Tanggal Pendaftaran:</strong> ${item["Tanggal Pendaftaran"]}</p>
                <p><span class="status ${item["Status Pendaftaran"] === "Diterima" ? "diterima" : "tidak"}">
                    ${item["Status Pendaftaran"]}
                </span></p>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        loadingEl.classList.add("hidden");
        errorEl.classList.remove("hidden");
    }
}

document.addEventListener("DOMContentLoaded", fetchData);
