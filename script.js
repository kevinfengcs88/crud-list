let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let searchButton = document.getElementById('search');
let searchField = document.getElementById('searchField');

addToDoButton.addEventListener('click', function(){
    if (inputField.value.trim() != ''){
        let paragraph = document.createElement('p');
        paragraph.classList.add('paragraph-styling');
        paragraph.innerText = inputField.value;
        toDoContainer.appendChild(paragraph);
        inputField.value = '';
        paragraph.addEventListener('click', function(){
            paragraph.style.textDecoration = 'line-through';
        })
        paragraph.addEventListener('dblclick', function(){
            toDoContainer.removeChild(paragraph);
        })
    }
    else{
        alert('Please enter a valid value.');
    }
})

function myFunc(){
    // const toDos = document.querySelectorAll('.paragraph-styling');
    // let toDosArray = Array.from(toDos);
    // for (let i = 0; i < toDosArray.length; i++){
    //     if (toDosArray[i].innerText.toUpperCase().indexOf(searchField.value.toUpperCase()) > -1){
    //         toDosArray[i].style.display = '';
    //     }
    //     else{
    //         toDosArray[i].style.display = 'none';
    //     }
    // }
}

searchField.addEventListener('input', function() {
    const toDos = document.querySelectorAll('.paragraph-styling');
    let toDosArray = Array.from(toDos);
    for (let i = 0; i < toDosArray.length; i++){
        if (toDosArray[i].innerText.toUpperCase().indexOf(searchField.value.toUpperCase()) > -1){
            toDosArray[i].style.display = '';
        }
        else{
            toDosArray[i].style.display = 'none';
        }
    }
})



