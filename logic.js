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
    stl.innerHTML =
        'table {min-width: 500px; min-height: 500px; text-align: center;} table tbody tr td {    border: 1px solid black;}';

    window.X = 0;
    window.Y = 0;
    window.bX = 0;
    window.bY = 0;
    window.mX = maxX - 1;
    window.mY = maxY - 1;
    window.score = 0;

    //Спавн еды
    window.overGame = setInterval(function getMoreFood() {
        let rXint = Math.round(0 - 0.5 + Math.random() * (window.mX - 0 + 1));
        let rYint = Math.round(0 - 0.5 + Math.random() * (window.mY - 0 + 1));
        let tab = document.querySelector('body > table > tbody').children[rXint].children[rYint];
        if (tab.style.backgroundColor !== 'red' && tab.style.backgroundColor !== 'yellow' && tab.style
            .backgroundColor !== 'orange') {
            tab.style.backgroundColor = 'yellow';
        }
    }, 2000)

    //Движение
    document.onkeydown = function (a) {
        document.querySelectorAll('body > table > tbody')[0].children[window.X].children[window.Y].style
            .backgroundColor = '';

        if (a.key == 'a') {
            window.bX = window.X;
            window.bY = window.Y;
            window.Y <= 0 ? window.Y = window.mY : window.Y--;
        }
        if (a.key == 'd') {
            window.bX = window.X;
            window.bY = window.Y;
            window.Y >= window.mY ? window.Y = 0 : window.Y++;
        }
        if (a.key == 'w') {
            window.bX = window.X;
            window.bY = window.Y;
            window.X <= 0 ? window.X = window.mX : window.X--;
        }
        if (a.key == 's') {
            window.bX = window.X;
            window.bY = window.Y;
            window.X >= window.mX ? window.X = 0 : window.X++;
        }

        //Логика: Еда и Враги
        if (document.querySelectorAll('body > table > tbody')[0].children[window.X].children[window.Y].style
            .backgroundColor == 'yellow') {
            document.querySelectorAll('body > table > tbody')[0].children[window.bX].children[window.bY]
                .style.backgroundColor = 'orange';
            window.score++
        }
        if (document.querySelectorAll('body > table > tbody')[0].children[window.X].children[window.Y].style
            .backgroundColor == 'orange') {
            clearInterval(window.overGame);
            document.onkeydown = null;
            alert('Game over!!! Youre Score: ' + window.score);
            location.reload();
        }
        document.querySelectorAll('body > table > tbody')[0].children[window.X].children[window.Y].style
            .backgroundColor = 'red';
    }
}

window.onload = start(15, 15);