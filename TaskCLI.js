#!/usr/bin/env node
const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs');

// Puts data.json in User folder
const filePath = path.join(os.homedir(), 'tasks-database.json');

const [, , action, ...args] = process.argv;


function add(desc) {
  try {

    let tasks = [];

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      tasks = JSON.parse(fileContent);
    }
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      description: desc,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    console.log(`Task added: "${desc}" (ID: ${newTask.id})`);
  } catch (err) {
    console.error('Error saving data:', err);
  }

}

function update(index, desc) {

  if (!fs.existsSync(filePath)) return console.log("no tasks found.");
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const tasks = JSON.parse(fileContent);
  const taskIndex = tasks.findIndex(task => task.id == index);
  if (taskIndex !== -1) {
    tasks[taskIndex].description = desc;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    console.log(`Task ${index} updated to: ${desc}`);
  } else {
    console.log(`Error: Task with ID ${index} not found.`);
  }
}


function del(index) {
  if (!fs.existsSync(filePath)) return console.log("No tasks found.");
  
  const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const initialLength = tasks.length;
  
  const updatedTasks = tasks.filter(task => task.id != index);

  if (updatedTasks.length === initialLength) {
    console.log(`Error: Task with ID ${index} not found.`);
  } else {
    fs.writeFileSync(filePath, JSON.stringify(updatedTasks, null, 2));
    console.log(`Task ${index} deleted`);
  }
}


function list(status) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  let tasks = JSON.parse(fileContent);
  if(status != undefined) tasks = tasks.filter(task => task.status == status);
  if (tasks.length != 0){
    tasks.forEach(task => {
    console.log(`
      Task ${task.id}
      Description : ${task.description}
      Status : ${task.status}      
      `);
  });
  } else {
    console.log(`No task found`);
  }
}

function mark (index, status){
  if (!fs.existsSync(filePath)) return console.log("no tasks found.");
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const tasks = JSON.parse(fileContent);
  const taskIndex = tasks.findIndex(task => task.id == index);
  if (taskIndex !== -1  && (status === "todo" || status === "done" || status === "in-progress")) {
    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date().toISOString();
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    console.log(`Task ${index} status updated to: ${status}`);
  } else {
    console.log(`Error: Task with ID ${index} not found.`);
  }
}

function clearTasks() {
    if (!fs.existsSync(filePath)) {
        return console.log("Nothing to clear. Database is already empty.");
    }
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    
    console.log("All tasks have been cleared successfully.");
}

function showHelp() {
  console.log(`
  TaskCLI - Manage your tasks from the terminal

  Usage:
    task <action> [arguments]

  Actions:
    add <desc>              Add a new task (e.g., task add "Buy milk")
    update <id> <desc>      Update task description (e.g., task update 1 "Buy bread")
    del <id>                Delete a task by ID (e.g., task del 1)
    mark <id> <status>      Change status (todo, in-progress, done)
    list [status]           List all tasks or filter by status
    help                    Show this help menu

  Statuses:
    todo, in-progress, done
  `);
}
switch (action) {
  case 'add':
    add(args[0]);
    break;
  case 'del':
    del(args[0]);
    break;
  case 'update':
    update(args[0], args[1])
    break;
  case 'mark':
    mark(args[0], args[1])
    break;
  case 'list':
    list(args[0]);
    break;
  default:
    showHelp();
    break;
}