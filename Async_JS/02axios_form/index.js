document.addEventListener("DOMContentLoaded", initialise);

function initialise() {
  axios
    .get("https://crudcrud.com/api/a2e45bba5e864dbf811c6e3fc95af430/testData")
    .then((res) => {
      res.data.forEach((d) => displayUserOnScreen(d));
    })
    .catch((err) => console.log(err));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/a2e45bba5e864dbf811c6e3fc95af430/testData",
      userDetails
    )
    .then((response) => displayUserOnScreen(response.data))
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    axios
      .delete(
        `https://crudcrud.com/api/a2e45bba5e864dbf811c6e3fc95af430/testData/${userDetails._id}`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    userList.removeChild(event.target.parentElement);
  });

  editBtn.addEventListener("click", function (event) {
    axios
      .delete(
        `https://crudcrud.com/api/a2e45bba5e864dbf811c6e3fc95af430/testData/${userDetails._id}`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    userList.removeChild(event.target.parentElement);
    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
  });
}
