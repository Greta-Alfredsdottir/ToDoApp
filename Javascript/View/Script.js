// HER LÆGGER VI ALLE JAVASCRIPT FILES SAMMEN

// #region GLOBALS
const contentSection = document.getElementById("mainContainer");
let currentData=null;
// #endregion

initApp()

// #region MODEL CODE
function getData(){
    console.log('getData');

    return JSON.parse(localStorage.getItem("toDoApp_v1"));
}
function saveData(myData){
    console.log('saveData');
    let serializesData=JSON.stringify(myData) // ingen gåseben, det er en functions parameter

    localStorage.getItem("toDoApp_v1", serializesData);
}
function makeNewData(){
    console.log('makeNewData');
    //DUMMY DATA, HUSK AT TØMME LISTER INDEN DEPLOYMENT
    let newData={
        darkMode:false,
        lists:[ //dataobject
            {
                listName:"list 1",
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

// #endregion

// #region CONTROLLER CODE , (den skal skrives først)
function initApp(){
    console.log('initApp');
    
    // hent data
    currentData=getData();
    //EVLUAER DATA
    if (currentData==null) {
        //VI HAR IKKE DATA

        currentData = makeNewData()
        saveData(currentData)
    } 

        // VIS DATA TIL USER
        makeListView(currentData)

}

// #endregion
// #region VIEW CODE
function makeListView(data){
    console.log('makeListView');
    //VIS DATA TIL BRUGER
    console.log(data);

    //tøm contentsection
    contentSection.innerHTML='';
    data.lists.forEach ((list,index) => {
    

    let listContainer = document.createElement('div')
// vis liste
listContainer.innerHTML=`<h2 onclick="listViewCallBack('showlist',${index})">${list.listName}</h2>
<button>Delete</button>
<button>Edit</button>`

    contentSection.appendChild(listContainer)
    });

}

// #endregion

















// // GLOBAL VARIABLE
// let mainContainer =document.getElementById("mainContainer")
// let objData = getData()
// // let obj = {}

// // CREATE BUTTON
// let createButton = document.createElement("button")
// createButton.innerText = 'create new'

// createButton.addEventListener("click",createInput)
// mainContainer.appendChild(createButton)

// // SAVE BUTTON
// let saveButton = document.createElement("button")
// saveButton.innerText ='Save'
// saveButton.addEventListener("click", saveData)
// mainContainer.appendChild(saveButton)
// console.log (saveButton)

// // LOAD VORES DATA
// function getData(){
//     let data = localStorage.getItem('husk')
//     let parsedData =JSON.parse(data)
//     return parsedData
// }
// function createInput (obj_data){

//     let inputElement = document.createElement("Input")
//     if(obj_data){
//         inputElement.id = obj_data.id
//         inputElement.value = obj_data.value
//     }
//     else{
//         inputElement.id = crypto.randomUUID()
//     }
// }
// function saveData(){
//     let data = localStorage.saveItem('husk')
//     let parsedData =JSON.parse(data)
//     return parsedData
// }