// #region CONTROLLER CODE , (den skal skrives først)
// 5. Update initApp to apply dark mode on startup
import{makeListView} from "../View/view.js";
import {applyDarkMode} from "../View/view.js";
import {getData} from "../Model/model.js";
import{saveData} from "../Model/model.js";
import{makeNewData} from "../Model/model.js";

let currentData=null; // dette holder på alle lister og opgaver.

export function initApp(){
    console.log('initApp');
    currentData=getData(); // initapp beder "getdata" at hente data
     //EVLUAER DATA
    if (currentData==null) {
        //VI HAR IKKE DATA
        currentData = makeNewData()
        saveData(currentData)
    }
    applyDarkMode(currentData.darkMode); 
    // VIS DATA TIL USER
    makeListView(currentData)
}
