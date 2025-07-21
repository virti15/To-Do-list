const addTaskBtn = document.querySelector(".task-input button");
const taskInput = document.querySelector(".task-input input");
const prioritySelect = document.querySelector(".task-input select");
const pendingColumn = document.querySelector("#pending");
const inProgressColumn = document.querySelector("#in-progress");
const completedColumn = document.querySelector(".completed");

const totalStat = document.querySelector(".stat-box:nth-child(1)");
const completedStat = document.querySelector(".stat-box:nth-child(2)");
const pendingStat = document.querySelector(".stat-box:nth-child(3)");

function updateStats() {
  const total = document.querySelectorAll(".task").length;
  const completed = completedColumn.querySelectorAll(".task").length;
  const pending = pendingColumn.querySelectorAll(".task").length;
  totalStat.innerHTML = `${total}<br>Total Tasks`;
  completedStat.innerHTML = `${completed}<br>Completed`;
  pendingStat.innerHTML = `${pending}<br>Pending`;
}

function createTaskElement(title, priority) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task", priority.toLowerCase());

  const titleDiv = document.createElement("div");
  titleDiv.className = "task-title";
  titleDiv.textContent = title;

  const badge = document.createElement("span");
  badge.className = `badge ${priority.toLowerCase()}`;
  badge.textContent = priority.toUpperCase();

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "task-buttons";

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✓";
  doneBtn.onclick = () => {
    titleDiv.classList.add("completed-title");
    taskDiv.querySelectorAll("button").forEach(btn => btn.remove());
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.onclick = () => {
      taskDiv.remove();
      updateStats();
    };
    buttonDiv.appendChild(deleteBtn);
    completedColumn.appendChild(taskDiv);
    updateStats();
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.onclick = () => {
    const newTitle = prompt("Edit task title:", titleDiv.textContent);
    if (newTitle) titleDiv.textContent = newTitle;
    inProgressColumn.appendChild(taskDiv);
    updateStats();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.onclick = () => {
    taskDiv.remove();
    updateStats();
  };

  buttonDiv.appendChild(doneBtn);
  buttonDiv.appendChild(editBtn);
  buttonDiv.appendChild(deleteBtn);

  taskDiv.appendChild(titleDiv);
  taskDiv.appendChild(badge);
  taskDiv.appendChild(buttonDiv);

  return taskDiv;
}

addTaskBtn.addEventListener("click", () => {
  const title = taskInput.value.trim();
  const priority = prioritySelect.value.split(" ")[0];

  if (title === "") {
    alert("Please enter a task title.");
    return;
  }

  const task = createTaskElement(title, priority);
  pendingColumn.appendChild(task);
  taskInput.value = "";
  prioritySelect.selectedIndex = 0;
  updateStats();
});

updateStats();
