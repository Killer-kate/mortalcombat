// TASK 0
let player1 = {
    name: "XIAO",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["Двуручный", "Одноручный", "Лук", "Копьё", "Книга"],
    atack: (function () {
        console.log(player1.name + " Fight...");
    })
};
let player2 = {
    name: "MIKO",
    hp: 80,
    img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
    weapon: ["Двуручный", "Одноручный", "Лук", "Копьё", "Книга"],
    atack: (function () {
        console.log(player2.name + " Fight...");
    })
};

// TASK 1
function createPlayer(classList, charName, life, img) {
    // Создание элементов, поик класса
    const $player = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $img = document.createElement('img');
    const $arenas = document.querySelector('.arenas');
    // Добавление классов для блоков
    $player.classList.add(classList);
    $progressbar.classList.add('progressbar');
    $character.classList.add('character');
    $life.classList.add('life');
    $name.classList.add('name');
    $img.src = img;

    $life.style.width = life + '%';
    $name.innerText =  charName;

    $arenas.appendChild($player);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
}

// TASK 2
createPlayer('player1', player1.name, 50, player1.img);
createPlayer('player2', player2.name, 80, player2.img);