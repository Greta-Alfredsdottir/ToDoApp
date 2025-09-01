// HER HAR VI INPUT

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