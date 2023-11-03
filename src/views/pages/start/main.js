async function getUser() {
  tbody.innerHTML = "";
  let groupTable = document.getElementById("grouTable");
  let userGroups = {};
  await fetch("/select")
    .then((res) => res.json())
    .then((dados) => {
      dados.forEach((user) => {
        tbody.innerHTML += `
                  <tr>
                      <td>${user.name}</td>
                      <td>${user.email}</td>
                      <td><button id="abrirModal2" class="atualizar" onclick='modal2(this)' */>Editar</>
                      <td><button onclick=deleter(this) class="excluir">Excluir</>
                      <td>${
                        user.group_id !== null ? user.group_id : "Sem grupo"
                      }</td>
                      </tr>
                  `;
        if (user.group_id !== null) {
          if (!userGroups[user.group_id]) {
            userGroups[user.group_id] = [];
          }
          userGroups[user.group_id].push(user.email);
        }
      });
    })
    .catch((error) => console.log(error));
  for (let groupId in userGroups) {
    let emails = userGroups[groupId].join(", ");
    groupTable.innerHTML += `<tr><td>${groupId}</td><td>${emails}</td></tr>`;
  }
}
getUser();

async function postUser(event) {
  event.preventDefault();

  const clientInformations = [
    document.getElementById("name").value,
    document.getElementById("email").value,
    new Date().toISOString().slice(0, 19).replace("T", " "),
    document.getElementById("group").value,
  ];

  fetch("/receber", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientInformations }),
  });

  console.log(clientInformations);
  location.reload();
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

function updateUser(event) {
  event.preventDefault();

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

  fetch("/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientUpdateInformations }),
  });
  console.log(clientUpdateInformations);
  location.reload();
}

async function deleter(button) {
  let confirmacao = confirm("Tem certeza que deseja excluir?");
  if (confirmacao) {
    let row = button.parentNode.parentNode;
    lastName = row.getElementsByTagName("td")[0].innerText;
    lastEmail = row.getElementsByTagName("td")[1].innerText;

    const clientDeleteInformations = [lastName, lastEmail];
    console.log(clientDeleteInformations);

    fetch("/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientDeleteInformations }),
    });
    console.log(clientDeleteInformations);

    await new Promise((resolve) => setTimeout(resolve, 200));
    await getUser();
  }
}

fetch("/header")
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

      fetch("/upload-xlsx", {
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
