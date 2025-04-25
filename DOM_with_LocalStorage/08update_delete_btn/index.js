document.addEventListener("DOMContentLoaded", initialize);

// Don't remove anything just complete the functions

// When the page get load display all users
function initialize() {
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

// add new users in usersList array
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

// use this function to display user on screen
function display() {
  const ul2 = document.querySelector("ul");
  ul2 ? ul2.addEventListener("click", deleteData(e)) : "";
}

// use this function to delete the user details from local store and DOM (screen)
function deleteData(e) {
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
}

module.exports = handleFormSubmit;
