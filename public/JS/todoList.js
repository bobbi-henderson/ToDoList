let deleteTask = document.querySelectorAll('.delete')
let priorityUp = document.querySelectorAll('.fa-arrow-up')
let priorityDown = document.querySelectorAll('.fa-arrow-down')

Array.from(deleteTask).forEach((element)=>{
    element.addEventListener('click', removeTask)
})

Array.from(priorityUp).forEach((element)=>{
    element.addEventListener('click', addPriority)
})

Array.from(priorityDown).forEach((element)=>{
    element.addEventListener('click', lowerPriority)
})

async function removeTask(){
    const taskName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskName': taskName
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function addPriority(){
    let taskName = this.parentNode.parentNode.parentNode.childNodes[3].innerText
    let priorityLevel = Number(this.parentNode.parentNode.childNodes[1].innerText)
    console.log(taskName)
    try {
        const response = await fetch('increasePriority', {
            method: 'put', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskName': taskName,
                'priorityLevel': priorityLevel
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function lowerPriority(){
    let taskName = this.parentNode.parentNode.parentNode.childNodes[3].innerText
    let priorityLevel = Number(this.parentNode.parentNode.childNodes[1].innerText)
    console.log(priorityLevel)
    try {
        const response = await fetch('decreasePriority', {
            method: 'put', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskName': taskName,
                'priorityLevel': priorityLevel
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

