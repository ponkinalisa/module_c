// определение главных переменных и констант
var username = window.localStorage.getItem('name');

document.getElementsByClassName('name')[0].innerHTML= 'Имя пользователя: ' + username;
var time = 0;
var isstart = 0;
var stop_all = false;

function get_random_int(a, b){
    return Math.floor(Math.random() * (b - a)) + a;
}

class Rocket{
    constructor(){
        this.money_collision = false;
        this.body = document.getElementsByClassName('rocket')[0];
        this.x = Math.floor(window.innerWidth / 2);
        this.body.style.left = this.x + 'px';
        this.y = Math.floor(window.innerHeight * 0.75);
        this.body.style.top = this.y + 'px';
        this.score = 0;
        this.height = this.body.offsetHeight - 100;
        this.width = this.body.offsetWidth;
    }
    move(event){
        event.preventDefault();
    switch (event.key.toLowerCase()) {
        case 'escape':
            if (stop_all == true){
                document.getElementsByClassName('pause')[0].style.display = 'none';
                stop_all = false;
            }else{
                if (isstart){
                    document.getElementsByClassName('pause')[0].style.display = 'block';
                    stop_all = true;
                }
            }
            break;
        case 'a':
        case 'ф':
            if (isstart && !stop_all){
                if (this.x > -100){
                    this.x = this.x - 10;
                }
            }
            break;
        case 'd': 
        case 'в':
            if (isstart && !stop_all){
                if (this.x + 10 < window.innerWidth - 270){
                    this.x = this.x + 10;
                }
            }
            break;
        case ' ':
            if (!isstart){
                isstart = 1;
                document.getElementsByClassName('start')[0].style.display = 'none';
            }
        }
        this.body.style.left = this.x + 'px';
    }
    end(){/*
        // Функция, которая отправляет результат на сервер
async function sendScoreToServer(score) {
    // Получаем текущее время в формате ISO 8601
    const timestamp = new Date().toISOString();
  
    // Данные, которые мы отправим на сервер
    const data = {
      score: score,
      timestamp: timestamp
    };
  
    try {
      // Отправка POST-запроса с использованием fetch
      const response = await fetch('http://localhost:8082/api/score', {
        method: 'POST', // HTTP-метод
        headers: {
          'Content-Type': 'application/json' // Устанавливаем тип контента как JSON
        },
        body: JSON.stringify(data) // Преобразуем объект данных в строку JSON
      });
  
      // Проверяем успешность запроса
      if (response.ok) {
        // Если запрос успешен, уведомляем пользователя
        alert('Результат успешно отправлен на сервер');
      } else {
        // Если запрос не успешен, уведомляем пользователя о неудаче
        alert('Не удалось отправить результат на сервер');
      }
    } catch (error) {
      // Обработка ошибок, если запрос не удался
      alert('Error: ' + error.message);
    }
  }
  
  // Пример использования:
  // Предположим, что результат игры = 150
  const score = 150;
  
  // Вызов функции для отправки результата игры
  sendScoreToServer(score);*/
  
        window.localStorage.setItem('time', get_time());
        window.localStorage.setItem('score', this.score);
        window.open('end.html');
        window.close();
    }
    update_score(){
        document.getElementsByClassName('score')[0].innerText = 'Счет: ' + this.score;
    }
}

class Meteor{
    constructor(){
        this.body = document.getElementsByClassName('meteor')[0];
        this.x = get_random_int(200, window.innerWidth - 270);
        this.body.style.left = this.x + 'px';
        this.y = 0;
        if (!isstart){
            this.y = -100;
        }
        this.body.style.top = this.y + 'px';
        this.speed = 11;
        this.height = this.body.offsetHeight;
        this.width = this.body.offsetWidth;
    }
    move_meteor(){
        if (isstart && !stop_all){
            this.y += this.speed;
            this.body.style.top = this.y + 'px';
            if (this.y >= player.y){
                if (check_collision(player, this, 0)){
                    this.body.remove();
                    player.end();
                };
            }
        }
    }
}
class Money{
    constructor(){
        this.body = document.getElementsByClassName('money')[0];
        this.x = get_random_int(200, window.innerWidth - 270);
        this.body.style.left = this.x + 'px';
        this.y = 0;
        if (!isstart){
            this.y = -100;
        }
        this.body.style.top = this.y + 'px';
        this.speed = 9;
        this.height = this.body.offsetHeight;
        this.width = this.body.offsetWidth;
    }
    move_money(){
        if (isstart && !stop_all){
            this.y += this.speed;
            this.body.style.top = this.y + 'px';
            if (this.y >= player.y){
                if (check_collision(player, this, 1) && !player.money_collision){
                    player.money_collision = true;
                    this.body.remove();
                    player.score += 1;
                    player.update_score();
                }
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function check_collision(a, b, n) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function get_time(){
    let min;
    let sec;
    if (Math.floor(time / 60) < 10){
        min = '0' + Math.floor(time / 60)
    }else{
        min = Math.floor(time / 60)
    }
    if (time % 60 < 10){
        sec = '0' + time % 60
    }else{
        sec = time % 60;
    }
    return min + ':' + sec;
}

function update_time(){
    if (!stop_all){
        time += 1;
    if (time >= 60){
        player.end();
    }
    let t = document.getElementsByClassName('time')[0];
    t.innerHTML = 'Время: ' + get_time();
    }
}


var player = new Rocket();
var move_meteor = 0;
var move_money = 0;
var make_meteors = setInterval( ()=> {
    if (isstart && !stop_all){
        while (document.getElementsByClassName('meteor').length > 0){
            document.getElementsByClassName('meteor')[0].remove();
        }
        let element = document.createElement('div');
        element.className = 'meteor';
        document.body.getElementsByClassName('arena')[0].append(element);
        move_meteor = 0;
        var met = new Meteor();
        move_meteor = setInterval(function () {met.move_meteor();}, 17);
    }
}, 2000);

sleep(1000).then(() =>{setInterval( ()=> {
    player.money_collision = false;
    if (isstart && !stop_all){
    while (document.getElementsByClassName('money').length > 0){
        document.getElementsByClassName('money')[0].remove();
    }
    let element = document.createElement('div');
    element.className = 'money';
    document.body.getElementsByClassName('arena')[0].append(element);
    move_meteor = 0;
    var mon = new Money();
    move_money = setInterval(function () {mon.move_money();}, 17);}
}, 2000)});

var processing_time = setInterval(update_time, 1000);
document.addEventListener('keydown', (e) => {player.move(e)});
document.getElementById('arena').addEventListener('click', (e) => {
    if (e.clientX - 100 > 0 && e.clientX + 100 < window.innerWidth && !stop_all){
    player.x = e.clientX - 50;
    player.body.style.left = player.x + 'px';
}
});