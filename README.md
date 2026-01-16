# Task Tracker CLI 🚀

A lightweight, efficient command-line interface (CLI) tool to manage your tasks. Built using **Node.js**, this tool persists your data in a JSON file and can be accessed globally from any terminal window.

## 🌟 Key Features
- **Global Command**: Use the `task` keyword from any folder.
- **Persistent JSON Storage**: Tasks are stored safely in your home directory.
- **Smart Filtering**: View all tasks or filter by `todo`, `in-progress`, or `done`.
- **Easy Management**: Add, update, delete, and mark tasks with simple commands.

---

## 🛠️ Installation & Setup

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 16 or higher recommended).

### 2. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/task-tracker-cli.git](https://github.com/YOUR_USERNAME/task-tracker-cli.git)
cd task-tracker-cli
```
### 3. Install Globally

Use the npm link command to make the task keyword available everywhere on your system.
`npm link`


**Note**: On macOS or Linux, you may need to run this with sudo npm link depending on your permissions.

### 📖 Usage Guide
You can run the tool by typing `task` followed by an action.

**Commands**
| Action         | Syntax                        | Example                           |   |   |
|----------------|-------------------------------|-----------------------------------|---|---|
| Add            | task add "<description>"      | task add "Buy groceries"          |   |   |
| Update         | task update <id> "<new desc>" | task update 1 "Buy milk and eggs" |   |   |
| Delete         | task del <id>                 | task del 1                        |   |   |
| List All       | task list                     | task list                         |   |   |
| List by Status | task list <status>            | task list done                    |   |   |
| Mark Status    | task mark <id> <status>       | task mark 1 in-progress           |   |   |
| Clear All      | task clear                    | task clear                        |   |   |
| Help           | task help                     | task help                         |   |   |


**Supported Statuses**:
 - todo (Default)
 - in-progress
 - done

