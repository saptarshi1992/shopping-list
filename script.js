const getItemForm = document.getElementById('item-form');
const getItemInput = document.getElementById('item-input');
const getItemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const fromBtn = getItemForm.querySelector('button');
let isEditMode = false;
function displayItemFromLocalStorage() {
    let getItem = getItemFromLocalStorage();
    getItem.forEach(item => {
        addItemIntoDom(item);
    })
    checkUI();
}
function addItem(e) {
    e.preventDefault();
    newItem = getItemInput.value;
    if (newItem === '') {
        alert('Enter some item ');
        return;
    }
    console.log('sucess');
    if (isEditMode) {
        const itemToEdit = getItemList.querySelector('.edit-mode');
        removeItemfromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }
    else {
        if (checkItemExist(newItem)) {
            alert('Item Already Exist!!');
            return;
        }
    }
    //craete list Item:://
    addItemIntoDom(newItem);
    addItemIntoLocalStorage(newItem);
    newItem.value = '';
    checkUI()
}
function addItemIntoDom(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    //console.log(li);
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    getItemList.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
function OnItemClick(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    }
    else {
        setItemEdit(e.target);
    }
}
function setItemEdit(item) {
    isEditMode = true;
    getItemList
        .querySelectorAll('li')
        .forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    fromBtn.innerHTML = '<i class = "fa-solid fa-pen"> </i> Update Item';
    fromBtn.style.backgroundColor = '#228B22';
    getItemInput.value = item.textContent;
}
function removeItem(item) {
    // console.log(item);
    // if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are You Sure?')) {
        item.remove();
        removeItemfromStorage(item.textContent);
    }
    checkUI();
}

function clearItem(e) {
    while (getItemList.firstChild) {
        getItemList.removeChild(getItemList.firstChild);
    }
    checkUI();
    //clear from localstorage::
    localStorage.removeItem('items');
}
function removeItemfromStorage(item) {
    let itemFromLocalStorage = getItemFromLocalStorage();
    itemFromLocalStorage = itemFromLocalStorage.filter((i) => i !== item)
    localStorage.setItem('items', JSON.stringify(itemFromLocalStorage));

}
function filterItem(e) {
    const items = getItemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }

    })
}
function checkUI() {
    getItemInput.value = '';
    const item = getItemList.querySelectorAll('li');
    if (item.length === 0) {
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    fromBtn.innerHTML = '<i class=fa-solid fa-plus></i> Add Item';
    fromBtn.style.backgroundColor = '#333';
}
function addItemIntoLocalStorage(item) {
    let itemLocalstorage = getItemFromLocalStorage();
    itemLocalstorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemLocalstorage));

}
function getItemFromLocalStorage() {
    let itemLocalstorage;
    if (localStorage.getItem('items') === null) {
        itemLocalstorage = [];
    } else {
        itemLocalstorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemLocalstorage;
}
function checkItemExist(item) {
    const itemFromStorage = getItemFromLocalStorage();
    return itemFromStorage.includes(item);
}
getItemForm.addEventListener('submit', addItem);
getItemList.addEventListener('click', OnItemClick);
itemClear.addEventListener('click', clearItem);
itemFilter.addEventListener('input', filterItem);
document.addEventListener("DOMContentLoaded", displayItemFromLocalStorage);

checkUI();
