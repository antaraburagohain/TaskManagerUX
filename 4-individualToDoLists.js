'use strict';

const form1 = document.getElementById('new-task-form');
const errorElement = document.getElementById('error');
const serviceURL = 'http://127.0.0.1:5000';

form1.addEventListener('submit', (e) => {
  const public_id = localStorage.getItem('public_id');
  const group_id = '';
  const task_Desc = document.getElementById('new-task-input-task').value;
  const duedate = document.getElementById('new-task-input-date').value;
  const priority = document.getElementById('new-task-input-p').value;
  addTask(public_id, group_id, task_Desc, priority, duedate);
});

const addTask = (public_id, group_id, task_Desc, priority, duedate) => {
  axios
    .post(`${serviceURL}/task/create_task/`, {
      public_id: public_id,
      group_id: group_id,
      task_Desc: task_Desc,
      priority: priority,
      duedate: duedate,
      assigned_to: '',
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.error(error));
};

function render_HP(tasks) {
  let html = '';
  tasks.forEach((task) => {
    if (task.priority === 'High') {
      let htmlSegment = `<div id="tasks">

            <div class="task">
                <div class="content">
                    <input
                        type="text"
                        class="text"
                        value="${task.task_Desc}"
                        readonly>
                        <input
                        type="text"
                        class="text"
                        value="Due: ${task.duedate}"
                        readonly>
                </div>
                <div class="actions">
                    <button class="edit">Edit</button>
                    <button onclick="delete()" class="delete">Delete</button>
                </div>
            </div>

        </div>`;

      html += htmlSegment;
    }
  });

  let section1 = document.querySelector('.hp');
  section1.innerHTML = html;
}

function render_MP(tasks) {
  let html = '';
  tasks.forEach((task) => {
    if (task.priority === 'Medium') {
      let htmlSegment = `<div id="tasks">

              <div class="task">
                  <div class="content">
                      <input
                          type="text"
                          class="text"
                          value="${task.task_Desc}"
                          readonly>
                          <input
                          type="text"
                          class="text"
                          value="Due: ${task.duedate}"
                          readonly>
                  </div>
                  <div class="actions">
                      <button class="edit">Edit</button>
                      <button class="delete">Delete</button>
                  </div>
              </div>

          </div>`;
      html += htmlSegment;
    }
  });
  let section1 = document.querySelector('.mp');
  section1.innerHTML = html;
}

function render_LP(tasks) {
  let html = '';
  tasks.forEach((task) => {
    if (task.priority === 'Low') {
      let htmlSegment = `<div id="tasks">
  
                <div class="task">
                    <div class="content">
                        <input
                            type="text"
                            class="text"
                            value="${task.task_Desc}"
                            readonly>
                            <input
                            type="text"
                            class="text"
                            value="Due: ${task.duedate}"
                            readonly>
                    </div>
                    <div class="actions">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>
  
            </div>`;
      html += htmlSegment;
    }
  });

  let section1 = document.querySelector('.lp');
  section1.innerHTML = html;
}

function getTasks() {
  axios
    .post(`${serviceURL}/task/list_task/`, {
      email: localStorage.getItem('email'),
      group_id: '',
    })
    .then((response) => {
      console.log(response.data);
      render_HP(response.data);
      render_MP(response.data);
      render_LP(response.data);
    })
    .catch((error) => console.error(error));
}

getTasks();

function logout() {
  localStorage.clear();
  window.location.replace('2-login.html');
}
