let addBtn = document.getElementById('add_btn');
let list = [];

addBtn.onclick = () => {
    list.push(document.getElementById('new_element').value);
    chrome.storage.local.set({ list: list }, function () {
        console.log("saved");
    });
    let li = document.createElement('li');
    let text = document.createTextNode(document.getElementById('new_element').value);
    li.appendChild(text);
    li.value = text;
    li.onclick = removeItem;
    document.getElementById('list').appendChild(li);
    document.getElementById('new_element').value = '';
}
var removeItem = (e) => {
    list.splice(list.indexOf(e.target.innerHTML), 1);
    e.target.parentElement.removeChild(e.target);
    chrome.storage.local.set({ list: list }, function () {
        console.log("removed");
    });
}
var loadList = () => {
    document.getElementById('list').innerHTML = '';
    chrome.storage.local.get('list', (data) => {
        data.list.forEach(element => {
            let li = document.createElement('li');
            let text = document.createTextNode(element);
            li.appendChild(text);
            li.value = text;
            li.onclick = removeItem;
            document.getElementById('list').appendChild(li);
        });
        list = data.list;
    });
}

loadList();
