
function getFromLocalStorage() {
    const projects = [];
    for (let i = 0; i < localStorage.length; i++) {
      const projectName = localStorage.key(i);
  
      const projectData = localStorage.getItem(projectName);
      const projectTasks = JSON.parse(projectData)
      projects.push(projectTasks);
    }
    return projects;
  }

function saveToLocalStorage(data) {
    return localStorage.setItem(data.name, JSON.stringify(data));
}


export { getFromLocalStorage, saveToLocalStorage };