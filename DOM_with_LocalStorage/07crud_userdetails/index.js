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

function getUsersFromLocalStorage() {
  for (let key in localStorage) {
    const obj = JSON.parse(localStorage.getItem(key));

    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.textContent = obj.email;
    const para = document.createElement("p");
    para.textContent = `Username:${obj.username}, 
        Email:${obj.email}, Phone:${obj.phone}`;
    li.appendChild(para);
    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.className = "delete-btn";
    li.appendChild(btn);
    ul.appendChild(li);
  }
}
getUsersFromLocalStorage();

function handleFormSubmit(e) {
  e.preventDefault();

  const username = e.target.username.value;
  const email = e.target.email.value;
  const phone = e.target.phone.value;
  const obj = {
    username: username,
    email: email,
    phone: phone,
  };

  localStorage.setItem(email, JSON.stringify(obj));

  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = obj.email;
  const para = document.createElement("p");
  para.textContent = `Username:${obj.username}, 
        Email:${obj.email}, Phone:${obj.phone}`;
  li.appendChild(para);
  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.className = "delete-btn";
  li.appendChild(btn);
  ul.appendChild(li);
}

module.exports = { handleFormSubmit, getUsersFromLocalStorage };
