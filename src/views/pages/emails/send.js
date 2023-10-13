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

let file;
quill.getModule("toolbar").handlers.image = function () {
  let input = document.createElement("input");
  input.type = "file";
  input.addEventListener("change", function () {
    file = this.files[0];
  });
  input.click();
  console.log(quill.root.innerHTML);
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

function sendMail() {
  to.forEach((element) => {
    fetch("/select")
      .then((res) => res.json())
      .then((dados) => {
        dados.forEach((user) => {
          if (element === user.email) {
            let client = user.name;
            const emailBody = quill.root.innerHTML.replace("${client}", client);
            const { from, subject, date } = document.forms[0].elements;
            const emailInformations = {
              from: from.value,
              element,
              subject: subject.value,
              html: emailBody,
              date: date.value,
            };

            console.log(emailInformations);

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
