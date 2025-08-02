// Load tasks from localStorage or use empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editId = null;

// Get logged-in user
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) location.href = 'login.html';

// Set role label
document.getElementById("roleLabel").textContent = currentUser.role;

// Hide task form if user is a Client
if (currentUser.role === "Client") {
    const formSection = document.querySelector('.task-form-section');
    if (formSection) formSection.style.display = "none";
}

// DOM references
const form = document.getElementById('taskForm');
const tableBody = document.getElementById('taskTableBody');

// Modal references
const taskModal = document.getElementById('taskModal');
const openAddTaskModalBtn = document.getElementById('openAddTaskModalBtn');
const closeTaskModal = document.getElementById('closeTaskModal');
const taskDetailsModal = document.getElementById('taskDetailsModal');
const closeTaskDetailsModal = document.getElementById('closeTaskDetailsModal');
const taskDetailsContent = document.getElementById('taskDetailsContent');

// Dropdown references
const addTaskDropdown = document.getElementById('addTaskDropdown');
const openAddTaskDropdownBtn = document.getElementById('openAddTaskDropdownBtn');
const taskFormDropdown = document.getElementById('taskFormDropdown');

// Show Add Task button for Admin only
if (openAddTaskModalBtn) {
    if (currentUser.role === 'Admin') {
        openAddTaskModalBtn.style.display = '';
    } else {
        openAddTaskModalBtn.style.display = 'none';
    }
}
// Hide Add Task Dropdown button for Client
if (openAddTaskDropdownBtn) {
    if (currentUser.role !== 'Admin') {
        openAddTaskDropdownBtn.style.display = 'none';
    }
}

// Open Add Task Modal
if (openAddTaskModalBtn) {
    openAddTaskModalBtn.onclick = () => {
        document.getElementById('modalTitle').textContent = 'Add Task';
        form.reset();
        editId = null;
        taskModal.style.display = 'block';
    };
}

// Close Add/Edit Task Modal
if (closeTaskModal) {
    closeTaskModal.onclick = () => {
        taskModal.style.display = 'none';
    };
}

// Close Task Details Modal
if (closeTaskDetailsModal) {
    closeTaskDetailsModal.onclick = () => {
        taskDetailsModal.style.display = 'none';
    };
}

// Dropdown panel logic moved from index.html
function toggleAddTaskDropdown() {
    const dropdown = document.getElementById('addTaskDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}
window.addEventListener('click', function (e) {
    const dropdown = document.getElementById('addTaskDropdown');
    const btn = document.getElementById('openAddTaskDropdownBtn');
    if (dropdown && btn && !dropdown.contains(e.target) && !btn.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taskFormDropdown');
    if (form) {
        form.onsubmit = function (e) {
            e.preventDefault();
            document.getElementById('addTaskDropdown').style.display = 'none';
            form.reset();
        };
    }
});

// Handle Add Task Dropdown form submit (Admin only)
if (taskFormDropdown) {
    taskFormDropdown.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentUser.role !== 'Admin') return;
        const title = document.getElementById('taskTitleDropdown').value;
        const assignee = document.getElementById('taskAssigneeDropdown').value;
        const deadline = document.getElementById('taskDeadlineDropdown').value;
        const status = document.getElementById('taskStatusDropdown').value;
        // Restrict assigning past deadline dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(deadline);
        if (deadlineDate < today) {
            alert('Cannot assign a past date as deadline.');
            return;
        }
        const newTask = {
            id: Date.now(),
            title,
            assignee,
            deadline,
            status
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskFormDropdown.reset();
        addTaskDropdown.style.display = 'none';
        renderTasks();
    });
}

// Handle form submit (Admin only)
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentUser.role === "Client") return;
        const title = document.getElementById('taskTitle').value;
        const assignee = document.getElementById('taskAssignee').value;
        const deadline = document.getElementById('taskDeadline').value;
        const status = document.getElementById('taskStatus').value;
        // Restrict assigning past deadline dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(deadline);
        if (deadlineDate < today) {
            alert('Cannot assign a past date as deadline.');
            return;
        }
        if (editId !== null) {
            tasks = tasks.map(task =>
                task.id === editId
                    ? { ...task, title, assignee, deadline, status }
                    : task
            );
            editId = null;
        } else {
            const newTask = {
                id: Date.now(),
                title,
                assignee,
                deadline,
                status
            };
            tasks.push(newTask);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        form.reset();
        taskModal.style.display = 'none';
        renderTasks();
    });
}

// Render tasks in table
function renderTasks(filteredTasks = tasks) {
    tableBody.innerHTML = "";
    const visibleTasks = currentUser.role === "Client"
        ? filteredTasks.filter(task => task.assignee === currentUser.name)
        : filteredTasks;
    if (visibleTasks.length === 0) {
        tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;">No tasks found.</td>
      </tr>
    `;
        return;
    }
    visibleTasks.forEach((task, index) => {
        const row = document.createElement("tr");
        const canEdit = currentUser.role === "Admin";
        const canDelete = currentUser.role === "Admin";
        const canChangeStatus = currentUser.role === "Client" && task.assignee === currentUser.name;
        row.innerHTML = `
      <td>${index + 1}</td>
      <td title="${task.title}">${task.title.length > 20 ? task.title.substring(0, 20) + '...' : task.title}</td>
      <td>${task.assignee}</td>
      <td>
        ${canChangeStatus ? `
          <select class="status-dropdown" data-id="${task.id}">
            <option value="Not Started" ${task.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
            <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Delayed" ${task.status === 'Delayed' ? 'selected' : ''}>Delayed</option>
            <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
        ` : `<span class="status-badge ${getStatusClass(task.status)}">${task.status}</span>`}
      </td>
      <td>${task.deadline}</td>
      <td>
        ${canEdit ? `<button class="icon-btn" title="Edit" onclick="editTask(${task.id});event.stopPropagation();">
          <span class="material-icons">edit</span>
        </button>` : ""}
        ${canDelete ? `<button class="icon-btn delete-btn" title="Delete" onclick="deleteTask(${task.id});event.stopPropagation();">
          <span class="material-icons">delete</span>
        </button>` : ""}
      </td>
    `;
        // Add click event to open details page when clicking anywhere on the row (except on buttons/selects)
        row.addEventListener('click', function (e) {
            if (
                e.target.tagName !== 'BUTTON' &&
                e.target.tagName !== 'SELECT' &&
                !e.target.classList.contains('icon-btn') &&
                !e.target.classList.contains('delete-btn') &&
                !e.target.classList.contains('material-icons')
            ) {
                window.location.href = `task-details.html?id=${task.id}`;
            }
        });
        tableBody.appendChild(row);
    });
    // Add event listeners for status dropdowns
    document.querySelectorAll('.status-dropdown').forEach(select => {
        select.addEventListener('change', function (e) {
            const id = Number(this.getAttribute('data-id'));
            const newStatus = this.value;
            // Restrict Client from updating status after deadline
            const task = tasks.find(t => t.id === id);
            if (currentUser.role === 'Client') {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const deadlineDate = new Date(task.deadline);
                if (today > deadlineDate) {
                    alert('Cannot update task after the deadline date.');
                    // Reset dropdown to previous value
                    this.value = task.status;
                    return;
                }
            }
            tasks = tasks.map(task =>
                task.id === id ? { ...task, status: newStatus } : task
            );
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });
    });
}

// Edit task (Admin only)
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    // Restrict editing after deadline for Client
    if (currentUser.role === 'Client') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(task.deadline);
        if (today > deadlineDate) {
            alert('Cannot update task after the deadline date.');
            return;
        }
    }
    document.getElementById('modalTitle').textContent = 'Edit Task';
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskAssignee').value = task.assignee;
    document.getElementById('taskDeadline').value = task.deadline;
    document.getElementById('taskStatus').value = task.status;
    editId = id;
    taskModal.style.display = 'block';
}

// --- Custom Confirmation Modal Logic ---
let confirmCallback = null;
const confirmModal = document.createElement('div');
confirmModal.id = 'confirmModal';
confirmModal.style.display = 'none';
confirmModal.style.position = 'fixed';
confirmModal.style.top = '0';
confirmModal.style.left = '0';
confirmModal.style.width = '100vw';
confirmModal.style.height = '100vh';
confirmModal.style.background = 'rgba(0,0,0,0.3)';
confirmModal.style.zIndex = '9999';
confirmModal.innerHTML = `
  <div style="background:#fff;padding:24px 32px;border-radius:8px;max-width:320px;margin:15vh auto;box-shadow:0 2px 16px #0002;text-align:center;">
    <div id="confirmMessage" style="margin-bottom:18px;font-size:1.1em;">Are you sure you want to delete this task?</div>
    <button id="confirmYes" style="margin-right:16px;padding:6px 18px;">Yes</button>
    <button id="confirmNo" style="padding:6px 18px;">No</button>
  </div>
`;
document.body.appendChild(confirmModal);
document.getElementById('confirmYes').onclick = function () {
    confirmModal.style.display = 'none';
    if (typeof confirmCallback === 'function') confirmCallback(true);
};
document.getElementById('confirmNo').onclick = function () {
    confirmModal.style.display = 'none';
    if (typeof confirmCallback === 'function') confirmCallback(false);
};
function showConfirm(message, callback) {
    document.getElementById('confirmMessage').textContent = message;
    confirmCallback = callback;
    confirmModal.style.display = 'block';
}

// Delete task (Admin only)
function deleteTask(id) {
    showConfirm('Are you sure you want to delete this task?', function (confirmed) {
        if (!confirmed) return;
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    });
}

// Show task details in modal
function showTaskDetails(task) {
    taskDetailsContent.innerHTML = `
        <p><strong>Task:</strong> ${task.title}</p>
        <p><strong>Assigned To:</strong> ${task.assignee}</p>
        <p><strong>Status:</strong> ${task.status}</p>
        <p><strong>Deadline:</strong> ${task.deadline}</p>
    `;
    taskDetailsModal.style.display = 'block';
}

// Filter: Show All Tasks
function showAllTasks() {
    renderTasks();
    setActiveTab('All');
}

// Filter: Show Completed Tasks Only
function showCompletedTasks() {
    const completed = tasks.filter(task => task.status === "Completed");
    renderTasks(completed);
    setActiveTab('Completed');
}

// Filter: Show Tasks by Status
function showStatusTasks(status) {
    // Only allow Client to filter by status tabs
    if (currentUser.role === 'Admin') {
        renderTasks();
        setActiveTab('All');
        return;
    }
    const filtered = tasks.filter(task => task.status === status);
    renderTasks(filtered);
    setActiveTab(status);
}

// Highlight active tab
function setActiveTab(status) {
    const tabs = [
        { id: 'tab-all', status: 'All' },
        { id: 'tab-notstarted', status: 'Not Started' },
        { id: 'tab-inprogress', status: 'In Progress' },
        { id: 'tab-delayed', status: 'Delayed' },
        { id: 'tab-completed', status: 'Completed' }
    ];
    tabs.forEach(tab => {
        const el = document.getElementById(tab.id);
        if (!el) return;
        if ((status === tab.status) || (status === undefined && tab.status === 'All')) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

// Status badge color class
function getStatusClass(status) {
    switch (status) {
        case "Completed": return "status-completed";
        case "Delayed": return "status-delayed";
        case "In Progress": return "status-in-progress";
        case "Not Started": return "status-not-started";
        default: return "";
    }
}

// Logout and redirect
function logout() {
    localStorage.removeItem('currentUser');
    location.href = 'login.html';
}

// Initial render
renderTasks();
setActiveTab('All');

// Close modals on outside click
window.onclick = function (event) {
    if (event.target === taskModal) taskModal.style.display = 'none';
    if (event.target === taskDetailsModal) taskDetailsModal.style.display = 'none';
};

// Hide status tabs for Admin (only show to Client)
document.addEventListener('DOMContentLoaded', function () {
    if (currentUser.role === 'Admin') {
        const notStartedTab = document.getElementById('tab-notstarted');
        const inProgressTab = document.getElementById('tab-inprogress');
        const delayedTab = document.getElementById('tab-delayed');
        const allTab = document.getElementById('tab-all');
        const completedTab = document.getElementById('tab-completed');
        if (notStartedTab) notStartedTab.style.display = 'none';
        if (inProgressTab) inProgressTab.style.display = 'none';
        if (delayedTab) delayedTab.style.display = 'none';
        if (allTab) allTab.style.display = 'none';
        if (completedTab) completedTab.style.display = 'none';
    }
});

// Hide status-nav-toggle button for Admin (only show to Client)
document.addEventListener('DOMContentLoaded', function () {
    if (currentUser.role === 'Admin') {
        const statusNavToggleBtn = document.querySelector('.status-nav-toggle');
        if (statusNavToggleBtn) statusNavToggleBtn.style.display = 'none';
    }
});

function toggleStatusNavMenu(event) {
    event.preventDefault();
    var nav = document.querySelector('.status-nav');
    if (nav.style.display === 'block') {
        nav.style.display = '';
    } else {
        nav.style.display = 'block';
    }
}
