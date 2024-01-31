const url = "http://localhost:5000/veiculo";

let button, modelo, marca, valor, placa, anoFab, km, classe, img, cor, numPortas, tipo;

let buttonInput     = document.querySelector('.button-salvar')
let modeloInput     = document.querySelector('.modelo');
let marcaInput      = document.querySelector('.marca');
let valorInput      = document.querySelector('.valor');
let placaInput      = document.querySelector('.placa');
let anoFabInput     = document.querySelector('.anoFab');
let kmInput         = document.querySelector('.km');
let cogigoInput     = document.querySelector('.codigo');
let imgInput        = document.querySelector('.img');
let corInput        = document.querySelector('.cor');
let numPortasInput  = document.querySelector('.numPortas');
let tipoInput       = document.querySelector('.tipo');


modeloInput.addEventListener("input",  modelo = modeloInput.value )
// marcaInput.addEventListener("input", () => marca = marcaInput.value )
// valorInput.addEventListener("input", () => valor = valorInput.value )
// placaInput.addEventListener("input", () => placa = placaInput.value )
// anoFabInput.addEventListener("input", () => anoFab = anoFabInput.value )
// kmInput.addEventListener("input", () => km = kmInput.value )
// cogigoInput.addEventListener("input", () => codigo = cogigoInput.value )
// imgInput.addEventListener("input", () => img = imgInput.value )
// corInput.addEventListener("input", () => cor = corInput.value )
// numPortasInput.addEventListener("input", () => numPortas = numPortasInput.value )
// tipoInput.addEventListener("input", () => tipo = tipoInput.value )


// buttonInput.addEventListener("click", () => console.log(`
//     modelo: ${modelo} <br>
//     marca: ${marca} <br>
//     valor: ${valor} <br>
//     placa: ${placa} <br>
//     anoFab: ${anoFab} <br>
//     km: ${km} <br>
//     codigo: ${codigo} <br>
//     img: ${img} <br>
//     cor: ${cor} <br>
//     numPortas: ${numPortas} <br>
//     tipo: ${tipo} <br>
// `))

buttonInput.addEventListener("click", () => console.log(`
    modelo: ${modelo} <br>
`))


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