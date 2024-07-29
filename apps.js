// app.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks to the DOM
    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';
        taskItem.textContent = task.text;
  
        // Mark as completed button
        const completeButton = document.createElement('button');
        completeButton.textContent = '✔';
        completeButton.onclick = () => toggleTask(index);
  
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✖';
        deleteButton.onclick = () => deleteTask(index);
  
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);
  
        taskList.appendChild(taskItem);
      });
    };
  
    // Save tasks to localStorage
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Add a new task
    taskForm.onsubmit = (e) => {
      e.preventDefault();
      const text = taskInput.value.trim();
      if (text) {
        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
      }
    };
  
    // Toggle task completion
    const toggleTask = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
  
    // Delete a task
    const deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
  
    // Initial render of tasks
    renderTasks();
  });
  