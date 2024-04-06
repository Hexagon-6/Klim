//options bar
//TODO add some options
const [configBtn, emptyBtn, themeBtn, updateBtn, aboutBtn, surpriseBtn] = document.getElementById('options').getElementsByTagName('button');

configBtn.addEventListener('click', () => {
    dialog = document.getElementById('configmenu');
    dialog.showModal();
})


themeBtn.addEventListener('click', () => {
    const theme = document.getElementById('theme');
    if(theme.getAttribute('href') === '../CSS/styleDark.css'){
        theme.setAttribute('href', '../CSS/styleLight.css');
    }
    else{
        theme.setAttribute('href', '../CSS/styleDark.css');
    }
})


updateBtn.addEventListener('click', () => {
    window.location.href = '../HTML/index.html'
})


aboutBtn.addEventListener('click', () => {
    const popover = aboutBtn.nextSibling.nextSibling;
    if(popover.getAttribute('hidden') === ""){
        popover.removeAttribute('hidden');
    }
    else{
        popover.setAttribute('hidden', true);
    }
})

surpriseBtn.addEventListener('click', () => {
    const sorpresa = document.getElementById("sorpresa");

    sorpresa.addEventListener('animationend', () => {
        sorpresa.replaceWith(sorpresa.cloneNode());
        sorpresa.className = '';
    })
    sorpresa.focus();
    sorpresa.className = 'animated';
})

//add city
addCityBtn = document.getElementById('addcity');

addCityBtn.addEventListener('click', () => {
    dialog = document.getElementById('addcitymenu');
    dialog.showModal();
})

//change date
//TODO add manual date selection
const changeDayLeftBtn = document.getElementById('dias').getElementsByClassName('lb')[0];
const changeDayRightBtn = document.getElementById('dias').getElementsByClassName('rb')[0];

changeDayLeftBtn.addEventListener('click', () => {
    const dateSpan = document.getElementById('fecha');
    
    const [d, m, y] = dateSpan.innerText.split('/');
    const dateMinusOne = Date.parse(`${y}/${m}/${d}`) - 86400000;
    const newDate = new Date(dateMinusOne); 
    const newString = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`; 
    
    dateSpan.innerText = newString;
})

changeDayRightBtn.addEventListener('click', () => {
    const dateSpan = document.getElementById('fecha');
    
    const [d, m, y] = dateSpan.innerText.split('/');
    const dateMinusOne = Date.parse(`${y}/${m}/${d}`) + 86400000;
    const newDate = new Date(dateMinusOne); 
    const newString = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`; 
    
    dateSpan.innerText = newString;
})

//move hour
//TODO code the functionality for the buttons that move the hour columns

//view details
const detailsBtn = document.getElementById('detalles');
detailsBtn.addEventListener('click', () => {
    const popover = detailsBtn.nextSibling.nextSibling;
    if(popover.getAttribute('hidden') === ""){
        popover.removeAttribute('hidden');
    }
    else{
        popover.setAttribute('hidden', "");
    }
})

//close configuration menu
const closeConfigBtn = document.getElementById('closeconfigmenu');
closeConfigBtn.addEventListener('click', () => {
    dialog = document.getElementById('configmenu');
    dialog.close();
})

//close cities menu
//TODO add city search bar
const closeCitiesBtn = document.getElementById('closecitiesmenu');
closeCitiesBtn.addEventListener('click', () => {
    dialog = document.getElementById('addcitymenu');
    dialog.close();
})

//TODO connect to api data 
