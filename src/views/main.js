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

