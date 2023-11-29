document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task, index) {
        createTaskElement(task, index);
    });
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        // Retrieve tasks from local storage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Add new task to the array
        tasks.push({ text: taskText });

        // Save tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Clear input field
        taskInput.value = "";

        // Reload tasks
        loadTasks();
    }
}

function deleteTask(index) {
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Remove the task at the specified index
    tasks.splice(index, 1);

    // Save tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Reload tasks
    loadTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const editedText = prompt("Edit task:", tasks[index].text);

    if (editedText !== null) {
        tasks[index].text = editedText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function createTaskElement(task, index) {
    const taskList = document.getElementById("task-list");

    // Create task element
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    // Create task text element
    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    // Create task actions container
    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    // Create edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    
    editButton.addEventListener("click", function () {
        editTask(index);
    });

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        deleteTask(index);
    });

    // Append elements to task actions container
    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    // Append elements to task container
    taskElement.appendChild(taskText);
    taskElement.appendChild(taskActions);

    // Append task to the task list
    taskList.appendChild(taskElement);
}

