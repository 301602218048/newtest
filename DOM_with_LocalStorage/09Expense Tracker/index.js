document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  usersList.forEach((user) => {
    addToDOM(user);
  });
}

function addToDOM(user) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.setAttribute("user-id", user.id);
  li.textContent =
    "Rs " + user.amount + " - " + user.category + " - " + user.desc;
  const div = document.createElement("div");

  const delete_btn = document.createElement("button");
  delete_btn.textContent = "Delete";
  delete_btn.addEventListener("click", () => deleteData(user.id, li));
  div.appendChild(delete_btn);

  const edit_btn = document.createElement("button");
  edit_btn.textContent = "Edit";
  edit_btn.addEventListener("click", () => editData(user.id));
  div.appendChild(edit_btn);

  li.appendChild(div);
  ul.appendChild(li);
}

function handleForm(e) {
  e.preventDefault();

  const amount = e.target.amount.value;
  const category = e.target.category.value;
  const desc = e.target.desc.value;

  const editId = sessionStorage.getItem("edit-id");
  if (editId) {
    update(editId, amount, category, desc);
  } else {
    addData(amount, category, desc);
  }
  e.target.reset();
}

function addData(amount, category, desc) {
  const obj = {
    id: Date.now().toString(),
    amount,
    category,
    desc,
  };
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  usersList.push(obj);
  localStorage.setItem("usersList", JSON.stringify(usersList));

  addToDOM(obj);
}

function deleteData(userId, li) {
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  const newUserList = usersList.filter((user) => user.id !== userId);
  localStorage.setItem("usersList", JSON.stringify(newUserList));
  li.remove();
  if (sessionStorage.getItem("edit-id")) sessionStorage.removeItem("edit-id");
}

function editData(userId) {
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  const user = usersList.find((u) => u.id === userId);
  if (user) {
    const form = document.querySelector("form");
    form.amount.value = user.amount;
    form.category.value = user.category;
    form.desc.value = user.desc;
    sessionStorage.setItem("edit-id", userId);
  }
}

function update(editId, amount, category, desc) {
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  const newUserList = usersList.map((user) => {
    if (user.id === editId) {
      return { ...user, amount, category, desc };
    } else return user;
  });
  localStorage.setItem("usersList", JSON.stringify(newUserList));
  sessionStorage.removeItem("edit-id");

  const liAll = document.querySelectorAll("li");
  liAll.forEach((li) => {
    const Id = li.getAttribute("user-id");
    if (Id === editId) {
      li.firstChild.textContent =
        "Rs " + amount + " - " + category + " - " + desc;
    }
  });
}
