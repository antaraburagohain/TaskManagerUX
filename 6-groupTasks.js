'use strict';

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const group_id = urlParams.get('group_id');
localStorage.setItem('group_id', group_id);

console.log(`Group ID: ${localStorage.getItem('group_id')}`);

const form1 = document.getElementById('new-task-form');
const errorElement = document.getElementById('error');
const serviceURL = 'http://127.0.0.1:5000';

let segment = '';

function render_byuser_bytask(user, tasks) {
  console.log(user.name);
  console.log(tasks);
  // tasks.forEach((task)=>{
  //   h2
  // });

  // document.querySelector(
  //   '.username'
  // ).innerHTML = `<h2 style="color: black">${user.name}</h2>`;

  let html = '';
  let html1 = '';
  let html2 = '';

  document.querySelector(
    '.displaynames'
  ).innerHTML += `<h2 style="color: black">${user.name}</h2><main class="displaypls">
  <button class="btn btn-danger">High Priority Tasks</button>
      <br>
      <br>
  <section class="task-list hp">
      <div id="tasks">
          <div class="task">
              <div class="content">
                  <input
                      type="text"
                      class="text"
                      value="A new task"
                      readonly>
                      <input
                      type="text"
                      class="text"
                      value="Due: 20/04/2022"
                      readonly>
              </div>
              <div class="actions">
                  <button class="edit">Edit</button>
                  <button class="delete">Delete</button>
              </div>
          </div>
      </div>
      <div id="tasks">
          <div class="task">
              <div class="content">
                  <input
                      type="text"
                      class="text"
                      value="A new task"
                      readonly>
                      <input
                      type="text"
                      class="text"
                      value="Due: 20/04/2022"
                      readonly>
              </div>
              <div class="actions">
                  <button class="edit">Edit</button>
                  <button class="delete">Delete</button>
              </div>
          </div>
      </div>
  </section>
  <button class="btn btn-warning">Medium Priority Tasks</button>
      <br>
      <br>
  <section class="task-list mp">
      <div id="tasks">
          <div class="task">
              <div class="content">
                  <input
                      type="text"
                      class="text"
                      value="A new task"
                      readonly>
                      <input
                      type="text"
                      class="text"
                      value="Due: 20/04/2022"
                      readonly>
              </div>
              <div class="actions">
                  <button class="edit">Edit</button>
                  <button class="delete">Delete</button>
              </div>
          </div>
      </div>
      <div id="tasks">
          <div class="task">
              <div class="content">
                  <input
                      type="text"
                      class="text"
                      value="A new task"
                      readonly>
                      <input
                      type="text"
                      class="text"
                      value="Due: 20/04/2022"
                      readonly>
              </div>
              <div class="actions">
                  <button class="edit">Edit</button>
                  <button class="delete">Delete</button>
              </div>
          </div>
      </div>
  </section>
  <button class="btn btn-info">Low Priority Tasks</button>
      <br>
      <br>
  <section class="task-list lp">
      <div id="tasks">
          <div class="task">
              <div class="content">
                  <input
                      type="text"
                      class="text"
                      value="A new task"
                      readonly>
                      <input
                      type="text"
                      class="text"
                      value="Due: 20/04/2022"
                      readonly>
              </div>
              <div class="actions">
                  <button class="edit">Edit</button>
                  <button class="delete">Delete</button>
              </div>
          </div>
      </div>
      <div id="tasks">
          <div class="task">
              <div class="content">
                  <input
                      type="text"
                      class="text"
                      value="A new task"
                      readonly>
                      <input
                      type="text"
                      class="text"
                      value="Due: 20/04/2022"
                      readonly>
              </div>
              <div class="actions">
                  <button class="edit">Edit</button>
                  <button class="delete">Delete</button>
              </div>
          </div>
      </div>
  </section>
  </main>`;
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
                  <button class="delete">Delete</button>
              </div>
          </div>
      </div>`;
      html += htmlSegment;
    }
    if (task.priority === 'Medium') {
      let htmlSegment1 = `<div id="tasks">
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
      html1 += htmlSegment1;
    }
    if (task.priority === 'Low') {
      let htmlSegment2 = `<div id="tasks">
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
      html2 += htmlSegment2;
    }
  });
  let section1 = document.querySelector('.hp');
  section1.innerHTML = html;
  let section2 = document.querySelector('.mp');
  section2.innerHTML = html1;
  let section3 = document.querySelector('.lp');
  section3.innerHTML = html2;
}

function getUsers() {
  console.log('get users call');
  axios
    .post(`${serviceURL}/group/all_members`, {
      group_id: localStorage.getItem('group_id'),
    })
    .then((response) => {
      const users = response.data;
      console.log(users);
      let html = '';
      let html1 = '';
      users.forEach((user) => {
        let htmlSegment = `<option value="${user.name}">${user.name}</option>`;
        // let htmlSegment1 = `<h2 class="${user.name}">${user.name}</h2>`;
        html += htmlSegment;
        // html1 += htmlSegment1;
      });
      document.getElementById('new-task-input-a').innerHTML = html;
      // document.querySelector('.displaypls').innerHTML = html1;

      getTasks(users);
    })
    .catch((error) => console.error(error));
}

form1.addEventListener('submit', (e) => {
  const group_id = localStorage.getItem('group_id');
  const task_Desc = document.getElementById('new-task-input-task').value;
  const duedate = document.getElementById('new-task-input-date').value;
  const priority = document.getElementById('new-task-input-p').value;
  const assigned_to = document.getElementById('new-task-input-a').value;
  const public_id = localStorage.getItem('public_id');
  console.log(public_id);
  addTask(public_id, group_id, task_Desc, duedate, priority, assigned_to);
  getUsers();
});

const addTask = (
  public_id,
  group_id,
  task_Desc,
  duedate,
  priority,
  assigned_to
) => {
  axios
    .post(`${serviceURL}/task/create_task/`, {
      public_id: public_id,
      group_id: group_id,
      task_Desc: task_Desc,
      priority: priority,
      duedate: duedate,
      assigned_to: assigned_to,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.error(error));
};

function getTasks(users) {
  console.log('get task called');
  axios
    .post(`${serviceURL}/task/list_task/`, {
      email: localStorage.getItem('email'),
      group_id: group_id,
    })
    .then((response) => {
      const tasks = response.data;
      console.log('Tasks ', tasks);
      // users.forEach((user) => {
      //   document.querySelector(
      //     '.displaynames'
      //   ).innerHTML = `<h2 class="${user.name}">${user.name}</h2>`;
      // });
      let x = [];
      console.log('All Users', users);
      users = users.reverse();
      users.forEach((user) => {
        const usertasks = [];
        tasks.forEach((task) => {
          if (user.name === task.assigned_to) {
            usertasks.push(task);
          }
        });

        console.log('User', user);
        console.log('tasks', usertasks);
        render_byuser_bytask(user, usertasks);
      });

      console.log(response.data);
    })
    .catch((error) => console.error(error));
}

function logout() {
  localStorage.clear();
  window.location.replace('2-login.html');
}
