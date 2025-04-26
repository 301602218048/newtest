document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
  axios
    .get("https://crudcrud.com/api/6cdf781543f1454a956542aede7fb239/testData")
    .then((res) => {
      res.data.forEach((d) => {
        addToDOM(d);
        updateStarCount(d.rating, +1);
      });
    })
    .catch((err) => console.log(err));
}

function handleForm(e) {
  e.preventDefault();
  const obj = {
    name: e.target.name.value,
    rating: parseInt(e.target.rating.value),
  };

  axios
    .post(
      "https://crudcrud.com/api/6cdf781543f1454a956542aede7fb239/testData",
      obj
    )
    .then((res) => {
      addToDOM(res.data);
      updateStarCount(obj.rating, +1);
      e.target.reset();
    })
    .catch((err) => console.log(err));
}

function addToDOM(userData) {
  const item = document.createElement("li");
  item.appendChild(
    document.createTextNode(`${userData.name} ${userData.rating} `)
  );

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

  document.querySelector("#feedback").appendChild(item);
}

function deleteData(userData, item) {
  axios
    .delete(
      `https://crudcrud.com/api/6cdf781543f1454a956542aede7fb239/testData/${userData._id}`
    )
    .then(() => {
      item.remove();
      updateStarCount(userData.rating, -1);
    })
    .catch((err) => console.log(err));
}

function editData(userData, item) {
  axios
    .delete(
      `https://crudcrud.com/api/6cdf781543f1454a956542aede7fb239/testData/${userData._id}`
    )
    .then(() => {
      item.remove();
      updateStarCount(userData.rating, -1);
    })
    .catch((err) => console.log(err));

  const form = document.querySelector("form");
  form.name.value = userData.name;
  form.rating.value = userData.rating;
}

function updateStarCount(rating, change) {
  const spanList = document.querySelectorAll("span");
  const index = parseInt(rating, 10) - 1;
  if (spanList[index]) {
    let currentCount = parseInt(spanList[index].textContent, 10);
    spanList[index].textContent = currentCount + change;
  }
}
