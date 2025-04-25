const form = document.querySelector("form");

// 1. Add a new input for description before the button
const descriptionInput = document.createElement("input");
descriptionInput.type = "text";
descriptionInput.id = "description";
descriptionInput.placeholder = "Enter fruit description";

const addButton = form.querySelector("button");
form.insertBefore(descriptionInput, addButton);

const fruitInput = document.getElementById("fruit-to-add");
const fruitList = document.querySelector(".fruits");

// 2. Handle the form submission to add fruit with description
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fruitName = fruitInput.value.trim();
  const fruitDesc = descriptionInput.value.trim();

  if (fruitName === "") return;

  // Create new fruit list item
  const li = document.createElement("li");
  li.className = "fruit";

  // Add name
  li.appendChild(document.createTextNode(fruitName));

  // Add description in a new paragraph (italic)
  const descPara = document.createElement("p");
  descPara.style.fontStyle = "italic";
  descPara.textContent = fruitDesc;
  li.appendChild(descPara);

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "x";
  li.appendChild(deleteBtn);

  // Append to the list
  fruitList.appendChild(li);

  // Clear inputs
  fruitInput.value = "";
  descriptionInput.value = "";
});

// 3. Delete functionality
fruitList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const li = e.target.parentElement;
    fruitList.removeChild(li);
  }
});

// 4. Filter functionality
const filterInput = document.getElementById("filter");

filterInput.addEventListener("keyup", function (e) {
  const filterText = e.target.value.toLowerCase();
  const fruits = document.querySelectorAll(".fruit");

  for (let i = 0; i < fruits.length; i++) {
    const name = fruits[i].firstChild.textContent.toLowerCase();
    const desc = fruits[i].querySelector("p")
      ? fruits[i].querySelector("p").textContent.toLowerCase()
      : "";

    if (name.indexOf(filterText) === -1 && desc.indexOf(filterText) === -1) {
      fruits[i].style.display = "none";
    } else {
      fruits[i].style.display = "flex";
    }
  }
});
