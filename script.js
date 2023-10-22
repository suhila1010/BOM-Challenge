//to clear local storage
// localStorage.clear()

let btn = document.getElementById('Add');
let Tasks = document.getElementById('tasks')

/**Creation Function */
let create = Element => document.createElement(`${Element}`)
/**Append Function */
let append = (parent, child) => parent.append(child)

//**get the input  */
let userInput = document.querySelector("[name='userTask']")
/**ADD Function */

let tasks = JSON.parse(localStorage.getItem("tasks"));
let i;
if (tasks) { i = tasks.length }

for (let index = 0; index < i; index++) {
    let task = tasks[index].task;
    let taskId = tasks[index].id;
    let TaskDiv = create("div");
    TaskDiv.className = 'Task'
    let paragraph = create("p")
    paragraph.className = 'TaskText'
    paragraph.innerText = task
    append(TaskDiv, paragraph)

    let btnDelete = document.createElement("button");
    btnDelete.className = 'TaskBTN';
    btnDelete.innerText = 'Delete';

    btnDelete.addEventListener("click", function () {
        console.log("Deleted");
        TaskDiv.remove(); // Remove the task div from the DOM
        const index = tasks.findIndex(task => task.id === taskId);
        if (index > -1) {
            tasks.splice(index, 1); // Remove the task object from the tasks array
            localStorage.setItem("tasks", JSON.stringify(tasks)); // Update the tasks array in local storage
        }
    });

    TaskDiv.appendChild(btnDelete);
    Tasks.appendChild(TaskDiv);
}
btn.addEventListener("click", function () {
    if (userInput.value !== "") {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks from local storage or create an empty array

        let taskObj = {
            id: generateRandomId(),
            task: userInput.value
        };

        tasks.push(taskObj); // Add the task object to the tasks array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Store the tasks array in local storage

        let taskDiv = document.createElement("div");
        taskDiv.className = 'Task';

        let paragraph = document.createElement("p");
        paragraph.className = 'TaskText';
        paragraph.innerText = taskObj.task;

        taskDiv.appendChild(paragraph);

        let btnDelete = document.createElement("button");
        btnDelete.className = 'TaskBTN';
        btnDelete.innerText = 'Delete';

        btnDelete.addEventListener("click", function () {
            console.log("Deleted");
            taskDiv.remove(); // Remove the task div from the DOM
            const index = tasks.findIndex(task => task.id === taskObj.id);
            if (index > -1) {
                tasks.splice(index, 1); // Remove the task object from the tasks array
                localStorage.setItem("tasks", JSON.stringify(tasks)); // Update the tasks array in local storage
            }
        });

        taskDiv.appendChild(btnDelete);
        Tasks.appendChild(taskDiv);
    }
});

function generateRandomId() {
    return Math.random() // Generate a random ID
}