document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  usersList.forEach((user) => {
    addUserToDOM(user);
  });
}

function addUserToDOM(user) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.setAttribute("user-id", user.id);
  li.textContent = user.email;

  const para = document.createElement("p");
  para.textContent = user.username + " " + user.email + " " + user.phone;
  li.appendChild(para);

  const delete_btn = document.createElement("button");
  delete_btn.textContent = "Delete";
  delete_btn.addEventListener("click", () => deleteData(user.id, li));
  li.appendChild(delete_btn);

  const edit_btn = document.createElement("button");
  edit_btn.textContent = "Edit";
  edit_btn.addEventListener("click", () => editData(user.id));
  li.appendChild(edit_btn);

  ul.appendChild(li);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const username = e.target.username.value;
  const email = e.target.email.value;
  const phone = e.target.phone.value;

  const editId = sessionStorage.getItem("edit-id");
  if (editId) {
    update(editId, username, email, phone);
  } else {
    addData(username, email, phone);
  }
  e.target.reset();
}

function addData(username, email, phone) {
  const obj = {
    id: Date.now().toString(),
    username,
    email,
    phone,
  };

  let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  usersList.push(obj);
  localStorage.setItem("usersList", JSON.stringify(usersList));

  addUserToDOM(obj);
}

function deleteData(userId, li) {
  let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  const newUserList = usersList.filter((user) => user.id !== userId);
  localStorage.setItem("usersList", JSON.stringify(newUserList));
  li.remove();
  if (sessionStorage.getItem("edit-id")) {
    sessionStorage.removeItem("edit-id");
    document.querySelector("form").reset();
  }
}

function editData(userId) {
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  const user = usersList.find((u) => u.id === userId);
  if (user) {
    const form = document.querySelector("form");
    form.username.value = user.username;
    form.email.value = user.email;
    form.phone.value = user.phone;
    sessionStorage.setItem("edit-id", userId);
  }
}

function update(editId, username, email, phone) {
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  const newUserList = usersList.map((user) => {
    if (user.id === editId) {
      return { ...user, username, email, phone };
    } else return user;
  });
  localStorage.setItem("usersList", JSON.stringify(newUserList));
  sessionStorage.removeItem("edit-id");

  const liElements = document.querySelectorAll("ul>li");
  liElements.forEach((li) => {
    if (li.getAttribute("user-id") === editId) {
      li.firstChild.textContent = email;
      li.querySelector("p").textContent = username + " " + email + " " + phone;
    }
  });
}
