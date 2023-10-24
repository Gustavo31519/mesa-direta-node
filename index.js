function file(){ //input onchange
    let file = document.getElementById("input").files[0]
    formData.append("file", file)
}

fetch("/sendmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailInformations }), formData,
})
.then((response) => response.json())
.then((data) => {
    console.log("Arquivo Adcionado", data)
})
.catch((error) => {
    console.error("Erro ao enviar arquivo", error)
})
console.log(file)


let attachments = []
routes.post("/sendmail", upload.array(file) (req, res) => {
    const emailInformations = req.body.emailInformations;
    console.log(emailInformations);
    const files = req.files

    files.forEach(element => {
        let object = {
            filename: element.filename,
            path: element.path
        }
        attachments.push(object)
    }); 

    // attachments: attachments 

})

fs.unlink(file.path, (err) => {
    if (err) {
      console.error("Erro ao excluir o arquivo:", err);
    } else {
      console.log("Arquivo excluído com sucesso");
    }
  });

  .then(response => response.json())
  .then(data => {
    alert(data.message); 
  })
  .catch(error => console.error('Erro:', error));