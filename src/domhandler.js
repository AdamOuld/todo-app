import Project from './Project.js'
import Task from './Task.js'
import { getFromLocalStorage, saveToLocalStorage, removeStorage } from './storage.js'


const projects = getFromLocalStorage()[0];
const taskBtn = document.getElementById("addTask")
const projectBtn = document.getElementById("addProject")
const taskmodal = document.getElementById("modal-edit")
const projectmodal = document.getElementById("modal-project")
const addProj = document.getElementById("project-form-btn")
const addTask = document.getElementById("task-form-btn")
const todoList = document.getElementById("To-Do List")



taskBtn.addEventListener("click", () => {
    taskmodal.showModal()
})

projectBtn.addEventListener("click", () => {
    projectmodal.showModal()
})

addProj.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("edit-projectTitle")
    const project = new Project(title.value)
    projects.push(project)
    projectmodal.close();
    saveToLocalStorage(projects)
    updateProjectDOM()
})

addTask.addEventListener("click", (e) => {
    e.preventDefault()
    const title = document.getElementById("edit-todoTitle").value
    const desc = document.getElementById("edit-todoDescription").value
    const duedate = document.getElementById("edit-todo-dueDate").value
    projects.forEach((project) => {
        if (project.active) {
            project.todos.push(new Task(title, desc, duedate))
            saveToLocalStorage(projects)
            updateTasksDOM(project)
        }
    })
    taskmodal.close()
})

const list = document.getElementById("projectList")

function updateProjectDOM() {
    list.innerHTML = ""
    projects.forEach((proj, i) => {
        const div = document.createElement("div")
        div.classList.add("project-list")
        const name = document.createElement("h2")
        name.textContent = proj.name
        div.setAttribute("index", i)
        const deleteProj = document.createElement("button")
        deleteProj.textContent = "Delete"
        list.appendChild(div)
        div.appendChild(name)
        div.appendChild(deleteProj)
        name.addEventListener("click", () => {
            let index = parseInt(div.getAttribute("index"))
            projects[index].active = true;
            resetActives(projects[index])
            updateTasksDOM(projects[index])
        })
        deleteProj.addEventListener("click", () => {
            let index = parseInt(div.getAttribute("index"))
            remove(projects, index)
            updateProjectDOM()
            saveToLocalStorage(projects)
            todoList.innerHTML = ""
        })
    })
    console.log(projects)
}

function updateTasksDOM(project) {
    const tasks = project.todos
    todoList.innerHTML = ""
    tasks.forEach((task, i) => {
        const taskDiv = document.createElement("div")
        taskDiv.classList.add("task-div")
        taskDiv.setAttribute("data-index", i)
        const taskName = document.createElement("h3")
        taskName.textContent = "Name: " + task.name
        const taskDate = document.createElement("h4")
        taskDate.textContent = "Due Date: " + task.duedate
        const taskDesc = document.createElement("h4")
        taskDesc.textContent = "Description: " + task.desc
        const deleteTodo = document.createElement("button")
        deleteTodo.textContent = "Delete"
        deleteTodo.addEventListener("click", () => {
            let index = parseInt(taskDiv.getAttribute("data-index"))
            remove(project.todos, index)
            updateTasksDOM(project)
        })
        taskDiv.appendChild(taskName)
        taskDiv.appendChild(taskDate)
        taskDiv.appendChild(taskDesc)
        taskDiv.appendChild(deleteTodo)
        todoList.appendChild(taskDiv)
    })
    saveToLocalStorage(projects)
}

function resetActives(project) {
    projects.forEach((proj) => {
        if (proj.name !== project.name) {
            proj.active = false
        }
    })
}
function resetAllActives() {
    projects.forEach((proj) => {
        proj.active = false
    })
}



function remove(project, index) {
    project.splice(index, 1)
    saveToLocalStorage(projects)
}

resetAllActives()
updateProjectDOM()






















