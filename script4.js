document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
      li.innerHTML = `
                <span>${task.text}</span>
                <div class="task-actions">
                    <button class="edit" onclick="editTask(${index})">Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                    <button class="toggle" onclick="toggleTask(${index})">${
        task.completed ? "Uncomplete" : "Complete"
      }</button>
                </div>
            `;
      taskList.appendChild(li);
      // Triggering the fade-in animation
      requestAnimationFrame(() => (li.style.opacity = 1));
    });
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = {
      text: taskInput.value,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  });

  window.editTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null) {
      tasks[index].text = newText;
      saveTasks();
      renderTasks();
    }
  };

  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  };

  renderTasks();
});
