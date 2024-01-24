let email;
let password;

const url = "http://localhost:5000/login";

function credential() { // Pegar email e senha

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    password = String(password);
    email = String(email);

    login(email, password);

}

function login(email, password) {

    try {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "nome": email,
                "senha": password
            })
        })
            .then(response => {
                if (!response.ok) {
                    response.json().then(data => {
                        alternateText(data.erro); //! Deixar vermelho o texto
                        throw new Error(data.erro);
                    })
                } else {
                    redirect()
                }
            })
            .catch(error => {
                console.error("Erro na requisição:", error);
            });

    } catch (error) {
        console.log(error);
    }

}

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    credential(); // Ativar credential ao clicar
})

function alternateText(error) {
    let id = document.getElementById("loginError");
    id.style.color = "red";
    id.style.display = "block";
    id.innerHTML= error;
}

function redirect() {

    let spinHtml = '<div class="dot-spinner"> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> </div>'
    document.getElementById("buttonEnter").innerHTML = spinHtml;

    setTimeout(() => {
        window.location.href = "/home";                        
    }, 1000)
}