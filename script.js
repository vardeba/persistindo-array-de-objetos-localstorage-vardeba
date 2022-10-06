// const tasks = [
//     {
//         id: 1,
//         task: "Ir para a cama as 23h.",
//     },
//     {
//         id: 2,
//         task: "Academia 6h.",
//     },
//     {
//         id: 3,
//         task: "Farmacia.",
//     },
//     {
//         id: 4,
//         task: "Cozinhar feijão.",
//     },
// ];

let tasks = [];

let counter = 1;

const tagUlTasks = document.querySelector('.task-list');

const noTasksSection = document.querySelector('.no-tasks');

function showTasks(array, htmlReference){
    array.forEach(element => {
        let taskToMount = element;
        let taskToShow = createTask(taskToMount);
        htmlReference.appendChild(taskToShow);
    });
};

function createTask(task){
    let taskId = task.id;
    let taskDescription = task.task;

    const tagLiTask = document.createElement('li');
    tagLiTask.classList.add('task');

    const tagH2Task = document.createElement('h2');
    tagH2Task.classList.add('task-description');
    tagH2Task.innerText = `${taskDescription}`;

    const tagButtonTask = document.createElement('button');
    tagButtonTask.classList.add('delete-task');
    tagButtonTask.setAttribute('id', `${taskId}`);
    tagButtonTask.innerText = 'Excluir';

    tagLiTask.append(tagH2Task, tagButtonTask);

    return tagLiTask;
};

function addToTask(){
    const inputToTaskList = document.querySelector('#input-task');
    const buttonAddToTaskList = document.querySelector('#button-task');
    buttonAddToTaskList.addEventListener('click', (event) => {
        event.preventDefault();
        let task = {
            id: `${counter}`,
            task: "",
        };
        if (inputToTaskList.value === ""){
            alert("Digite uma tarefa!");
        }else{
            newTask = {
                task: "",
            };
            task.task = `${inputToTaskList.value}`;
            tasks.push(task);
            tagUlTasks.innerHTML = "";
            listRefresh();
            inputToTaskList.value = "";
            counter++;
            task = newTask;
            const arrayWithNewTaskJson = JSON.stringify(tasks);
            localStorage.setItem("toDoList", arrayWithNewTaskJson);
            const counterJson = JSON.stringify(counter);
            localStorage.setItem("counter", counterJson);
        };
    });
};

function listRefresh(){
    if (tasks.length > 0){
        noTasksSection.classList.add('hide');
        showTasks(tasks, tagUlTasks);
        deleteTaskFromList();
    }else{
        noTasksSection.classList.remove('hide')
    }
    
}

function deleteTaskFromList(){
    const buttonDelete = document.querySelectorAll('.delete-task');
    buttonDelete.forEach((button) => {
        button.addEventListener("click", (event) => {
            let taskId = event.target.id;
            const newTasks = tasks.filter((id) => id.id != taskId);
            tasks = [...newTasks];
            tagUlTasks.innerHTML = "";
            listRefresh();
            const arrayWithTaskRemovedJson = JSON.stringify(tasks);
            localStorage.setItem("toDoList", arrayWithTaskRemovedJson);
        });
    });
};

function getDataFromLocalstorage(){
    const localStorageDataJSON = localStorage.getItem('toDoList');
    const counterJSON = localStorage.getItem('counter');
    if (localStorageDataJSON){
        const localStorageData = JSON.parse(localStorageDataJSON);
        const counterStorageData = JSON.parse(counterJSON);
        tasks = [...localStorageData];
        counter = counterStorageData;
        listRefresh();
    }
}

addToTask();

listRefresh();

getDataFromLocalstorage();












