var dropTarget = document.querySelector(".wrapper")

var students = document.querySelectorAll(".student")

var tables = document.querySelectorAll(".table")

for (let i = 0; i < students.length; i++) {
    students[i].addEventListener("dragstart", (ev) => {
       ev.dataTransfer.setData("srcId", ev.target.id) 
    })
}

for (let i = 0; i < tables.length; i++) {
    tables[i].addEventListener("dragstart", (ev) => {
       ev.dataTransfer.setData("srcId", ev.target.id) 
    })
}

dropTarget.addEventListener("dragover", (ev) => {
    ev.preventDefault();
})

dropTarget.addEventListener("drop", (ev) => {
    ev.preventDefault()
    let target = ev.target
    let srcId = ev.dataTransfer.getData("srcId")

    let droppable_student = target.classList.contains("table")
    let droppable_table = target.classList.contains("place")

    let dropped_student = srcId[0] == "s"
    let dropped_table = srcId[0] == "t"
    
    if (droppable_student && dropped_student) {
        target.appendChild(document.getElementById(srcId))
    }
    if (droppable_table && dropped_table) {
        target.appendChild(document.getElementById(srcId))
    }
})