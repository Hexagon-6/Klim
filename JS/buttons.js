import {setData} from './data.js';
/* setData(16801)
.then(response => console.log(response)); */
//options bar
//TODO add some options
let currentCity;
const [configBtn, emptyBtn, themeBtn, updateBtn, aboutBtn, surpriseBtn] = document.getElementById('options').getElementsByTagName('button');

configBtn.addEventListener('click', () => {
    const dialog = document.getElementById('configmenu');
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
    showDetails(popover)
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
    const dialog = document.getElementById('addcitymenu');
    dialog.showModal();
})

//change date
const changeDayLeftBtn = document.getElementById('dias').getElementsByClassName('lb')[0];
const changeDayRightBtn = document.getElementById('dias').getElementsByClassName('rb')[0];

changeDayLeftBtn.addEventListener('click', () => {
    changeDay(-1);
})

changeDayRightBtn.addEventListener('click', () => {
    changeDay(1);
})

function changeDay(direction){
    const dateInput = document.getElementById('fecha');
    
    const [y, m, d] = dateInput.value.split('-');
    const datePlusOne = Date.parse(`${y}/${m}/${d}`) + (86400000 * direction);
    const newDate = new Date(datePlusOne); 
    const newString = `${newDate.getFullYear()}-${X2XX(newDate.getMonth() + 1)}-${X2XX(newDate.getDate())}`; 
    
    dateInput.value = newString;
}
function X2XX(monthOrDay){
    return monthOrDay < 10 ? `0${monthOrDay}` : monthOrDay;
}

//move hour
//FIXME error on details display
const changeHourLeftBtn = document.getElementById('clima').getElementsByClassName('lb')[0];
const changeHourRightBtn = document.getElementById('clima').getElementsByClassName('rb')[0];

changeHourRightBtn.addEventListener('click', () => {
    const hours = document.querySelectorAll('.hour');
    const current = document.getElementsByClassName('current')[0];
    console.log(current.querySelector('.time').innerText);
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
changeHourLeftBtn.addEventListener('click', () => {
    const hours = document.querySelectorAll('.hour');
    const current = document.getElementsByClassName('current')[0];
    console.log(current.querySelector('.time').innerText);
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
    const dialog = document.getElementById('configmenu');
    dialog.close();
})

//close cities menu
//TODO add city search bar
//TODO allow city selection from the list elements
const closeCitiesBtn = document.getElementById('closecitiesmenu');
closeCitiesBtn.addEventListener('click', () => {
    const dialog = document.getElementById('addcitymenu');
    dialog.close();
})

//open/close cities menu in small screen
const showHideCityMenuBtn = document.getElementById('showhidecitymenu');
showHideCityMenuBtn.addEventListener('click',  () => {
    const cityColumn = document.getElementsByClassName('cwrap')[0];
    if(cityColumn.classList.contains('showing')){
        cityColumn.classList.remove('showing');

        const ciudadesText = document.createElement('span');
        ciudadesText.innerText = "Ciudades";
        showHideCityMenuBtn.firstChild.replaceWith(ciudadesText);
    }
    else{
        cityColumn.classList.add('showing');

        const arrow = document.createElement('i');
        arrow.classList.add('fa-solid', 'fa-caret-right');
        showHideCityMenuBtn.firstChild.replaceWith(arrow);
    }
})
