const input = document.getElementById('name');
const btn = document.getElementById('start');

function dtn_design(){
    if (input.value == ''){
        btn.style.filter = 'grayscale(1)';
        btn.disabled = true;
    }else{
        btn.style.filter = 'grayscale(0)';
        btn.disabled = false;
    }
}

function start(){
    dtn_design();
    if (btn.disabled == false){
        window.localStorage.setItem('name', input.value);
        window.open('project/pages/main.html');
    }
}

dtn_design();
input.addEventListener('input', dtn_design);
btn.addEventListener('onclick', start);
btn.addEventListener('click', start);

