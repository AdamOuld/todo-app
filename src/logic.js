import Project from './Project.js'
import Task from './Task.js'
import { getFromLocalStorage, saveToLocalStorage } from './storage.js'
import { updateProjectDOM, updateTasksDOM } from './domhandler.js';



const projects = getFromLocalStorage()[0];
const taskBtn = document.getElementById("addTask")
const projectBtn = document.getElementById("addProject")
const taskmodal = document.getElementById("modal-edit")
const projectmodal = document.getElementById("modal-project")
const addProj = document.getElementById("project-form-btn")
const addTask = document.getElementById("task-form-btn")




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

function checkForActives() {
    let flag = false
    projects.forEach((proj) => {
        if (proj.active) {
            flag = true;
        }
    })
    return flag;
}

function renderEventListeners() {
    taskBtn.addEventListener("click", () => {
        if (!checkForActives()) {
            window.alert("Select a project or create a new one to add a task!")
            return;
        }
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
}



export {resetActives, resetAllActives, remove, renderEventListeners, checkForActives, projects}
