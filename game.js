import { getRandomNumber, createHTMLElement } from './utils.js';
import { ATTACK, HIT } from './constants.js';
import Player from './game-objects.js';
import Logs from './game-create.js';

let player1;
let player2;

class Game {
    constructor({
        root,
        chat,
    }) {
        this.root = root;
        this.form = root.querySelector('.control');

        this.logs = new Logs({ chat, })
    }

    start = async() => {

        this.submitResult();

        const players = await this.lark();

        let p1 = players[getRandomNumber(players.length) - 1];
        let p2 = players[getRandomNumber(players.length) - 1];

        player1 = new Player({
            ...p1, 
            player: 1,
        });

        player2 = new Player({
            ...p2, 
            player: 2,
        });
        
        player1.createPlayer();
        player2.createPlayer();

        this.logs.generate(player1.name, player2.name);  
    }
    
    lark = async() => {
        let response = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
        .then(res => res.json());
        return response;
        };

    submitResult = () => {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            const enemy = this.enemyAttack();
            const player = this.playerAttack();

            const attackPlayer2 = this.checkPlayer2Attack(player, enemy);
            const attackPlayer1 = this.checkPlayer1Attack(player, enemy);

            this.getBattleLog(attackPlayer2, attackPlayer1);

            if (player.defence !== enemy.hit) {
                this.player1.doAttack(attackPlayer2);
                this.player2.doAttack(attackPlayer1);
            }

            if (this.player1.hp === 0 || this.player2.hp === 0) {
                this.showFightResult();
                this.createReloadButton();
            }
        })
    }

    getBattleLog = (attackPlayer2, attackPlayer1) => {
        if (attackPlayer2) {
            this.logs.hit(this.player2.name, this.player1.name, attackPlayer2, this.player1.hp);
        } else {
            this.logs.defence(this.player1.name, this.player2.name, 0, this.player1.hp);
        }

        if (attackPlayer1) {
            this.logs.hit(this.player1.name, this.player2.name, attackPlayer1, this.player2.hp);
        } else {
            this.logs.defence(this.player2.name, this.player1.name, 0, this.player2.hp);
        }
    }

    checkPlayer2Attack = (attack, enemy) => {
        if (attack.defence !== enemy.hit) {
            return enemy.value;
        } else {
            return 0;
        }
    };

    checkPlayer1Attack = (attack, enemy) => {
        if (enemy.defence !== attack.hit) {
            return attack.value;
        } else {
            return 0;
        }
    };

    showFightResult = () => {
        if (this.player1.hp === 0 && this.player2.hp === 0) {
            this.logs.draw();
            this.root.appendChild(this.showWinner());
        } else if (this.player1.hp === 0) {
            this.logs.end(this.player2.name, this.player1.name);
            this.root.appendChild(this.showWinner(this.player2.name));
        } else if (this.player2.hp === 0) {
            this.logs.end(this.player1.name, this.player2.name);
            this.root.appendChild(this.showWinner(this.player1.name));
        }
    };

    enemyAttack = () => {
        const hit = ATTACK[getRandomNumber(ATTACK.length) - 1];
        const defence = ATTACK[getRandomNumber(ATTACK.length) - 1];

        return {
            value: getRandomNumber(HIT[hit]),
            hit,
            defence,
        }
    };

    playerAttack = () => {
        const attack = {};

        for (let item of this.form) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandomNumber(HIT[item.value]);
                attack.hit = item.value;
            }

            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }

            item.checked = false;
        };

        return attack;
    };

    createReloadButton = () => {
        const $reloadWrap = createHTMLElement('div', 'reloadWrap');
        const $button = createHTMLElement('button', 'button');

        $button.innerText = 'Restart';

        $reloadWrap.appendChild($button);
        this.root.appendChild($reloadWrap);

        $button.addEventListener('click', function () {
            window.location.reload();
        })

        return $reloadWrap;
    };

    showWinner = (characterName) => {
        const $winnerTitle = createHTMLElement('div', 'winnerTitle');

        if (characterName) {
            $winnerTitle.innerText = `${ characterName } wins!`
        } else {
            $winnerTitle.innerText = Draw
        }

        return $winnerTitle;
    }
};

export default Game;
