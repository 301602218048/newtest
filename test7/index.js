function handleFormSubmit(e) {
  e.preventDefault();

  const username = e.target.username.value;
  const email = e.target.email.value;
  const phone = e.target.phone.value;

  localStorage.setItem(
    email,
    `username:${username},email:${email},phone:${phone}`
  );

  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = email;
  const btn = document.createElement("button");
  btn.textContent = "x";
  btn.className = "delete-btn";
  li.appendChild(btn);
  ul.appendChild(li);
}

const ul2 = document.querySelector("ul");
ul2
  ? ul2.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-btn")) {
        const liToDelete = e.target.parentElement;
        const name = liToDelete.firstChild.textContent;
        console.log(name);
        if (localStorage.getItem(name)) {
          localStorage.removeItem(name);
          console.log("item deleted");
        }
        ul2.removeChild(liToDelete);
      }
    })
  : "";

module.exports = handleFormSubmit;
