// HER LÆGGER VI ALLE JAVASCRIPT FILES SAMMEN

let mainContainer =document.getElementById("mainContainer")








// SAVE BUTTON
let saveButton = document.createElement("button")
saveButton.innerText ='Save'
saveButton.addEventListener("click", saveData)
mainContainer.appendChilds(saveButton)
console.log ("saveButton")