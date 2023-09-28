function toggleOptions() {
  const optionsList = document.getElementById("optionsList");
  optionsList.style.display =
    optionsList.style.display === "none" ? "block" : "none";
}

function toggleOption(option) {
  event.stopPropagation();
  option.classList.toggle("selected");


  to = Array.from(document.getElementsByClassName("selected")).map(
    (option) => option.nextElementSibling.innerText
  );
  document.querySelector(".custom-selector").innerText = to.join(", ");
  if (document.querySelector(".custom-selector").innerText === "") {
    document.querySelector(".custom-selector").innerText = "Selecione Opções";
  }}


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

function filterOptions() {
  const inputValue = document
    ./* querySelector('input[type="text"]:nth-of-type(2)') */getElementById("search")
    .value.toLowerCase();
  const options = document.querySelectorAll(".option");
  console.log("Input Value:", inputValue);
  options.forEach((option) => {
    const optionText = option.innerText.toLowerCase();
    console.log("Option Text:", optionText); 
if (optionText.includes(inputValue)) {
  if (!option.hasAttribute("hidden")) {
    option.style.display = "block";
  }
} else {
  option.style.display = "none";
}
  });
}

let to;
function sendMail() {
    const { from, subject, html } = document.forms[0].elements;
  const emailInformations = {
    from: from.value,
    to,
    subject: subject.value,
    html: html.value,
  };

  console.log(emailInformations)

  fetch("http://localhost:3333/sendmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailInformations }),
  });

}


async function getUser() {
  let ul = document.querySelector("ul");
  await fetch("http://localhost:3333/select")
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
getUser()

fetch("http://localhost:3333/header")
  .then((response) => response.text())
  .then((data) => (document.getElementById("header").innerHTML = data));
