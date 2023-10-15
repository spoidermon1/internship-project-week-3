document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const datetimeInput = document.getElementById('datetime-input');
    const addTaskButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateTasks() {
        // Clear the task list
        taskList.innerHTML = '';

        // Add tasks from the array
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text} (${task.datetime})</span>
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
                <button class="complete-button" data-index="${index}">${task.completed ? 'Uncomplete' : 'Complete'}</button>
            `;
            taskList.appendChild(taskItem);

            // Add event listeners for editing, deleting, and completing
            const editButton = taskItem.querySelector('.edit-button');
            const deleteButton = taskItem.querySelector('.delete-button');
            const completeButton = taskItem.querySelector('.complete-button');
            editButton.addEventListener('click', () => editTask(index));
            deleteButton.addEventListener('click', () => deleteTask(index));
            completeButton.addEventListener('click', () => toggleComplete(index));
        });

        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask() {
        const text = taskInput.value.trim();
        const datetime = datetimeInput.value;
        if (text !== '') {
            tasks.push({ text, datetime, completed: false });
            taskInput.value = '';
            datetimeInput.value = '';
            updateTasks();
        }
    }

    function editTask(index) {
        const newText = prompt('Edit the task:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText;
            updateTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        updateTasks();
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        updateTasks();
    }

    addTaskButton.addEventListener('click', addTask);

    // Load and update tasks
    updateTasks();
});
