import {initApp} from "../Controller/controller.js";


// #region MODEL CODE
export function getData(){ //getData(): Henter dine lister fra browserens hukommelse (localStorage).
    console.log('getData');

    return JSON.parse(localStorage.getItem("ToDoListApp_v1"));
}
export function saveData(myData){ //saveData(myData): Gemmer dine lister i browserens hukommelse.
    console.log('saveData');
    let serializesData=JSON.stringify(myData) // ingen gåseben, det er en functions parameter

    localStorage.setItem("ToDoListApp_v1", serializesData);
}
export function makeNewData(){
    console.log('makeNewData'); //makeNewData(): Laver nogle start-lister, hvis du ikke har nogen i forvejen.
    //DUMMY DATA, HUSK AT TØMME LISTER INDEN DEPLOYMENT
    let newData={
        darkMode:false,
        lists:[ //dataobject
            {
                listName:"list 1", //object
                items:[{name: "opvask", done:false},{name:"Vaske Tøj", done:true}, {name:"Vaske gulv", done:false}]
            },

             {
                listName:"Indkøb",
                items:[{name: "Kød", done:false},{name:"Salat", done:true}, {name:"Sovs", done:false}]
            }
        ]

    }
    
    //RETURN NEWDATA
    return newData;
}
//SAVEBUTTON
 export function createInput (obj_data,){ //createInput(): Viser et inputfelt og en "gem"-knap, så du kan skrive navnet på en ny liste. Når du klikker "gem", bliver listen gemt og visningen opdateres.

    
console.log(obj_data,);
    let inputContainer = document.createElement("div")
    let inputElement = document.createElement("input")
    let saveButton = document.createElement("button")
    saveButton.innerText = "gem"
      if(obj_data){
          inputElement.id = obj_data.id
          inputElement.value = obj_data.value
      }
      else{
          inputElement.id = crypto.randomUUID()
      }
      inputContainer.append(inputElement)
      inputContainer.append(saveButton)
      document.body.append(inputContainer)
saveButton.addEventListener("click", ()=>{
    let data = getData()
    data.lists.push({
        
        listName: inputElement.value,
        items: [],
    }) 
    localStorage.setItem("ToDoListApp_v1",JSON.stringify(data))
    initApp(),
    console.log(data);
    inputContainer.remove();
    console.log(data);
    
    
})

  }
  document.getElementById("newListButton").addEventListener("click", () => {
    createInput();
  })