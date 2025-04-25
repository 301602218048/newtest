const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");
const putBtn = document.getElementById("put-btn");
const deleteBtn = document.getElementById("delete-btn");

getBtn.addEventListener("click", getTodos);
postBtn.addEventListener("click", postTodo);
putBtn.addEventListener("click", putTodo);
deleteBtn.addEventListener("click", deleteTodo);

function getTodos() {
  axios
    .get("https://crudcrud.com/api/d5d00f561b62448796fff468f1ca0a4d/post")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function postTodo() {
  axios
    .post("https://crudcrud.com/api/d5d00f561b62448796fff468f1ca0a4d/post", {
      title: "Learn Axios",
      completed: false,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function putTodo() {
  let id;
  axios
    .get("https://crudcrud.com/api/d5d00f561b62448796fff468f1ca0a4d/post")
    .then((res) => {
      res.data.forEach((d) => {
        if (d.title === "Learn Axios") id = d._id;
      });
      console.log(id);
      axios
        .put(
          `https://crudcrud.com/api/d5d00f561b62448796fff468f1ca0a4d/post/${id}`,
          {
            title: "Learn Axios",
            completed: true,
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function deleteTodo() {
  let id;
  axios
    .get("https://crudcrud.com/api/d5d00f561b62448796fff468f1ca0a4d/post")
    .then((res) => {
      res.data.forEach((d) => {
        if (d.title === "Learn Axios") id = d._id;
      });
      console.log(id);
      axios
        .delete(
          `https://crudcrud.com/api/d5d00f561b62448796fff468f1ca0a4d/post/${id}`
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
