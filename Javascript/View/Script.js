// HER LÆGGER VI ALLE JAVASCRIPT FILES SAMMEN

// VARIABLE
let mainContainer =document.getElementById("mainContainer")
let objData = getData()
let obj = {}

// CREATE BUTTON
let createButton = document.createElement("button")
createButton.innerText = 'create new'

// createButton.addEventListener("click",createInput)
mainContainer.appendChild(createButton)

// SAVE BUTTON
let saveButton = document.createElement("button")
saveButton.innerText ='Save'
// saveButton.addEventListener("click", saveData)
mainContainer.appendChild(saveButton)
console.log (saveButton)

// LOAD VORES DATA
function getData(){
    let data = localStorage.getItem('husk')
    let parsedData =JSON.parse(data)
    return parsedData
}
function createInput (obj_data){

    let inputElement = document.createElement("Input")
    if(obj_data){
        inputElement.id = obj_data.id
        inputElement.value = obj_data.value
    }
    else{
        inputElement.id = crypto.randomUUID()
    }
}