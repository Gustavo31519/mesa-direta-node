/* if(DataTransfer.sended) {
    fetch("/emailSheet", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ emailInformations })
    })
}
 */
try {
    await db.dbPromise.query(insertEmail, [
        mailOptions[0],
        mailOptions[1],
        mailOptions[2]
    ])
}

let insertEmail = "INSERT INTO email (from, to, subject, html) VALUES (?, ?, ?, ?)"
let allEmail = "SELECT * FROM email"

routes.get("/getEmail", async (req,res) => {
    try{
        res.JSON((await db.dbPromise.query(allEmail))[0])
    } catch (e) {
        res.status(500).json({message: "Erro interno"})
    }
})

async function getEmail() {
    let emailTable = document.getElementById("emailTable")
    await fetch("/getEmail")
    .then((res) => res.json())
    .then((dados) => {
        dados.forEach(email => {
            emailTable.innerHTML += `
            <tr>
                <td>${email.from}</td>
                <td>${email.to}</td>
                <td>${email.subject}</td>
                <td>${email.html}</td>
            `
        });
    })
}


const values = data
.map((user) => ` ('${user.nome}', '${user.email}', ${user.group_id})`)
.join(", ");
const insertXlsxUser = "INSERT INTO user (name, email, group_id) VALUES";

if(error) {
    console.log(error)
    res.json({sended:false})
} else {
    res.json({sended:true})
}


.then((data) => {
    if(data.sended) {
        alert("Usuario adicionado com sucesso!")
    } else {
        alert("Erro ao adicionar usuario")
    }
})

//
.then((data) => {
    if (data.sended) {
      alert(`Email enviado com sucesso para ${emailinformations.from}`);
    } else {
      alert(`Houve um erro ao enviar o email para ${emailinformations.from}`);
    }
  })
