import {getData} from './data.js';
getData(16801);
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
const addCityBtn = document.getElementById('addcity');

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
    const datePlusOne = Date.parse(`${y}/${m}/${d}`) + 86400000;
    const newDate = new Date(datePlusOne); 
    const newString = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`; 
    
    dateSpan.innerText = newString;
})
function piss(){console.log("piss")}
//move hour
//TODO copy the horizontal bar and the details button to the new current hour when the button is clicked
const changeHourLeftBtn = document.getElementById('clima').getElementsByClassName('lb')[0];
const changeHourRightBtn = document.getElementById('clima').getElementsByClassName('rb')[0];

changeHourLeftBtn.addEventListener('click', () => {
    const hours = document.querySelectorAll('.hour');
    const current = document.getElementsByClassName('current')[0];
    const nextCurrent = hours[Math.ceil(hours.length/2)];
    const oldDetailsBtn = current.querySelector('.popcontainer');
    const handleClick = () => {
        const popover = document.getElementById('detalles').nextSibling.nextSibling;
        showDetails(popover);
    }
    
    current.classList.remove('current');
    nextCurrent.classList.add('current');

    nextCurrent.insertBefore(current.querySelector('hr'), nextCurrent.querySelector('.data'));
    nextCurrent.insertBefore(oldDetailsBtn.cloneNode(true), nextCurrent.firstChild);

    hours.forEach((hour, index)=>{
        hour.classList.add('movingleft');
        hour.addEventListener('transitionend', () => {
            const toClone = index != hours.length-1 ? hours[index+1] : hours[0];
            const newDetailsBtn = document.getElementById('detalles'); 

            toClone.classList.remove('movingleft');
            hour.replaceWith(toClone.cloneNode(true));
            oldDetailsBtn.replaceWith(document.createElement('null'));
            newDetailsBtn.removeEventListener('click', handleClick);
            newDetailsBtn.addEventListener('click', handleClick);
        }, {once: true})
    });

})
changeHourRightBtn.addEventListener('click', () => {
    const hours = document.querySelectorAll('.hour');
    const current = document.getElementsByClassName('current')[0];
    const nextCurrent = hours[Math.floor(hours.length/2)-1];
    const oldDetailsBtn = current.querySelector('.popcontainer');
    const handleClick = () => {
        const popover = document.getElementById('detalles').nextSibling.nextSibling;
        showDetails(popover);
    }
    
    current.classList.remove('current');
    nextCurrent.classList.add('current');

    nextCurrent.insertBefore(current.querySelector('hr'), nextCurrent.querySelector('.data'));
    nextCurrent.insertBefore(oldDetailsBtn.cloneNode(true), nextCurrent.firstChild);

    hours.forEach((hour, index)=>{
        hour.classList.add('movingright');
        hour.addEventListener('transitionend', () => {
            const toClone = index != 0 ? hours[index-1] : hours[hours.length-1];
            const newDetailsBtn = document.getElementById('detalles'); 

            toClone.classList.remove('movingright');
            hour.replaceWith(toClone.cloneNode(true));
            oldDetailsBtn.replaceWith(document.createElement('null'));
            if(newDetailsBtn){
                newDetailsBtn.removeEventListener('click', handleClick);
                newDetailsBtn.addEventListener('click', handleClick);
            }
        }, {once: true})
    });
})
//view details
const detailsBtn = document.getElementById('detalles');
detailsBtn.addEventListener('click', () => {
    const popover = detailsBtn.nextSibling.nextSibling;
    showDetails(popover);
})

function showDetails(popover){
    if(popover.getAttribute('hidden') === ""){
        popover.removeAttribute('hidden');
    }
    else{
        popover.setAttribute('hidden', "");
    }
}

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
