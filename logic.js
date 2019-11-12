function ask_for_move(key){
    if (key == 'a' || key == 'ф') {
        window.dirmove = 'a';
        }
    if (key == 'd' || key == 'в') {
        window.dirmove = 'd';
    }
    if (key == 'w' || key == 'ц') {
        window.dirmove = 'w';
    }
    if (key == 's' || key == 'ы') {
        window.dirmove = 's';
    }
}

function auto_move() {
    if (window.dirmove == undefined) {
        window.dirmove == 'd'
    } else {
        move(window.dirmove)
    }
}

function move (key) {
    document.querySelectorAll('body > table > tbody')[0].children[window.X].children[window.Y].style.backgroundColor = '';

    if (key == 'a' || key == 'ф') {
    window.bX = window.X;
    window.bY = window.Y;
    window.Y <= 0 ? window.Y = window.mY : window.Y--;
    }
    if (key == 'd' || key == 'в') {
    window.bX = window.X;
    window.bY = window.Y;
    window.Y >= window.mY ? window.Y = 0 : window.Y++;
    }
    if (key == 'w' || key == 'ц') {
    window.bX = window.X;
    window.bY = window.Y;
    window.X <= 0 ? window.X = window.mX : window.X--;
    }
    if (key == 's' || key == 'ы') {
    window.bX = window.X;
    window.bY = window.Y;
    window.X >= window.mX ? window.X = 0 : window.X++;
    }

    logic(window.X, window.Y, window.bX, window.bY);

    document.querySelectorAll('body > table > tbody')[0].children[window.X].children[window.Y].style = 'background-color: red !important;';
}

function logic ( X, Y, bX, bY ) {
    //Еда
    if (document.querySelectorAll('body > table > tbody')[0].children[X].children[Y].style.backgroundColor == 'yellow') {
        var enemy = document.getElementById('bonus')
        if (enemy == undefined) {
            document.querySelectorAll('body > table > tbody')[0].children[X].children[Y].className = '';
            document.querySelectorAll('body > table > tbody')[0].children[bX].children[bY].style.backgroundColor = 'orange';
            document.querySelectorAll('body > table > tbody')[0].children[bX].children[bY].className = 'enemy';
            window.score++
        } else {
            clearInterval(window.feed);
            document.onkeydown = null;
            alert('Game over!!! Youre Score: ' + window.score);
            location.reload();
        }
    }

    //Враг
    if (document.querySelectorAll('body > table > tbody')[0].children[X].children[Y].style.backgroundColor == 'orange') {
        var enemy = document.getElementById('bonus')
        if (enemy == undefined) {
            clearInterval(window.feed);
            document.onkeydown = null;
            alert('Game over!!! Youre Score: ' + window.score);
            location.reload();
        } else {
            document.querySelectorAll('body > table > tbody')[0].children[bX].children[bY].className = '';
            document.querySelectorAll('body > table > tbody')[0].children[X].children[Y].style.backgroundColor == '';
            document.querySelectorAll('body > table > tbody')[0].children[X].children[Y].className = '';
            window.score++
        }
    }

    //Бонус
    if (document.querySelectorAll('body > table > tbody')[0].children[X].children[Y].style.backgroundColor == 'aqua') {
        var stl = document.createElement("style");
        document.head.append(stl);
        stl.setAttribute('id','bonus')
        stl.append('.feed {\n	background-color: orange !important;\n}')
        stl.append('.enemy {\n	background-color: yellow !important;\n}')
        setInterval(function(){
            stl.remove();
        },5000)
    }
}

function start(maxX, maxY) {
    //Поле
    var tab = document.createElement("table");
    document.body.append(tab);

    var text = '<tbody>';
    for (var a = 0; a < maxX; a++) {
    text = text + '<tr>';
    for (var b = 0; b < maxY; b++) {
    text = text + '<td> </td>';
    }
    text = text + '</tr>';
    }
    text = text + '</tbody>';
    tab.innerHTML = text;

    //CSS для поля
    var stl = document.createElement("style");
    document.head.append(stl);
    stl.append('table {\n   min-width: 500px; \n    min-height: 500px; \n   text-align: center; \n}')
    stl.append('table tbody tr td { \n border: 1px solid black;}')
    stl.append('.buttons { \n   border-radius: 35%; \n  height: 70px; \n    width: 70px; \n background-color: aqua; \n  bottom: auto; \n    text-align: center; \n}')

    //Кнопки
    if (document.body.clientWidth <= 600) {
        var btn = document.createElement("div");
        document.body.append(btn);
        btn.style = 'margin-left: ' + (document.body.clientWidth - 212)/2 + 'px; margin-top: 40px;';
        btn.innerHTML = '<div class="buttons" style="margin-left: 70px;" onclick="ask_for_move(\'w\')">W</div><div><span style="display: inline-flex;"><div class="buttons" onclick="ask_for_move(\'a\')">A</div><div class="buttons" style="margin-left: 70px;" onclick="ask_for_move(\'d\')">D</div></span></div><div class="buttons" style="margin-left: 70px;" onclick="ask_for_move(\'s\')">S</div>';
    }

    window.X = 0;
    window.Y = 0;
    window.bX = 0;
    window.bY = 0;
    window.mX = maxX - 1;
    window.mY = maxY - 1;
    window.score = 0;

    //Спавн еды №39
    window.feed = setInterval(function getMoreFood() {
        let rXint = Math.round(0 - 0.5 + Math.random() * (window.mX - 0 + 1));
        let rYint = Math.round(0 - 0.5 + Math.random() * (window.mY - 0 + 1));
        let tab = document.querySelector('body > table > tbody').children[rXint].children[rYint];
        if (tab.style.backgroundColor !== 'red' && tab.style.backgroundColor !== 'yellow' && tab.style.backgroundColor !== 'orange' && tab.style.backgroundColor !== 'aqua') {
            tab.style.backgroundColor = 'yellow';
            tab.className = 'feed';
        }
    }, 2000)

    //Спавн бонуса №40
    window.feed = setInterval(function getMoreFood() {
        let rXint = Math.round(0 - 0.5 + Math.random() * (window.mX - 0 + 1));
        let rYint = Math.round(0 - 0.5 + Math.random() * (window.mY - 0 + 1));
        let tab = document.querySelector('body > table > tbody').children[rXint].children[rYint];
        if (tab.style.backgroundColor !== 'red' && tab.style.backgroundColor !== 'yellow' && tab.style.backgroundColor !== 'orange' && tab.style.backgroundColor !== 'aqua') {
            tab.style.backgroundColor = 'aqua';
        }
    }, 10000)

    //Кнопки движения
    document.onkeydown = function (a) {
        ask_for_move(a.key);
    };

    //Авто движение
    setInterval( function() {
        auto_move();
    }, 250)
}

window.onload = function () {
    start(15, 15);
}