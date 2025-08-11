body {
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    padding: 0;
    background: #f9fafb;
    color: #333;
}

header {
    background: #2563eb;
    color: white;
    text-align: center;
    padding: 15px;
    font-size: 1.2rem;
}

#loading, #error {
    text-align: center;
    padding: 15px;
    font-size: 1rem;
}

.hidden {
    display: none;
}

.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 15px;
    padding: 15px;
}

.card {
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
}

.card:hover {
    transform: translateY(-4px);
}

.card h3 {
    font-size: 1.1rem;
    margin-bottom: 6px;
    color: #111;
}

.card p {
    margin: 3px 0;
    font-size: 0.9rem;
    color: #444;
}

.status {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 6px;
    color: white;
    font-weight: bold;
    font-size: 0.85rem;
}

.status.diterima {
    background-color: #16a34a;
}

.status.tidak {
    background-color: #dc2626;
}

footer {
    background: #1e293b;
    color: white;
    text-align: center;
    padding: 12px;
    font-size: 0.85rem;
    margin-top: 20px;
}
