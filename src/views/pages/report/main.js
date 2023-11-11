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
                <td>${email.sender}</td>
                <td>${email.receiver}</td>
                <td>${email.subject}</td>
                <td>${email.html_content}</td>
            `;
        });
      });
  }

getEmail()