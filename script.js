const getItemForm = document.getElementById('item-form');
const getItemInput = document.getElementById('item-input');
const getItemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const item = getItemList.querySelectorAll('li');
console.log(item);

function addItem(e) {
    e.preventDefault();
    newItem = getItemInput.value;
    if (newItem === '') {
        alert('Enter some item ');
        return;
    }
    console.log('sucess');
    //craete list Item:://
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    //console.log(li);
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    getItemList.appendChild(li);
    newItem.value = '';
    checkUI()
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
function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }

}
function clearItem(e) {
    while (getItemList.firstChild) {
        getItemList.removeChild(getItemList.firstChild);
    }
    checkUI();

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
    const item = getItemList.querySelectorAll('li');
    console.log(item);
    if (item.length === 0) {
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else {
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}
getItemForm.addEventListener('submit', addItem);
getItemList.addEventListener('click', removeItem);
itemClear.addEventListener('click', clearItem);
itemFilter.addEventListener('input',filterItem)


checkUI();