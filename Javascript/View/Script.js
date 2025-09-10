// HER HAR VI VORES JAVASCRIPT FILE

// #region GLOBALS
const contentSection = document.getElementById("mainContainer");
let currentData=null;
// #endregion

initApp() // FUNCTIONSCALL TO FUNCTIONEN "INITAPP"

// #region MODEL CODE
function getData(){
    console.log('getData');

    return JSON.parse(localStorage.getItem("ToDoListApp_v1"));
}
function saveData(myData){
    console.log('saveData');
    let serializesData=JSON.stringify(myData) // ingen gåseben, det er en functions parameter

    localStorage.setItem("ToDoListApp_v1", serializesData);
}
function makeNewData(){
    console.log('makeNewData');
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
 function createInput (obj_data, saftevand){
console.log(obj_data, saftevand);
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
    
})

  }
  document.getElementById("newListButton").addEventListener("click", () => {
    createInput("Greta", "Jørgen")
  })

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
            <button class="delete-btn" data-index="${index}">Delete</button>
            <button class="edit-btn" data-index="${index}">Edit</button>
        `;

    contentSection.appendChild(listContainer)
    });
     // Add event listeners for delete buttons
     // Delete button logic
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            data.lists.splice(idx, 1); // Remove the list at idx
            saveData(data);            // Save updated data
            makeListView(data);        // Refresh the view
        });
    });
    // Edit button logic
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            const listContainer = this.parentElement;
            // Replace list name with input and save button
            listContainer.innerHTML = `
                <input type="text" value="${data.lists[idx].listName}" class="edit-input"/>
                <button class="save-edit-btn" data-index="${idx}">Save</button>
                <button class="cancel-edit-btn" data-index="${idx}">Cancel</button>
            `;
            // Save edit
            listContainer.querySelector('.save-edit-btn').addEventListener('click', function() {
                const newName = listContainer.querySelector('.edit-input').value;
                data.lists[idx].listName = newName;
                saveData(data);
                makeListView(data);
            });
            // Cancel edit
            listContainer.querySelector('.cancel-edit-btn').addEventListener('click', function() {
                makeListView(data);
            });
        });
    });

}
// 1. Create the button
const darkModeBtn = document.createElement("button");
darkModeBtn.innerText = "Toggle Dark Mode";
darkModeBtn.id = "darkModeButton";
document.body.prepend(darkModeBtn); // Add to top of body
const darkModeStyle = document.createElement("style");
darkModeStyle.innerHTML = `
  body.dark-mode {
    background: #222 !important;
    color: #eee !important;
  }
  body.dark-mode input, body.dark-mode button {
    background: #333 !important;
    color: #eee !important;
    border-color: #444 !important;
  }
`;
document.head.appendChild(darkModeStyle);
// 3. Toggle logic

darkModeBtn.addEventListener("click", () => {
    let data = getData();
    data.darkMode = !data.darkMode;
    saveData(data);
    applyDarkMode(data.darkMode);
});

// 4. Apply dark mode on load
function applyDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// 5. Update initApp to apply dark mode on startup
function initApp(){
    console.log('initApp');
    currentData=getData();
    if (currentData==null) {
        currentData = makeNewData()
        saveData(currentData)
    }
    applyDarkMode(currentData.darkMode); // <-- add this line
    makeListView(currentData)
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