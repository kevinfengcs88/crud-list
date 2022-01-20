const toDoContainer = document.getElementById('toDoContainer');
const inputField = document.getElementById('inputField');
const searchField = document.getElementById('searchField');

document.addEventListener('DOMContentLoaded', getToDos);

function saveLocalToDos(toDo){
    let toDos;
    if (localStorage.getItem('toDos') === null){
        toDos = [];
    }
    else{
        toDos = JSON.parse(localStorage.getItem('toDos'));
    }
    toDos.push(toDo);
    localStorage.setItem('toDos', JSON.stringify(toDos));
}

function removeLocalToDos(toDo){
    let toDos;
    if (localStorage.getItem('toDos') === null){
        toDos = [];
    }
    else{
        toDos = JSON.parse(localStorage.getItem('toDos'));
    }
    const toDoIndex = toDo.children[0].innerText;
    toDos.splice(toDos.indexOf(toDoIndex), 1);
    localStorage.setItem('toDos', JSON.stringify(toDos));
}

function getToDos(){    // buggy
    let toDos;
    if (localStorage.getItem('toDos') === null){
        toDos = [];
    }
    else{
        toDos = JSON.parse(localStorage.getItem('toDos'));
    }
    toDos.forEach(function(toDo){
        // ITEM TO CONTAIN, TEXT, EDIT, AND DELETE
        const toDoItem = document.createElement('div');
        // TEXT
        const toDoText = document.createElement('div');
        toDoItem.classList.add('to-do-item');
        toDoText.classList.add('to-do-text'); 
        toDoText.innerText = toDo
        toDoItem.appendChild(toDoText);
        // EDIT BUTTON
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add('edit-button');
        toDoItem.appendChild(editButton);
        // DELETE BUTTON
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash" style="color:red;"aria-hidden="true"></i>';
        deleteButton.classList.add('delete-button');
        toDoItem.appendChild(deleteButton);
        toDoContainer.appendChild(toDoItem);
        // make text editable, focus on the element, and set cursor to the end
        editButton.addEventListener('click', function(){
            toDoText.contentEditable = 'true';
            toDoText.focus();
            placeCaretAtEnd(toDoText);
        })
        // make text uneditable
        toDoText.addEventListener('keypress', function(e){
            if (e.key === 'Enter'){
                toDoText.contentEditable = 'false';
            }
        })
        // remove item from list
        deleteButton.addEventListener('click', function(){
            toDoContainer.removeChild(toDoItem);
            removeLocalToDos(toDoItem);
        })
    });
}

function placeCaretAtEnd(el) {
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined"){
        let range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        let textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

inputField.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        if (inputField.value.trim() != ''){
            // ITEM TO CONTAIN, TEXT, EDIT, AND DELETE
            const toDoItem = document.createElement('div');
            // TEXT
            const toDoText = document.createElement('div');
            toDoItem.classList.add('to-do-item');
            toDoText.classList.add('to-do-text'); 
            toDoText.innerText = inputField.value;
            toDoItem.appendChild(toDoText);
            // EDIT BUTTON
            const editButton = document.createElement('button');
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.classList.add('edit-button');
            toDoItem.appendChild(editButton);
            // DELETE BUTTON
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fa fa-trash" style="color:red;"aria-hidden="true"></i>';
            deleteButton.classList.add('delete-button');
            toDoItem.appendChild(deleteButton);
            toDoContainer.appendChild(toDoItem);
            saveLocalToDos(inputField.value);
            inputField.value = '';
            // make text editable, focus on the element, and set cursor to the end
            editButton.addEventListener('click', function(){
                toDoText.contentEditable = 'true';
                toDoText.focus();
                placeCaretAtEnd(toDoText);
            })
            // make text uneditable
            toDoText.addEventListener('keypress', function(e){
                if (e.key === 'Enter'){
                    toDoText.contentEditable = 'false';
                }
            })
            // remove item from list
            deleteButton.addEventListener('click', function(){
                toDoContainer.removeChild(toDoItem);
                removeLocalToDos(toDoItem);
            })
        }
        else{
            alert('Please enter a valid value.');
        }
    }
})

searchField.addEventListener('input', function() {
    const toDos = document.querySelectorAll('.to-do-text');
    const toDosArray = Array.from(toDos);
    for (let i = 0; i < toDosArray.length; i++){
        if (toDosArray[i].innerText.toUpperCase().indexOf(searchField.value.toUpperCase()) > -1){
            toDosArray[i].parentElement.style.display = '';
        }
        else{
            toDosArray[i].parentElement.style.display = 'none';
        }
    }
})

