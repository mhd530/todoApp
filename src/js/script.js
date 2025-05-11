const btnLight = document.getElementById('btn-light');
const btnDark  = document.getElementById('btn-dark');
const btnLight2 = document.getElementById('btn-light2');
const btnDark2  = document.getElementById('btn-dark2');
const htmlEl   = document.documentElement;

function applyThemeFromStorage() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) htmlEl.classList.add('dark');
    else       htmlEl.classList.remove('dark');
}

function setActiveTab() {
    const isDark = htmlEl.classList.contains('dark');

    if (isDark) {
        btnDark.classList.add('bg-gray-700', 'text-gray-100');
        btnDark.classList.remove('bg-transparent', 'text-gray-500');
        btnLight.classList.add('bg-transparent', 'text-gray-400');
        btnLight.classList.remove('bg-white', 'text-gray-800');

        btnDark2.classList.add('bg-gray-700', 'text-gray-100');
        btnDark2.classList.remove('bg-transparent', 'text-gray-500');
        btnLight2.classList.add('bg-transparent', 'text-gray-400');
        btnLight2.classList.remove('bg-white', 'text-gray-800');
    } else {
        btnLight.classList.add('bg-white', 'text-gray-800');
        btnLight.classList.remove('bg-transparent', 'text-gray-400');
        btnDark.classList.add('bg-transparent', 'text-gray-500');
        btnDark.classList.remove('bg-gray-700', 'text-gray-100');

        btnLight2.classList.add('bg-white', 'text-gray-800');
        btnLight2.classList.remove('bg-transparent', 'text-gray-400');
        btnDark2.classList.add('bg-transparent', 'text-gray-500');
        btnDark2.classList.remove('bg-gray-700', 'text-gray-100');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyThemeFromStorage();
    setActiveTab();
});

btnLight.addEventListener('click', () => {
    htmlEl.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
    setActiveTab();
});

btnDark.addEventListener('click', () => {
    htmlEl.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
    setActiveTab();
});

btnLight2.addEventListener('click', () => {
    htmlEl.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
    setActiveTab();
});

btnDark2.addEventListener('click', () => {
    htmlEl.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
    setActiveTab();
});


const mobileMenuBtn   = document.getElementById('mobile-menu-btn');
const mobileMenu      = document.getElementById('mobile-menu');
const overlay         = document.getElementById('overlay');
const mobileMenuClose = document.getElementById('mobile-menu-close');

function toggleMobileMenu(show) {
    if (show) {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        overlay.style.display = 'block';
    } else {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        overlay.style.display = 'none';
    }
}

mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
overlay.addEventListener('click', () => toggleMobileMenu(false));
mobileMenuClose.addEventListener('click', () => toggleMobileMenu(false));


const form = document.getElementById("createelform");
const buildform = document.getElementById("todobuildform");
const removebanner = document.getElementById("todobanner");
const tag = document.getElementById("tag");
const degree = document.getElementById("matterdiv");
const addtask = document.getElementById("addtask");
const taskList = document.getElementById("todosContainer");
const completedTaskSection = document.getElementById("completedtask");
const input = document.getElementById("tittleinp");
const text = document.getElementById("descinp");
const taggreen = document.getElementById("greentag");
const tagorange = document.getElementById("orangtag");
const tagred = document.getElementById("redtag");
const dark = document.getElementById("Dark");

const dateElement = document.getElementById("date");
const taskCountElement = document.getElementById("taskCount");

let currentBorderColor = "";
let tasks = [];

form.addEventListener("click", (e) => {
    e.preventDefault();
    buildform.style.display = 'block';
    removebanner.style.display = 'none';
    updateRemoveBannerVisibility();
});

tag.addEventListener("click", (e) => {
    e.preventDefault();
    degree.style.display = "grid";
});

function clearTagBorders() {
    [taggreen, tagorange, tagred].forEach(tag => {
        tag.style.border = "none";
    });
}

taggreen.addEventListener("click", (e) => {
    e.preventDefault();
    currentBorderColor = "green";
    clearTagBorders();
    taggreen.style.border = "2px solid black";
});

tagorange.addEventListener("click", (e) => {
    e.preventDefault();
    currentBorderColor = "orange";
    clearTagBorders();
    tagorange.style.border = "2px solid black";
});

tagred.addEventListener("click", (e) => {
    e.preventDefault();
    currentBorderColor = "red";
    clearTagBorders();
    tagred.style.border = "2px solid black";
});

addtask.addEventListener("click", (e) => {
    e.preventDefault();
    const inputTask = input.value.trim();
    const textTask = text.value.trim();
    if (!inputTask || !textTask) {
        alert("لطفاً عنوان و توضیح را وارد کنید.");
        return;
    }

    const todo = document.createElement("li");
    todo.classList.add('todos__todo', 'task');
    todo.style.border = 'none';
    todo.style.margin = '0';
    todo.style.paddingRight = '8px';
    todo.style.backgroundColor = 'transparent';

    const now = new Date();

    let priorityColor = "";
    let priorityText = "";

    if (currentBorderColor === 'red') {
        priorityColor = "red";
        priorityText = "بالا";
    } else if (currentBorderColor === 'green') {
        priorityColor = "green";
        priorityText = "پایین";
    } else if (currentBorderColor === 'orange') {
        priorityColor = "orange";
        priorityText = "متوسط";
    }

    const wrapper = document.createElement("div");
    wrapper.style.borderRight = `8px solid ${priorityColor}`;
    wrapper.style.borderRadius = '8px';
    wrapper.style.padding = '10px';
    wrapper.classList.add('task-card');
    wrapper.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    wrapper.classList.add('dark:bg-[#091120]');

    wrapper.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;margin-top:5px;margin-right:0px;">
            <div style="display: flex; align-items: center;">
                <div><input type="checkbox" class="checkedcheckbox"></div>
                <div class="todo-title" style="margin-right: 10px; font-weight:bold;">${inputTask}</div>
                <div class="priority-badge" style="background-color:${priorityColor}; margin-right: 10px;">${priorityText}</div>
            </div>
            <div><img class="editPoints" src="./src/assets/img/Frame 33317.svg"></div>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:15px;">
            <div class="todo-desc" style="margin-right: 10px;">${textTask}</div>
            <div class="editTag" style="display:none; justify-content: center; background-color:white; width:70px;">
                <img class="delete" src="./src/assets/img/Vector.svg">
                <img class="edit" style="margin-right:10px;" src="./src/assets/img/Group.svg">
            </div>
        </div>
    `;

    todo.appendChild(wrapper);
    todo.setAttribute("data-date", now.toISOString());
    todo.setAttribute('data-priority-color', currentBorderColor);
    todo.setAttribute('data-completed', 'false');

    tasks.push({ element: todo, date: now.toDateString(), completed: false });

    taskList.appendChild(todo);
    input.value = '';
    text.value = '';
    buildform.style.display = 'none';

    updateRemoveBannerVisibility();
    updateTodayTaskCount(tasks);

    const check = wrapper.querySelector(".checkedcheckbox");
    check.addEventListener("change", function () {
        const savedColor = todo.getAttribute('data-priority-color') || "gray";
        const title = wrapper.querySelector(".todo-title");
        const desc = wrapper.querySelector(".todo-desc");

        const taskObj = tasks.find(t => t.element === todo);
        if (check.checked) {
            completedTaskSection.appendChild(todo);
            todo.classList.add("line-through");
            wrapper.style.opacity = "0.6";
            title.style.textDecoration = "line-through";
            desc.style.textDecoration = "line-through";
            if (taskObj) taskObj.completed = true;
        } else {
            taskList.appendChild(todo);
            todo.classList.remove("line-through");
            wrapper.style.opacity = "1";
            title.style.textDecoration = "none";
            desc.style.textDecoration = "none";
            if (taskObj) taskObj.completed = false;
        }

        wrapper.style.borderRight = `8px solid ${savedColor}`;
        wrapper.style.borderRadius = '8px';

        updateRemoveBannerVisibility();
        updateDoneCount();
        updateTodayTaskCount(tasks);
    });
});

taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        const todoItem = e.target.closest('.todos__todo');
        if (todoItem) {
            tasks = tasks.filter(t => t.element !== todoItem);
            todoItem.remove();
            updateRemoveBannerVisibility();
            updateTodayTaskCount(tasks);
        }
        return;
    }

    if (e.target.classList.contains("editPoints")) {
        const todoItem = e.target.closest('.todos__todo');
        const editTag = todoItem.querySelector(".editTag");
        if (editTag) {
            editTag.style.display = (editTag.style.display === "flex") ? "none" : "flex";
        }
        return;
    }

    if (e.target.classList.contains("edit")) {
        const todoItem = e.target.closest(".todos__todo");
        const titleEl = todoItem.querySelector(".todo-title");
        const descEl = todoItem.querySelector(".todo-desc");

        const newTitle = prompt("عنوان جدید را وارد کنید:", titleEl.textContent.trim());
        const newDesc = prompt("توضیح جدید را وارد کنید:", descEl.textContent.trim());

        if (newTitle !== null && newTitle.trim() !== "") {
            titleEl.textContent = newTitle;
        }

        if (newDesc !== null && newDesc.trim() !== "") {
            descEl.textContent = newDesc;
        }
        return;
    }
});

function updateRemoveBannerVisibility() {
    if (taskList.children.length === 0) {
        removebanner.style.display = "block";
    } else {
        removebanner.style.display = "none";
    }
}

function updateDoneCount() {
    const doneCount = document.querySelectorAll("#completedtask .task").length;
    completedTaskSection.querySelector("span").textContent = `${doneCount} تسک انجام شده است`;
}

function showTodayDate() {
    if (!dateElement) return;
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    dateElement.textContent = formatter.format(today);
}

function updateTodayTaskCount(taskList) {
    if (!taskCountElement) return;
    const today = new Date().toDateString();
    const todaysTasks = taskList.filter(t => t.date === today && !t.completed);
    taskCountElement.textContent = `${todaysTasks.length} تسک را باید انجام دهید`;
}

showTodayDate();
updateTodayTaskCount(tasks);
updateRemoveBannerVisibility()


// local storage




localStorage.setItem('tasktitle', "darling" );
localStorage.setItem("taskdesc" , "hello darling welcome to quera")
localStorage.setItem("proio" , "بالا")
localStorage.setItem("proiocolor" , "red")

const tasktitle = localStorage.getItem("tasktitle")
const taskdesc = localStorage.getItem("taskdesc")
const taskproio = localStorage.getItem("proio")
const proiocolor = localStorage.getItem("proiocolor")







const localbuilder = `
<div class="task-card dark:bg-[#091120]" style="border-right: 8px solid ${proiocolor}; border-radius: 8px; padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;margin-right:10px;">
        <div style="display: flex; justify-content: space-between; align-items: center;margin-top:5px;">
            <div style="display: flex; align-items: center;">
                <div><input type="checkbox" class="checkedcheckbox"></div>
                <div class="todo-title" style="margin-right: 10px; font-weight:bold;">${tasktitle}</div>
                <div class="priority-badge" style="background-color:${proiocolor}; margin-right: 10px;">${taskproio}</div>
            </div>
            <div><img class="editPoints" src="./src/assets/img/Frame 33317.svg"></div>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:15px;">
            <div class="todo-desc" style="margin-right: 10px;">${taskdesc}</div>
            <div class="editTag" style="display:none; justify-content: center; background-color:white; width:70px;">
                <img class="delete" src="./src/assets/img/Vector.svg">
                <img class="edit" style="margin-right:10px;" src="./src/assets/img/Group.svg">
            </div>
        </div>
    </div>

`


taskList.insertAdjacentHTML("afterbegin" , localbuilder)
