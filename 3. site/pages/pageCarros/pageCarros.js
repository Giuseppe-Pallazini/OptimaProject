const urlVehicles = "http://localhost:5000/veiculo";
const urlMarcas = "https://parallelum.com.br/fipe/api/v1/carros/marcas"

let modelo, marca, valor, placa, anoFab, km, classe, img, cor, numPortas, codigo, tipo;


let buttonInput = document.querySelector('.button-salvar');
let buttonGerarCodigo = document.querySelector('.codigo_aleatorio')
let modeloInput = document.querySelector('.modelo').addEventListener("input", () => modelo = modeloInput.value.trim());
let marcaInput = document.getElementById('id_marca');
let valorInput = document.querySelector('.valor').addEventListener("input", () => valor = valorInput.value);
let placaInput = document.querySelector('.placa').addEventListener("input", () => placa = placaInput.value.trim());
let anoFabInput = document.querySelector('.anoFab').addEventListener("input", () => anoFab = anoFabInput.value);
let kmInput = document.querySelector('.km').addEventListener("input", () => km = kmInput.value);
let classeInput = document.querySelector('.classe').addEventListener("input", () => classe = classeInput.value.trim());
let codigoInput = document.querySelector('.codigo').addEventListener("input", () => codigo = codigoInput.value.toString());
let imgInput = document.querySelector('.img').addEventListener("input", () => img = imgInput.value);
let corInput = document.querySelector('.cor').addEventListener("input", () => cor = corInput.value.trim());
let numPortasInput = document.querySelector('.numPortas').addEventListener("input", () => numPortas = numPortasInput.value);
let tipoInput = document.querySelector('#lista-conteudos').addEventListener("change", () => tipo = tipoInput.value.trim());

if (cor == undefined) {
    cor = "#000000"
}

// Gerar código aleatório
buttonGerarCodigo.addEventListener("click", () => {
    codigo = Math.floor(1000 + Math.random() * 9000);

    codigoInput.value = codigo.toString()
})

// Inserir veículo no banco ao clicar em 'salvar'
buttonInput.addEventListener("click", () => insertVehicle());

// buttonInput.addEventListener("click", () => console.log(`
// modelo: ${modelo}
// marca: ${marca}
// valor: ${valor}
// placa: ${placa}
// anoFab: ${anoFab}
// km: ${km}
// codigo: ${codigo}
// img: ${img}
// cor: ${cor}
// numPortas: ${numPortas}
// classe: ${classe}
// tipo: ${tipo}
// `));


async function searchBrands() {
    await fetch(urlMarcas , {
        method: "GET"
    })
    .then((result) => result.json())
    .then((brands) => brands.map((item) => {
        let option = document.createElement("option");
        option.innerText = item.nome

        marcaInput.appendChild(option)
    }))
}
searchBrands()


function insertVehicle() {
    fetch(urlVehicles, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "modelo": modelo,
            "marca": marca,
            "valor": valor,
            "placa": placa,
            "anoFab": anoFab,
            "km": km,
            "codigo": codigo,
            "classe": classe,
            "img": img,
            "cor": cor,
            "numPortas": numPortas,
            "tipo": tipo
        })
    })
        .then(response => {
            if (!response.ok) {
                response.json().then(data => {
                    alternateTextError(data.message); //! Retornar erro em vermelho
                })
            }
            response.json().then(data => {
                alternateTextOk(data.message)
            })
        })
}

function alternateTextError(error) {
    let doc = document.querySelector(".error");
    doc.style.color = 'red';
    doc.style.opacity = '1';
    doc.innerHTML = "*" + error;
}

function alternateTextOk(data) {
    let doc = document.querySelector(".error");
    doc.style.color = '#2dcc1f  ';
    doc.style.opacity = '1'
    doc.innerHTML = "*" + data;

    buttonInput.style.cursor = "not-allowed";
    buttonInput.setAttribute("disabled", "disabled");
}



let buttonLimpar = document.querySelector('.button-limpar');

buttonLimpar.addEventListener("click", () => clearInputs())

function clearInputs() {
    modeloInput.value = "";
    marcaInput.value = "";
    valorInput.value = "";
    placaInput.value = "";
    anoFabInput.value = "";
    kmInput.value = "";
    classeInput.value = "";
    codigoInput.value = "";
    imgInput.value = "";
    corInput.value = "";
    numPortasInput.value = "";
}