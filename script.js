const getItemForm = document.getElementById('item-form');
const getItemInput = document.getElementById('item-input');
const getItemList = document.getElementById('item-list');

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

getItemForm.addEventListener('submit', addItem); 