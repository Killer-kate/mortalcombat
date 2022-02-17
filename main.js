const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');



// TASK 0
const player1 = {
    player: 1,
    name: 'XIAO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ["Двуручный", "Одноручный", "Лук", "Копьё", "Книга"],
    atack: function(name) {
        console.log(name + ' Fight...');
    },
};
const player2 = {
    player: 2,
    name: 'MIKO',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ["Двуручный", "Одноручный", "Лук", "Копьё", "Книга"],
    atack: function(name) {
        console.log(name + " Fight...");
    },
};

function getRandom(random){
    return Math.ceil(Math.random() * random);
}

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if(className){
          $tag.classList.add(className);  
    }

    return $tag;
}


function createPlayer(playerObj) {
    // Создание элементов, поик класса
    const $player = createElement('div', 'player'+playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText =  playerObj.name;
    $img.src = playerObj.img;
    
    $progressbar.appendChild($name);
    $progressbar.appendChild($life);
    
    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);
    
    return $player;
}
    

function changeHP(player){
    const $playerLife = document.querySelector('.player'+player.player+' .life');
    if(player.hp > 0){
        player.hp -= getRandom(20);
    $playerLife.style.width = player.hp + '%';
    } else if(player.hp <= 0){
        player.hp = 0;
        $arenas.appendChild(playerLose(player.name));
        $randomButton.disabled = true;
    }
    console.log(player.hp);
}

function playerLose(name){
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + '  lose';
    return $loseTitle;
}

$randomButton.addEventListener('click', function(){
    console.log('####: Click Random Button');
    changeHP(player1);
    changeHP(player2);
    
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
// TASK 2
