const url = "http://localhost:5000/veiculo";

let button = document.querySelector('.button-salvar')

let modeloInput = document.querySelector('.modelo');
let modelo;

let marcaInput = document.querySelector('.marca');
let marca;

let valorInput = document.querySelector('.valor');
let valor;

let placaInput = document.querySelector('.placa');
let placa;

let anoFabInput = document.querySelector('.anoFab');
let anoFab;

let kmInput = document.querySelector('.km');
let km;

let cogigoInput = document.querySelector('.codigo');
let classe;

let imgInput = document.querySelector('.img');
let img;

let corInput = document.querySelector('.cor');
let cor;

let numPortasInput = document.querySelector('.numPortas');
let numPortas;

let tipoInput = document.querySelector('.tipo');
let tipo;


modeloInput.addEventListener("input", () => modelo = modeloInput.value )



fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        // "modelo": "HB-20",
        // "marca": "Hyundai",
        // "valor": 64999.99,
        // "placa": "DRK0123",
        // "anoFab": 2021,
        // "km": 90000,
        // "codigo": 11,
        // "classe": "Hatch",
        // "img": "/img/HB-20",
        // "cor": "#FFF",
        // "numPortas": 4,
        // "tipo": "Carro"
    })
})
    .then(response => {
        response.json().then(data => {
            console.log(data)
        })

    })