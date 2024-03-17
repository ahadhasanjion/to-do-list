// Defining the FroalaEditor globally
var editor = new FroalaEditor("#taskEditor");


function editTask(taskItem) {
  var taskContent = taskItem.querySelector('.task-content');
  if (!taskContent) {
    console.error('Task content element not found');
    return;
  }

  // Set the task to the editor
  editor.html.set(taskContent.innerHTML);

  // Show the editor and the save button
  document.getElementById('taskEditor').style.display = 'block';
  document.getElementById('saveTaskBtn').style.display = 'inline-block';
  document.getElementById('addTaskBtn').style.display = 'none'; // Hiding The Add Task button

  // Add event listener to the Save button
  document.getElementById('saveTaskBtn').addEventListener('click', function () {
    var editedContent = editor.html.get();

    // Updating the task content in the task item
    taskContent.innerHTML = editedContent;

    // Clear the editor
    editor.html.set("");

    // Hiding The Only Save Button
    document.getElementById('saveTaskBtn').style.display = 'none';
    document.getElementById('addTaskBtn').style.display = 'inline-block'; // Show Add Task button
  });
}

// Event listener for the "Edit" button
document.getElementById('editButton').addEventListener('click', function () {
  editTask(taskItem);
});

function addTask() {
  var taskContent = editor.html.get();

  // Creating Tasks li
  var taskItem = document.createElement("li");
  taskItem.classList.add("task");

  // Creating checkbox for task item
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  taskItem.appendChild(checkbox);

  // add task content
  var contentSpan = document.createElement("span");
  contentSpan.classList.add("task-content");
  contentSpan.innerHTML = taskContent;
  taskItem.appendChild(contentSpan);

  // Creating status element
  var statusElement = document.createElement("div");
  statusElement.classList.add("status");
  statusElement.textContent = "Status: Incomplete";
  taskItem.appendChild(statusElement);

  // Add task actions
  var actionsElement = document.createElement("div");
  actionsElement.classList.add("actions");

  // Complete button for updating status element
  var completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.addEventListener("click", function () {
    statusElement.textContent = "Status: Completed"; // Update status text
  });
  actionsElement.appendChild(completeButton);


  // Edit button
  var editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    editTask(taskItem);
  });
  actionsElement.appendChild(editButton);

  // Pin to Top button
  var pinToTopButton = document.createElement("button");
  pinToTopButton.textContent = "Pin to Top";
  pinToTopButton.addEventListener("click", function () {
    taskItem.pinned = !taskItem.pinned;
    if (taskItem.pinned) {
      pinToTopButton.textContent = "Pinned";
    } else {
      pinToTopButton.textContent = "Pin to Top";
    }
    var taskList = document.getElementById("taskList");
    taskList.insertBefore(taskItem, taskList.firstChild);
  });
  actionsElement.appendChild(pinToTopButton);

  // Delete button
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    taskItem.remove();
  });
  actionsElement.appendChild(deleteButton);

  // Add task actions to task item
  taskItem.appendChild(actionsElement);

  // Append task item to task list
  document.getElementById("taskList").appendChild(taskItem);

  // Clear the editor 
  editor.html.set("");
}
document.getElementById("addTaskBtn").addEventListener("click", addTask);



document.getElementById("completeTasksBtn").addEventListener("click", completeSelectedTasks);
document.getElementById("deleteTasksBtn").addEventListener("click", deleteSelectedTasks);


var checkboxes = document.querySelectorAll(".task-checkbox");
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", toggleButtonsVisibility);
});

// Toggle visibility of action buttons on selected tasks
function toggleButtonsVisibility() {
  var selectedTasks = document.querySelectorAll('.task-checkbox:checked');
  var completeButton = document.getElementById('completeTasksBtn');
  var deleteButton = document.getElementById('deleteTasksBtn');

  if (selectedTasks.length > 0) {
    completeButton.style.display = 'inline-block';
    deleteButton.style.display = 'inline-block';
  } else {
    completeButton.style.display = 'none';
    deleteButton.style.display = 'none';
  }
}

//Completed selected tasks
function completeSelectedTasks() {
  var selectedTasks = document.querySelectorAll('.task-checkbox:checked');
  selectedTasks.forEach(function (task) {
    var statusElement = task.parentElement.querySelector('.status');
    statusElement.textContent = 'Status: Completed';
    task.checked = false;
  });
  toggleButtonsVisibility();
}

// Deleting selected tasks
function deleteSelectedTasks() {
  var selectedTasks = document.querySelectorAll('.task-checkbox:checked');
  selectedTasks.forEach(function (task) {
    task.closest('.task').remove();
  });
  toggleButtonsVisibility();
}

// Event listener for checkbox
document.addEventListener('change', function (event) {
  if (event.target.matches('.task-checkbox')) {
    toggleButtonsVisibility();
  }
});



