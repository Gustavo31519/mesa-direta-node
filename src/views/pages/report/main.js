fetch("/header")
  .then((response) => response.text())
  .then((data) => (document.getElementById("header").innerHTML = data));

  async function getEmail() {
    let emailTable = document.getElementById("emailTable");
    await fetch("/getEmail")
      .then((res) => res.json())
      .then((dados) => {
        dados.forEach((email) => {
          emailTable.innerHTML += `
            <tr>
                <td>${email.status}</td>
                <td>${email.from}</td>
                <td>${email.to}</td>
                <td>${email.subject}</td>
                <td>${email.html}</td>
            `;
        });
      });
  }

getEmail()