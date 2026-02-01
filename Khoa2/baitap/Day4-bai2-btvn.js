let tasks = [];
let currentId = 1;

let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

addBtn.onclick = function () {
  let title = input.value.trim();
  if (title === "") return;

  tasks.push({
    id: currentId,
    title: title,
    completed: false
  });
  currentId++;

  input.value = "";
  render();
};

function render() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");

    let text = document.createElement("span");
    text.innerHTML = tasks[i].title;

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";

    editBtn.onclick = function () {
      let newTitle = prompt("Nhập tên mới:", tasks[i].title);
      if (newTitle !== null && newTitle.trim() !== "") {
        tasks[i].title = newTitle;
        render();
      }
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";

    deleteBtn.onclick = function () {
      tasks.splice(i, 1);
      render();
    };

    li.appendChild(text);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  }
}
