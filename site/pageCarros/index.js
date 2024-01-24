// let token = document.cookie.replace("token=", "")

// const url = "http://localhost:5000/usuario/login/validToken"


// let isValidToken = async function (token) {
//     try {
//         await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 token
//             })
//         })
//             .then(response => {
//                 response.json().then(data => {
//                     const body = document.querySelector('#conteudo');

//                     if (data != true) {
//                         body.innerHTML = '<div class="dot-spinner"> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> <div class="dot-spinner__dot"></div> </div>';
//                         window.location.href = 'http://127.0.0.1:5500/site3/login/index.html';
//                     } else {
//                         body.style = 'display: block'
//                     }
//                 })
//             })
//             .catch(error => {
//                 console.log('Erro na requisição: ' + error);
//             })
//     } catch (error) {
//         console.error(error);
//     }
// }


// isValidToken(token);