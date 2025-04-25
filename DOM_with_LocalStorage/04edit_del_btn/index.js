// Add the Edit Button:
const list = document.querySelectorAll("li");
for (let i = 0; i < list.length; i++) {
  const a = document.createElement("button");
  const text = document.createTextNode("Edit");
  a.appendChild(text);
  a.setAttribute("class", "edit-btn");
  list[i].appendChild(a);
}

// Implement the code as in video but with one extra 'Edit' button in 'li'
const form = document.querySelector("form");
const fruits = document.querySelector(".fruits");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const fruitToAdd = document.getElementById("fruit-to-add");
  const newLi = document.createElement("li");

  newLi.innerHTML =
    fruitToAdd.value +
    '<button class="delete-btn">x</button><button class="edit-btn">Edit</button>';

  //   console.log(newLi);

  //   const newText = document.createTextNode(fruitToAdd.value);
  //   newLi.appendChild(newText);
  //   newLi.className = "fruit";
  //   const deleteBtn = document.createElement("button");
  //   const deleteBtnText = document.createTextNode("x");
  //   deleteBtn.appendChild(deleteBtnText);
  //   deleteBtn.className = "delete-btn";
  //   newLi.appendChild(deleteBtn);

  //   const editBtn = document.createElement("button");
  //   const editBtnText = document.createTextNode("Edit");
  //   editBtn.appendChild(editBtnText);
  //   editBtn.className = "edit-btn";
  //   newLi.appendChild(editBtn);
  fruits.appendChild(newLi);
});

fruits.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const fruitToDelete = e.target.parentElement;
    fruits.removeChild(fruitToDelete);
  }
});
