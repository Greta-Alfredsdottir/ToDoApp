import {getData} from "../Model/model.js";
import{saveData} from "../Model/model.js";

const contentSection = document.getElementById("mainContainer");




// #region VIEW CODE
export function makeListView(data) // her exportere vi funktionen "makeListView"
{
    console.log('makeListView');
    //VIS DATA TIL BRUGER
    console.log(data);

    //tøm contentsection
    contentSection.innerHTML=''; // dette er view code
    
    data.lists.forEach ((list,index) => {
        let listContainer = document.createElement('div');
        listContainer.className = "list-row"; 

        // Opret h2 for listenavn
        const h2 = document.createElement('h2');
        h2.innerText = list.listName;
        h2.style.cursor = "pointer";
        h2.addEventListener('click', () => showListItems(index, data));
        listContainer.appendChild(h2);

        // Tilføj knapper
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "Delete";
        deleteBtn.setAttribute('data-index', index);

        const editBtn = document.createElement('button');
        editBtn.className = "edit-btn";
        editBtn.innerText = "Edit";
        editBtn.setAttribute('data-index', index);

        listContainer.appendChild(deleteBtn);
        listContainer.appendChild(editBtn);

        contentSection.appendChild(listContainer);
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
const footer = document.getElementById("mainFooter")
darkModeBtn.innerText = "Dark Mode";
darkModeBtn.id = "darkModeButton";
footer.append(darkModeBtn); // Add to top of body
const darkModeStyle = document.createElement("style");
darkModeStyle.innerHTML = `
  body.dark-mode {
    background: #B70606 !important;
    color: #eee !important;
  }
  body.dark-mode input, body.dark-mode button {
    background: #B70606 !important;
    color: #eee !important;
    border-color: #444 !important;
  }`;

document.head.appendChild(darkModeStyle);
// 3. Toggle logic

darkModeBtn.addEventListener("click", () => {
    let data = getData();
    data.darkMode = !data.darkMode;
    saveData(data);
    applyDarkMode(data.darkMode);
});

// 4. Apply dark mode on load
export function applyDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}


export function showListItems(index, data) {
    contentSection.innerHTML = `<h2>${data.lists[index].listName}</h2>`;
    const ul = document.createElement('ul');
    data.lists[index].items.forEach((item, itemIdx) => {
        const li = document.createElement('li');

        // Opret checkbox
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = item.done;
        checkbox.addEventListener('change', () => {
            item.done = checkbox.checked;
            saveData(data);
            // Du kan evt. opdatere visningen her, hvis du vil vise ✔️ eller lignende
            showListItems(index, data);
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(" " + item.name + (item.done ? " ✔️" : "")));
        ul.appendChild(li);
    });
    contentSection.appendChild(ul);

    // --- Tilføj input til nye underpunkter ---
    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "Tilføj underpunkt...";
    const addBtn = document.createElement('button');
    addBtn.innerText = "Tilføj";
    addBtn.onclick = () => {
        const value = input.value.trim();
        if (value) {
            data.lists[index].items.push({ name: value, done: false });
            saveData(data);
            showListItems(index, data); // Opdater visningen
        }
    };
    contentSection.appendChild(input);
    contentSection.appendChild(addBtn);

    // Tilføj tilbage-knap
    const backBtn = document.createElement('button');
    backBtn.innerText = "Tilbage";
    backBtn.onclick = () => makeListView(data);
    contentSection.appendChild(backBtn);
}

// #endregion
