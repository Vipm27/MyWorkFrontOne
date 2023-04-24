let listItems = [];



function addItem (text) {
    const todo = {
        text,              
        checked: false,   
        id: Date.now(),    
    };
    listItems.push(todo);
    renderTodo(todo);
}


function checkDone(key) {
    const index = listItems.findIndex(item => item.id === Number(key));
    listItems[index].checked = !listItems[index].checked;
    renderTodo(listItems[index]);
}

function deleteTodo(key) {
    const index = listItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...listItems[index]
    };

    listItems = listItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

function editTodo(key) {
    const index = listItems.findIndex(item => item.id === Number(key)); 


}


const form = document.querySelector('.js-form');
const addGoal = document.getElementById('addBtn');
    function selectForm(event) {

    event.preventDefault();
    const input = document.querySelector('.js-todo-input');
    const text = input.value.trim();
    if (text !== '') {
        addItem(text);
        input.value = '';   
        input.focus();       
    }

};

addGoal.addEventListener('click', selectForm, false);
form.addEventListener('submit', selectForm, false);


function renderTodo(todo) {
    localStorage.setItem('listItemsRef', JSON.stringify(listItems));
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        return
    }

    const checkMarked = todo.checked ? 'done' : '';
    const goal = document.createElement('li');
    goal.setAttribute('class', `todo-item ${checkMarked}`);
    goal.setAttribute('data-key', todo.id);
    goal.innerHTML = `
    <input id="${todo.id}" type="checkbox" />
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="edit-todo js-edit-todo"><i class="fa-solid fa-pencil"></i></button>
    <button class="delete-todo js-delete-todo">X</button>
    `;

    if (item) {
        list.replaceChild(goal, item);
    }else {
    list.append(goal);
    }
}



    const list = document.querySelector('.js-todo-list');
    list.addEventListener('click', event => {
        if (event.target.classList.contains('js-tick')) {
            const itemKey = event.target.parentElement.dataset.key;
            checkDone(itemKey);
        }

        if (event.target.classList.contains('js-delete-todo')) {
            const itemKey = event.target.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
        if (event.target.matches('.edit-todo') && event.target !== event.currentTarget) {
          const text = event.target.previousElementSibling;
          text.toggleAttribute('contenteditable');
          if (text.contenteditable) {
            text.focus();
          }
        }
    })
  

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('listItemsRef');
    if (ref) {
        listItems = JSON.parse(ref);
        listItems.forEach(t => {
            renderTodo(t);
        });
    }
});
