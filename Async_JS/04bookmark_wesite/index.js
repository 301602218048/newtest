document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
  axios
    .get("https://crudcrud.com/api/fa1432a2426942a49ecf87fd01f8b042/testData")
    .then((res) => {
      res.data.forEach((d) => {
        addToDOM(d);
      });
    })
    .catch((err) => console.log(err));
}

function handleForm(e) {
  e.preventDefault();
  const obj = {
    title: e.target.title.value,
    url: e.target.url.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/fa1432a2426942a49ecf87fd01f8b042/testData",
      obj
    )
    .then((res) => {
      addToDOM(res.data);
      e.target.reset();
    })
    .catch((err) => console.log(err));
}

function addToDOM(userData) {
  const item = document.createElement("li");
  item.appendChild(document.createTextNode(`${userData.title}`));
  const a = document.createElement("a");
  a.setAttribute("href", `${userData.url}`);
  a.setAttribute("target", "_blank");
  a.appendChild(document.createTextNode(`${userData.url}`));
  item.append(a);

  const div = document.createElement("div");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteData(userData, item));
  div.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => editData(userData, item));
  div.appendChild(editBtn);
  item.appendChild(div);

  document.querySelector("#bookmark").appendChild(item);
}

function deleteData(userData, item) {
  axios
    .delete(
      `https://crudcrud.com/api/fa1432a2426942a49ecf87fd01f8b042/testData/${userData._id}`
    )
    .then(() => {
      item.remove();
    })
    .catch((err) => console.log(err));
}

function editData(userData, item) {
  axios
    .delete(
      `https://crudcrud.com/api/fa1432a2426942a49ecf87fd01f8b042/testData/${userData._id}`
    )
    .then(() => {
      item.remove();
    })
    .catch((err) => console.log(err));

  const form = document.querySelector("form");
  form.title.value = userData.title;
  form.url.value = userData.url;
}
