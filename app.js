const enterBtn = document.getElementById('enter')
const displayItems = document.querySelector('.to-do-list')
const editBtn = document.querySelectorAll('.editBtn')
const clearBtn = document.querySelector('.clear-btn')
const sortBtn = document.querySelector('.sort')
const dateSection = document.getElementById('date')
const error = document.querySelector('.error')

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

// event listeners
enterBtn.addEventListener('click', () => {
    const item = document.getElementById('item')

    createItem(item)
})

clearBtn.addEventListener('click', () => {
    localStorage.clear()
    document.querySelectorAll('.item').forEach(e => e.remove())
})
// create todo
function createItem(item) {
    if (item.value.trim() === ''){
        error.innerText = "Please add a note!"
        setTimeout(() => {
            error.innerText = ''
        }, 2000);
    }else{
        const notes = {
            text: item.value,
            id: '1'
        }
        itemsArray.push(notes)
    }
 
    localStorage.setItem('items', JSON.stringify(itemsArray))
    displayTodos()
    item.value = ''
}

// display todos
function displayTodos() {
    displayItems.innerHTML = ''
    itemsArray.map((item) => {
        return(displayItems.innerHTML += `
        <div class="item">
        <div class="input-controller">
            <textarea disabled>${item.text}</textarea>
            <div class="edit-controller">
            <div class="update-controller">
                <button class="saveBtn">Save</button>
                    <div class="radio">
                        <label for="priority">Low</label>
                        <input type="radio" name="priority" value="1" onClick="radioBtns()">
                        <label for="priority">Med</label>
                        <input type="radio" name="priority" value="2"onClick="radioBtns()">
                        <label for="priority">High</label>
                        <input type="radio" name="priority" value="3"onClick="radioBtns()">
                    </div>
                <i class="fas fa-trash deleteBtn"></i>
                <i class="fas fa-pen-to-square editBtn"></i>
            </div>
        </div>

    </div>
        `)
    })
    activateDeleteBtn()
    activateEditListeners()
    activateSaveBtn()
    toggleWeight()
}

sortBtn.addEventListener('click', sortItems)

function sortItems(e){
    e.preventDefault()
    itemsArray.sort((a, b) => parseFloat(b.id) - parseFloat(a.id))
    localStorage.setItem('items', JSON.stringify(itemsArray))
    displayTodos()
}

// Radio Btns. buttons got value of radio options. items allowed forEach to run. Found index or array and set id equal to button value. Called with onClick when buttons created
function radioBtns(){
    const buttons = document.querySelector('[name="priority"]:checked').value
    let items = document.querySelectorAll('.item')

    items.forEach((it, i) => {
        it.addEventListener('click', () => {
            itemsArray[i].id = buttons
            localStorage.setItem('items', JSON.stringify(itemsArray))
            toggleWeight()
        })
    })
}


// Toggles Low, Med, High priority btns. Needs to be called in displayTodos() function to run on page load to bind event listeners to buttons. Otherwise radio buttons have to be clicked twice to work. (First click binds event listener, second click would then fire function)
function toggleWeight(){
    const radios = document.querySelectorAll('input[type="radio"]')
    const labels = document.querySelectorAll('label') 
    
    radios.forEach((lb, i) => {
        lb.addEventListener('click', () => {
            labels.forEach( lb => lb.classList.remove('label-weight'))
            labels[i].classList.add('label-weight')
        })
    })
}


// delete items
function deleteItems(i){
    itemsArray.splice(i, 1)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    displayTodos()
}

// delete items event listener *deleteBTN has to be selected here*
function activateDeleteBtn(){
    let deleteBtn = document.querySelectorAll('.deleteBtn')
    deleteBtn.forEach((db, i) => {
        db.addEventListener('click', () => deleteItems(i))
    })
}

// edit items (to get save btn to show under right spot, variable needs to be queryselectorALL and in listener find the INDEX)
function activateEditListeners(){
    const texttt = document.querySelectorAll('.input-controller textarea')
    const editBtn = document.querySelectorAll('.editBtn')
    const updateController = document.querySelectorAll('.update-controller')
    const inputs = document.querySelectorAll('.input-controller textarea')
    const saveBtn = document.querySelectorAll('.saveBtn')
    editBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {
            updateController[i].style.display = "flex"
            inputs[i].disabled = false
            saveBtn[i].style.display = 'flex'
            texttt[i].style.backgroundColor = '#fff'
        })
    })

}

// save button
function activateSaveBtn() {
    const saveBtn = document.querySelectorAll('.saveBtn')
    const inputs = document.querySelectorAll('.input-controller textarea')
    saveBtn.forEach((sb, i) => {
        sb.addEventListener('click', () => {
            updateItem(inputs[i].value, i)
        })
    })
}

// when saving an EDIT, had to set itemsArray[i].text to access text property ONLY of object
function updateItem(text, i){
    itemsArray[i].text = text
    localStorage.setItem('items', JSON.stringify(itemsArray))
    init()
}

function displayDate() {
    let date = new Date()
    date = date.toString().split(" ")
    dateSection.innerHTML = `
    ${date[1]} ${date[2]}, ${date[3]}
    `
}

init()
// initialize
function init() {
    displayTodos()
    displayDate()
    itemsArray.forEach(displayTodos)
}