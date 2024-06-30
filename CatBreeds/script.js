const API_URL = "https://api.thecatapi.com/v1/breeds";
const itemsPerPage = 4;
let currentPage = 1;

function catFacts(data) {
    let sec = document.getElementById("section");
    sec.innerHTML = "";

    data.forEach((e) => {
        let div = document.createElement("div");
        div.classList.add('card');
        div.innerHTML = `
            <div class="card-body">
                <div><b>Name: </b>${e.name}</div>
                <div><b>Origin: </b>${e.origin}</div>
                <div><b>Description: </b>${e.description}</div>
                <div><b>Life-Span: </b>${e.life_span}</div>
            </div>
        `;
        sec.appendChild(div);
    });
}

async function fetchData(page) {
    try {
        let res = await fetch(`${API_URL}?page=${page}&limit=${itemsPerPage}`);
        let data = await res.json();

        if (res.status === 200) {
            catFacts(data);
        } else {
            alert(`${res.status} - ${res.statusText}`);
        }
    } catch (error) {
        console.error(error);
    }
}

async function nextPage() {
    currentPage++;
    await fetchData(currentPage);
}

async function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        await fetchData(currentPage);
    }
}

fetchData(currentPage);

document.getElementById('nextButton').addEventListener('click', nextPage);
document.getElementById('prevButton').addEventListener('click', prevPage);
