let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let searchField = document.getElementById('searchField');

function placeCaretAtEnd(el) {
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
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
            console.log(toDoText.offsetWidth);
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

