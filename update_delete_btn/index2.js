document.addEventListener("DOMContentLoaded", initialize);
document.querySelector("form").addEventListener("submit", handleFormSubmit);

// When the page loads, display all users
function initialize() {
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  usersList.forEach((user) => {
    addUserToDOM(user);
  });

  // Set up event delegation for Delete and Edit buttons
  const ul = document.querySelector("ul");
  ul.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    const userId = li.getAttribute("data-id");

    if (e.target.classList.contains("delete-btn")) {
      deleteData(userId, li);
    } else if (e.target.classList.contains("edit-btn")) {
      editData(userId);
    }
  });
}

// Handle form submit (Add or Update)
function handleFormSubmit(e) {
  e.preventDefault();

  const username = e.target.username.value;
  const email = e.target.email.value;
  const phone = e.target.phone.value;

  const editId = sessionStorage.getItem("editId");

  if (editId) {
    update(editId, username, email, phone);
  } else {
    addData(username, email, phone);
  }

  e.target.reset();
}

// Add a new user
function addData(username, email, phone) {
  const userId = Date.now().toString(); // Unique ID

  const obj = {
    id: userId,
    username,
    email,
    phone,
  };

  let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  usersList.push(obj);
  localStorage.setItem("usersList", JSON.stringify(usersList));

  addUserToDOM(obj);
}

// Update an existing user
function update(userId, username, email, phone) {
  let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  const updatedList = usersList.map((user) => {
    if (user.id === userId) {
      return { ...user, username, email, phone };
    }
    return user;
  });

  localStorage.setItem("usersList", JSON.stringify(updatedList));
  sessionStorage.removeItem("editId");

  // Update the corresponding li in DOM
  const liElements = document.querySelectorAll("ul li");
  liElements.forEach((li) => {
    if (li.getAttribute("data-id") === userId) {
      li.firstChild.textContent = email;
      li.querySelector(
        "p"
      ).textContent = `Username: ${username}, Email: ${email}, Phone: ${phone}`;
    }
  });
}

// Edit an existing user - populate form
function editData(userId) {
  const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  const user = usersList.find((u) => u.id === userId);
  if (user) {
    document.querySelector("form").username.value = user.username;
    document.querySelector("form").email.value = user.email;
    document.querySelector("form").phone.value = user.phone;
    sessionStorage.setItem("editId", userId);
  }
}

// Delete user
function deleteData(userId, liElement) {
  let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
  const updatedList = usersList.filter((user) => user.id !== userId);
  localStorage.setItem("usersList", JSON.stringify(updatedList));
  liElement.remove();

  // Clear edit mode if deleting the user currently being edited
  if (sessionStorage.getItem("editId") === userId) {
    sessionStorage.removeItem("editId");
    document.querySelector("form").reset();
  }
}

// Add user to the DOM
function addUserToDOM(user) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.setAttribute("data-id", user.id);

  li.textContent = user.email;

  const para = document.createElement("p");
  para.textContent = `Username: ${user.username}, Email: ${user.email}, Phone: ${user.phone}`;
  li.appendChild(para);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  ul.appendChild(li);
}
