async function getUser() {
  tbody.innerHTML = "";
  await fetch("http://localhost:3333/select")
    .then((res) => res.json())
    .then((dados) => {
      dados.forEach((user) => {
        tbody.innerHTML += `
                  <tr>
                      <td>${user.name}</td>
                      <td>${user.email}</td>
                      <td><button id='modal2'>Editar</>
                      <td><button>Excluir</>
                      </tr>
                  `;
      });
    })
    .catch((error) => console.log(error));
}

async function postUser() {
  const clientInformations = [
    document.getElementById("name").value,
    document.getElementById("email").value,
  ];

  fetch("http://localhost:3333/receber", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientInformations }),
  });

  console.log(clientInformations)
}
getUser();


document.getElementById("abrirModal").addEventListener("click", function () {
  document.getElementById("meuModal").style.display = "block";
});

document.querySelector(".fechar").addEventListener("click", function () {
  document.getElementById("meuModal").style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("meuModal")) {
    document.getElementById("meuModal").style.display = "none";
  }
});


