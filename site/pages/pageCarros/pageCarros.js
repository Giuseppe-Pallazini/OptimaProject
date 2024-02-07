const url = "http://localhost:5000/veiculo";

let modelo, marca, valor, placa, anoFab, km, classe, img, cor, numPortas, codigo, tipo;


let buttonInput = document.querySelector('.button-salvar');
let buttonGerarCodigo = document.querySelector('.codigo_aleatorio')
let modeloInput = document.querySelector('.modelo');
let marcaInput = document.querySelector('.marca');
let valorInput = document.querySelector('.valor');
let placaInput = document.querySelector('.placa');
let anoFabInput = document.querySelector('.anoFab');
let kmInput = document.querySelector('.km');
let classeInput = document.querySelector('.classe')
let codigoInput = document.querySelector('.codigo');
let imgInput = document.querySelector('.img');
let corInput = document.querySelector('.cor');
let numPortasInput = document.querySelector('.numPortas');
let tipoInput = document.querySelector('#lista-conteudos');



modeloInput.addEventListener("input", () => modelo = modeloInput.value.trim())
marcaInput.addEventListener("input", () => marca = marcaInput.value.trim())
valorInput.addEventListener("input", () => valor = valorInput.value)
placaInput.addEventListener("input", () => placa = placaInput.value.trim())
anoFabInput.addEventListener("input", () => anoFab = anoFabInput.value)
kmInput.addEventListener("input", () => km = kmInput.value)
codigoInput.addEventListener("input", () => codigo = Number(codigoInput.value))
imgInput.addEventListener("input", () => img = imgInput.value)
corInput.addEventListener("input", () => cor = corInput.value.trim())
numPortasInput.addEventListener("input", () => numPortas = numPortasInput.value)
classeInput.addEventListener("input", () => classe = classeInput.value.trim())
tipoInput.addEventListener("change", () => tipo = tipoInput.value.trim())


if (cor == undefined) {
    cor = "#000000"
}

// Gerar código aleatório
buttonGerarCodigo.addEventListener("click", () => {
    codigo = Math.floor(1000 + Math.random() * 9000);

    codigoInput.value = codigo
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



function insertVehicle() {
    fetch(url, {
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