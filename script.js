const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
// Item Lists
const listColumns = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

// Items
let updatedOnLoad = false; // Track if the page has been loaded before

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem; // Store the item being dragged
let currentColumn; // Store the column where the item is being dragged

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
    if (localStorage.getItem("backlogItems")) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    } else {
        backlogListArray = ["Release the course", "Sit back and relax"];
        progressListArray = ["Work on projects", "Listen to music"];
        completeListArray = ["Being cool", "Getting stuff done"];
        onHoldListArray = ["Being uncool"];
    }
}

// Set localStorage Arrays
function updateSavedColumns() {
    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
    });
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
    // console.log("columnEl:", columnEl);
    // console.log("column:", column);
    // console.log("item:", item);
    // console.log("index:", index);
    // List Item
    const listEl = document.createElement("li");
    listEl.classList.add("drag-item");
    listEl.textContent = item;
    listEl.draggable = true; // Make the item draggable
    listEl.setAttribute("ondragstart", "drag(event)");
    // Append
    columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
    // Check localStorage once  
    if (!updatedOnLoad) {
        getSavedColumns();
        updatedOnLoad = true; // Set to true after first load
    }
    // Backlog Column
    backlogList.textContent = ""; // Clear existing items
    backlogListArray.forEach((backlogItem, index) => {
        createItemEl(backlogList, 0, backlogItem, index);
    });
    // Progress Column
    progressList.textContent = ""; // Clear existing items
    progressListArray.forEach((progressItem, index) => {
        createItemEl(progressList, 0, progressItem, index);
    });
    // Complete Column
    completeList.textContent = ""; // Clear existing items
    completeListArray.forEach((completeItem, index) => {
        createItemEl(completeList, 0, completeItem, index);
    });
    // On Hold Column
    onHoldList.textContent = ""; // Clear existing items
    onHoldListArray.forEach((onHoldItem, index) => {
        createItemEl(onHoldList, 0, onHoldItem, index);
    });
    // Run getSavedColumns only once, Update Local Storage

}

// When Item Start Draggin
function drag(e) {
    draggedItem = e.target;
    console.log('draggedItem:', draggedItem);
    
}

// Column Allows for Item to Drop
function allowDrop(e) {
    e.preventDefault(); // Prevent default behavior to allow drop
}

// When Item Enters Column Area
function dragEnter(column) {
    listColumns[column].classList.add("over");
    currentColumn = column;
}

// Dropping Item into Column
function drop(e) {
    e.preventDefault(); // Prevent default behavior
    // Remove Background Color/Padding
    listColumns.forEach(column => {
        column.classList.remove("over");
    });
    // Add Item to Column
    const parent = listColumns[currentColumn];
    parent.appendChild(draggedItem);
}

// On Load
updateDOM();