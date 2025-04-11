// определение главных переменных и констант
var name = window.localStorage.getItem('name');
var time = 0;
var isstart = 0;
var stop_all = false;

function get_random_int(a, b){
    return Math.floor(Math.random() * (b - a)) + a;
}

class Rocket{
    constructor(){
        this.body = document.getElementsByClassName('rocket')[0];
        this.x = Math.floor(window.innerWidth / 2);
        this.body.style.left = this.x + 'px';
    }
    move(event){
        event.preventDefault();
    switch (event.key.toLowerCase()) {
        case 'escape':
            if (stop_all == true){
                stop_all = false;
            }else{
                stop_all = true;
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
            }
        }
        this.body.style.left = this.x + 'px';
    }
    check_collision(){
    }
}

class Meteor{
    constructor(){
        this.body = document.getElementsByClassName('meteor')[0];
        this.x = get_random_int(200, window.innerWidth);
        this.body.style.left = this.x + 'px';
        this.y = 0;
        this.body.style.top = this.y + 'px';
        this.speed = 11;
    }
    move_meteor(){
        if ( isstart && !stop_all){
            this.y += this.speed;
            this.body.style.top = this.y + 'px';
        }
    }
}
class Money{
    constructor(){
        this.body = document.getElementsByClassName('money')[0];
        this.x = get_random_int(200, window.innerWidth);
        this.body.style.left = this.x + 'px';
        this.y = -100;
        this.body.style.top = this.y + 'px';
        this.speed = 9;
    }
    move_money(){
        if ( isstart && !stop_all){
            this.y += this.speed;
            this.body.style.top = this.y + 'px';
        }
    }
}


var player = new Rocket();
var move_meteor = 0;
var make_meteors = setInterval( ()=> {
    while (document.getElementsByClassName('meteor').length > 0){
        document.getElementsByClassName('meteor')[0].remove();
    }
    let element = document.createElement('div');
    element.className = 'meteor';
    document.body.getElementsByClassName('arena')[0].append(element);
    move_meteor = 0;
    var met = new Meteor();
    move_meteor = setInterval(function () {met.move_meteor()}, 17);
}, 2000);

var make_money = setInterval( ()=> {
    while (document.getElementsByClassName('money').length > 0){
        document.getElementsByClassName('money')[0].remove();
    }
    let element = document.createElement('div');
    element.className = 'money';
    document.body.getElementsByClassName('arena')[0].append(element);
    move_meteor = 0;
    var met = new Money();
    move_meteor = setInterval(function () {met.move_money()}, 17);
}, 2000);

document.addEventListener('keydown', (e) => {player.move(e)});