
const btn = document.getElementById('start');
const input = document.getElementById('user');
const time = document.getElementById('time');
const score = document.getElementById('score');

function start(){
    window.open('main.html');
}

btn.addEventListener('onclick', start);
btn.addEventListener('click', start);

score.innerText = 'Счет: ' + window.localStorage.getItem('score');
time.innerText = 'Время: ' +  window.localStorage.getItem('time');
input.innerText =  window.localStorage.getItem('name');