// HER LAVER VI LOADDATA

// LOAD VORES DATA
function getData(){
    let data = localStorage.getItem('husk')
    let parsedData =JSON.parse(data)
    return parsedData
}