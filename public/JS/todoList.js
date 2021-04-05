let deleteTask = document.querySelectorAll('.delete')

Array.from(deleteTask).forEach((element)=>{
    element.addEventListener('click', removeTask)
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
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

