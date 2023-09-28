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
                      <td><button id="abrirModal2" class="atualizar" onclick='modal2(this)' */>Editar</>
                      <td><button onclick=deleter(this) class="excluir">Excluir</>
                      </tr>
                  `;
      });
    })
    .catch((error) => console.log(error));
}
getUser();

async function postUser() {
  const clientInformations = [
    document.getElementById("name").value,
    document.getElementById("email").value,
    new Date().toISOString().slice(0, 19).replace("T", " "),
  ];

  fetch("http://localhost:3333/receber", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientInformations }),
  });

  console.log(clientInformations);
}

document.getElementById("abrirModal").addEventListener("click", () => {
  document.getElementById("meuModal").style.display = "block";
});

document.querySelector(".fechar").addEventListener("click", () => {
  document.getElementById("meuModal").style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == document.getElementById("meuModal")) {
    document.getElementById("meuModal").style.display = "none";
  }
});

let lastEmail;
let lastName;

function modal2(button) {
  document.getElementById("meuModal2").style.display = "block";
  document.querySelector(".fechar2").addEventListener("click", () => {
    document.getElementById("meuModal2").style.display = "none";
  });
  window.addEventListener("click", (event) => {
    if (event.target == document.getElementById("meuModal2")) {
      document.getElementById("meuModal2").style.display = "none";
    }
  });

  let row = button.parentNode.parentNode;
  lastName = row.getElementsByTagName("td")[0].innerText;
  lastEmail = row.getElementsByTagName("td")[1].innerText;
}

function updateUser() {
  console.log("HELLO WORD");

  let upName = document.getElementById("upName").value;
  let upEmail = document.getElementById("upEmail").value;
  let updatedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

  if (upName === "" && upEmail === "") {
    alert("Nenhuma alteração");
    return false;
  } else if (upName === "") {
    upName = lastName;
  } else if (upEmail === "") {
    upEmail = lastEmail;
  }
  const clientUpdateInformations = [
    lastName,
    lastEmail,
    upName,
    upEmail,
    updatedAt,
  ];

  console.log(clientUpdateInformations);

  fetch("http://localhost:3333/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientUpdateInformations }),
  });
  console.log(clientUpdateInformations);
}

async function deleter(button) {
  let confirmacao = confirm("Tem certeza que deseja excluir?");
  if (confirmacao) {
    let row = button.parentNode.parentNode;
    lastName = row.getElementsByTagName("td")[0].innerText;
    lastEmail = row.getElementsByTagName("td")[1].innerText;

    const clientDeleteInformations = [lastName, lastEmail];
    console.log(clientDeleteInformations);

    fetch("http://localhost:3333/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientDeleteInformations }),
    });
    console.log(clientDeleteInformations);

    await new Promise((resolve) => setTimeout(resolve, 200));
    await getUser();
  }
}

fetch("http://localhost:3333/header")
  .then((response) => response.text())
  .then((data) => (document.getElementById("header").innerHTML = data));

function upload() {
  let importation = document.getElementById("upload").files[0];
  if (importation) {
    let confirmation = confirm(
      `Quer fazer a importação de ${importation.name}?`
    );
    if (confirmation) {
      const formData = new FormData();
      formData.append("file", importation);

      fetch("http://localhost:3333/upload-xlsx", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Arquivo enviado com sucesso:", data);
        })
        .catch((error) => {
          console.error("Erro ao enviar arquivo:", error);
        });
    }
  }
  console.log(importation);
}
