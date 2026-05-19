let tasks = [];

function loadTasks() {
  const saved = localStorage.getItem("todoTasks");
  tasks = saved ? JSON.parse(saved) : [];
}

function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})" title="Xóa">✕</button>
    `;

    list.appendChild(li);
  });

}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") {
    input.focus();
    input.placeholder = " Vui lòng nhập nội dung!";
    setTimeout(() => (input.placeholder = "Học Git hôm nay"), 2000);
    return;
  }

  tasks.push({ text: text, done: false });
  input.value = "";
  input.focus();
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  renderTasks();

  const addBtn = document.querySelector(".input button");
  addBtn.addEventListener("click", addTask);

  document.getElementById("taskInput").addEventListener("keydown", handleEnter);
});