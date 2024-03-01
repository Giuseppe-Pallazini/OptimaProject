const urlVehicles = "http://localhost:5000/veiculo";
const urlMarcas = "https://parallelum.com.br/fipe/api/v1/carros/marcas";


let modelo, marca, valor, placa, anoFab, km, classe, img, cor, numPortas, codigo, tipo;


let buttonInput = document.querySelector(".button-salvar");
let buttonGerarCodigo = document.querySelector(".codigo_aleatorio");

let codigoInput = document.querySelector(".codigo");
let modeloInput = document.querySelector(".modelo");
let valorInput = document.querySelector(".valor");
let placaInput = document.querySelector(".placa");
let anoFabInput = document.querySelector(".anoFab");
let kmInput = document.querySelector(".km");
let classeInput = document.querySelector(".classe")
let imgInput = document.querySelector(".img");
let corInput = document.querySelector(".cor");
let numPortasInput = document.querySelector(".numPortas");
let tipoInput = document.querySelector("#lista-conteudos");
let marcaInput = document.getElementById("id_marca");


if (cor == undefined) {
    cor = "#000000"
}

// Gerar código aleatório
buttonGerarCodigo.addEventListener("click", () => {
    codigoAleatorio = Math.floor(1000 + Math.random() * 9000);
    codigoInput.value = codigoAleatorio
})

// Inserir veículo no banco ao clicar em "salvar"
buttonInput.addEventListener("click", () => insertVehicle());

async function searchBrands() {
    let divMarca = document.querySelector('.div_select');
    let selectMarca = document.querySelector('.select_marca')
    let spinner = document.createElement("div");


    startLoading(divMarca, spinner, selectMarca);


    await fetch(urlMarcas, {
        method: "GET"
    })
        .then((result) => result.json())
        .then((brands) => brands.map((item) => {
            let option = document.createElement("option");
            option.innerText = item.nome;
            option.className = "optionBrand"

            marcaInput.appendChild(option)
        }))

    finishLoading(spinner, selectMarca);

}
searchBrands();

function startLoading(divMarca, spinner, selectMarca) {
    spinner.className = "spinner";
    divMarca.appendChild(spinner);
    selectMarca.disabled = true
}

function finishLoading(spinner, selectMarca) {
    spinner.style.display = 'none';
    selectMarca.disabled = false
}

function loadInputsValues() {
    tipoInput.addEventListener("change", () => tipo = tipoInput.value);
    marcaInput.addEventListener("change", () => marca    = marcaInput.value);
    numPortasInput.addEventListener("input", () => numPortas = numPortasInput.value);
    corInput.addEventListener("input", () => cor = corInput.value.trim());
    imgInput.addEventListener("input", () => img = imgInput.value);
    classeInput.addEventListener("input", () => classe = classeInput.value.trim());
    kmInput.addEventListener("input", () => km = kmInput.value);
    anoFabInput.addEventListener("input", () => anoFab = anoFabInput.value)
    placaInput.addEventListener("input", () => placa = placaInput.value.trim());
    valorInput.addEventListener("input", () => valor = valorInput.value);
    modeloInput.addEventListener("input", () => modelo = modeloInput.value.trim());
    codigoInput.addEventListener("input", () => codigo = codigoInput.value.trim());
}
loadInputsValues()


function insertVehicle() {
    loadInputsValues()
    
    try {
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
                else {
                    response.json().then(data => {
                        alternateTextOk(data.message) //* Retornar sucesso em verde
                    })
                }
            })
    } catch (error) {
    }

}

function alternateTextError(error) {
    let doc = document.querySelector(".error");
    doc.style.color = "red";
    doc.style.opacity = "1";
    doc.innerHTML = "*" + error;
}

function alternateTextOk(data) {
    let doc = document.querySelector(".error");
    doc.style.color = "#2dcc1f";
    doc.style.opacity = "1"
    doc.innerHTML = "*" + data;

    buttonInput.style.cursor = "not-allowed";
    buttonInput.setAttribute("disabled", "disabled");
}



let buttonLimpar = document.querySelector(".button-limpar");
buttonLimpar.addEventListener("click", () => clearInputs());

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