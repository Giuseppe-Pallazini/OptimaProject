const url = "http://localhost:5000/veiculo";

let button, modelo, marca, valor, placa, anoFab, km, classe, img, cor, numPortas, codigo, tipo;

let buttonInput     = document.querySelector('.button-salvar')
let modeloInput     = document.querySelector('.modelo');
let marcaInput      = document.querySelector('.marca');
let valorInput      = document.querySelector('.valor');
let placaInput      = document.querySelector('.placa');
let anoFabInput     = document.querySelector('.anoFab');
let kmInput         = document.querySelector('.km');
let classeInput     = document.querySelector('.classe')
let codigoInput     = document.querySelector('.codigo');
let imgInput        = document.querySelector('.img');
let corInput        = document.querySelector('.cor');
let numPortasInput  = document.querySelector('.numPortas');
let tipoInput       = document.querySelector('#lista-conteudos');


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


if(cor == undefined) {
    cor = "#000000"
}


buttonInput.addEventListener("click", () => insertVehiclhe())
buttonInput.addEventListener("click", () => console.log(`
    "modelo": ${modelo}
    "marca": ${marca}
    "valor": ${valor}
    "placa": ${placa}
    "anoFab": ${anoFab}
    "km": ${km}
    "codigo": ${codigo}
    "img": ${img}
    "cor": ${cor}
    "numPortas": ${numPortas}
    "classe": ${classe}
    "tipo": ${tipo}
`))


function insertVehiclhe() {

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
                alternateTextError(data.message); //! Deixar vermelho o texto
            })
        } else {
            response.json().then(data => {
                alternateTextOk(data.message)
            })
        }
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
    doc.style.color = '#15ff00';
    doc.style.opacity = '1'
    doc.innerHTML = "*" + data;
    
    buttonInput.style.cursor = "not-allowed";
    buttonInput.setAttribute("disabled", "disabled");
}