function toggleOptions() {
  const optionsList = document.getElementById("optionsList");
  optionsList.style.display =
    optionsList.style.display === "none" ? "block" : "none";
}



let to;
function toggleOption(option) {
  event.stopPropagation();
  option.classList.toggle("selected");

  to = Array.from(document.getElementsByClassName("selected")).map(
    (option) => option.nextElementSibling.innerText
  );
  document.querySelector(".custom-selector").innerText = to.join(", ");
  document.getElementById("preview").innerHTML = "";
  to.forEach((element) => {
        
    document.getElementById("preview").innerHTML += `
    <div id="dPreview" style="border: 1px solid #000; padding: 10px">
   <div>
        <label for="">Preview</label>
      </div>
      <div>
        <label for="">Para</label>
        <input type="text" id="" disabled value="${element}">
      </div>
      <div>
        <label for="">Assunto</label>
        <input type="text" value="${subject.value || ""}" disabled>
      </div>
      <div><label for="">textarea</label>
      <textarea cols="30" rows="10" disabled class="tContent"></textarea>
    </div>
    <div>
      <label for="">files</label>
<span>filename (filesize)</span>
    </div>
    </div>`;
    
  }
  
  );

  if (document.querySelector(".custom-selector").innerText === "") {
    document.querySelector(".custom-selector").innerText = "Selecione Opções";
  }
}


document.addEventListener("click", function (event) {
  const optionsList = document.getElementById("optionsList");
  const customSelector = document.querySelector(".custom-selector");

  if (
    event.target !== optionsList &&
    event.target !== customSelector &&
    !customSelector.contains(event.target)
  ) {
    optionsList.style.display = "none";
  }
});


let quill = new Quill("#editor", {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image"],
    ],
  },
  placeholder: "Compose an epic...",
  theme: "snow",

});



quill.on("text-change", () => {
  let content = quill.root.innerHTML;
  const editor = document.querySelector(".ql-editor");

  if (content.includes("$client")) {
    if (
      !editor.innerHTML.includes('<span style="color: red;">$client</span>')
    ) {
      editor.innerHTML = content.replace(
        /\$client/g,
        '<span style="color: red;">$client</span> <p>'
      );
    }
  }})

document.querySelector(".ql-image").title = "Inserir Arquivo";

quill.getModule("toolbar").handlers.image = () => {
  let input = document.createElement("input");
  input.type = "file";

  const filePromise = new Promise((resolve) => {
    input.addEventListener("change", function () {
      let file = this.files[0];
      resolve(file);
    });
  });
  input.click();
  filePromise.then((file) => {
    console.log("Arquivo selecionado:", file);

 
    let fileP = document.getElementById("files");
    let line = document.createElement("div")
    line.innerHTML += `Arquivo selecionado: ${file.name} <span class="close">&times;</span> <br>`;
    fileP.appendChild(line);

    line.querySelector(".close").addEventListener("click", () => {
      fileP.removeChild(line);
  });
})
};

function filterOptions() {
  const inputValue = document.getElementById("search").value.toLowerCase();
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    const optionText = option.innerText.toLowerCase();
    if (optionText.includes(inputValue)) {
      if (!option.hasAttribute("hidden")) {
        option.style.display = "block";
      }
    } else {
      option.style.display = "none";
    }
  });
}


let {subject} = document.forms[0].elements
subject.oninput = () => {
  const [,,pSub] = document.getElementById("dPreview").children;
  console.log(pSub)
  pSub.children[1].value = subject.value
}


function sendMail() {
  to.forEach((element) => {
    fetch("/select")
      .then((res) => res.json())
      .then((dados) => {
        dados.forEach((user) => {
          if (element === user.email) {
            let client = user.name;
            const emailBody = quill.root.innerHTML.replace(
              `<span style="color: red;">$client</span>`,
              `<span style="color: black;">${client}</span>`
            );

            const { from, date } = document.forms[0].elements;
            const emailInformations = {
              from: from.value,
              element,
              subject: subject.value,
              html: emailBody,
              date: date.value,
              /* attachments: [{ filename: "", path: "" }], */
            };
            fetch("/sendmail", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ emailInformations }),
            });
          }
        });
      });
  });
}

async function getUser() {
  let ul = document.querySelector("ul");
  await fetch("/select")
    .then((res) => res.json())
    .then((dados) => {
      dados.forEach((user) => {
        ul.innerHTML += `
      <li class="option" onclick="toggleOption(this)">${user.name}</li>
      <li style="display: none !important;" hidden=true class="option" onclick="toggleOption(this)">${user.email}</li>
      
      `;
      });
    })
    .catch((error) => console.log(error));
}
getUser();

fetch("/header")
  .then((response) => response.text())
  .then((data) => (document.getElementById("header").innerHTML = data));

fetch("/mailUser")
  .then((res) => res.json())
  .then((data) => {
    const mailUser = data.mailUser;
    document.getElementById("from").value = mailUser;
  });
