let tasks = [];

function addTask() {

    const taskInput = document.getElementById("taskInput");

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task!");

        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks();
}


function displayTasks() {

    const taskList = document.getElementById("taskList");

    const emptyMessage = document.getElementById("emptyMessage");

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

        tasks.forEach(function(task) {

            const li = document.createElement("li");

            li.className = "task";

            const span = document.createElement("span");

            span.className = "task-text";

            span.textContent = task.text;

            if (task.completed) {

                span.classList.add("completed");

            }

            span.onclick = function() {

                toggleTask(task.id);

            };


            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.className = "delete-btn";

            deleteButton.onclick = function() {

                deleteTask(task.id);

            };


            li.appendChild(span);

            li.appendChild(deleteButton);

            taskList.appendChild(li);

        });
    }

    updateTaskCount();
}


function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });

    displayTasks();
}


function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    displayTasks();
}


function clearCompleted() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });

    displayTasks();
}


function clearAll() {

    if (tasks.length === 0) {

        return;

    }

    const confirmation = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmation) {

        tasks = [];

        displayTasks();

    }
}


function updateTaskCount() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {

        return task.completed;

    }).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;
}


function handleKeyPress(event) {

    if (event.key === "Enter") {

        addTask();

    }
}


displayTasks();