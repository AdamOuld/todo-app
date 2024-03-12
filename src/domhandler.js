import { saveToLocalStorage } from './storage.js'
import {resetActives, checkForActives, resetAllActives, remove, projects} from './logic.js'

const todoList = document.getElementById("To-Do List")
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
        deleteProj.classList.add("sub-button")
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
        deleteTodo.classList.add("sub-button")
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




export {updateProjectDOM, resetAllActives, updateTasksDOM, checkForActives}





















