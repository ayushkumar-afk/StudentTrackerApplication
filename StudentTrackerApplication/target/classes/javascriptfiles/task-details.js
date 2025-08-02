// ...existing code from task-details.js...
// task-details.js
function getTaskIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}


function showTaskDetails() {
    const taskId = getTaskIdFromUrl();
    if (!taskId) {
        document.getElementById('taskDetails').innerHTML = '<p>Task not found.</p>';
        return;
    }
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(t => t.id == taskId);
    if (!task) {
        document.getElementById('taskDetails').innerHTML = '<p>Task not found.</p>';
        return;
    }
    // Check user role
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let formHtml = '';
    if (currentUser && currentUser.role === 'Client') {
        // Client can only update status
        formHtml = `
            <form id="editTaskDetailsForm">
                <p><strong>Task:</strong> ${task.title}</p>
                <p><strong>Assigned To:</strong> ${task.assignee}</p>
                <p><strong>Status:</strong> <select id="editTaskStatus">
                    <option value="Not Started" ${task.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                    <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Delayed" ${task.status === 'Delayed' ? 'selected' : ''}>Delayed</option>
                    <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select></p>
                <p><strong>Deadline:</strong> ${task.deadline}</p>
                <button type="submit" class="btn btn-primary">Update Status</button>
            </form>
            <div id="updateMsg" style="color:green;margin-top:10px;"></div>
        `;
    } else {
        // Admin can update all fields
        formHtml = `
            <form id="editTaskDetailsForm">
                <p><strong>Task:</strong> <input type="text" id="editTaskTitle" value="${task.title}" required></p>
                <p><strong>Assigned To:</strong> <input type="text" id="editTaskAssignee" value="${task.assignee}" required></p>
                <p><strong>Status:</strong> <select id="editTaskStatus">
                    <option value="Not Started" ${task.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                    <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Delayed" ${task.status === 'Delayed' ? 'selected' : ''}>Delayed</option>
                    <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select></p>
                <p><strong>Deadline:</strong> <input type="date" id="editTaskDeadline" value="${task.deadline}" required></p>
                <button type="submit" class="btn btn-primary">Update Task</button>
            </form>
            <div id="updateMsg" style="color:green;margin-top:10px;"></div>
        `;
    }
    document.getElementById('taskDetails').innerHTML = formHtml;
    document.getElementById('taskDetails').style.display = 'block';
    // Handle update
    document.getElementById('editTaskDetailsForm').onsubmit = function (e) {
        e.preventDefault();
        let updatedTask;
        // Restrict Client from updating after deadline
        if (currentUser && currentUser.role === 'Client') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const deadlineDate = new Date(task.deadline);
            if (today > deadlineDate) {
                document.getElementById('updateMsg').style.color = 'red';
                document.getElementById('updateMsg').textContent = 'Cannot update task after the deadline date.';
                return;
            }
            const updatedStatus = document.getElementById('editTaskStatus').value;
            updatedTask = { ...task, status: updatedStatus };
        } else {
            const updatedTitle = document.getElementById('editTaskTitle').value;
            const updatedAssignee = document.getElementById('editTaskAssignee').value;
            const updatedStatus = document.getElementById('editTaskStatus').value;
            const updatedDeadline = document.getElementById('editTaskDeadline').value;
            updatedTask = { ...task, title: updatedTitle, assignee: updatedAssignee, status: updatedStatus, deadline: updatedDeadline };
        }
        const updatedTasks = tasks.map(t => t.id == taskId ? updatedTask : t);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        document.getElementById('updateMsg').style.color = 'green';
        document.getElementById('updateMsg').textContent = 'Task updated successfully!';
    };
}

document.addEventListener('DOMContentLoaded', showTaskDetails);
