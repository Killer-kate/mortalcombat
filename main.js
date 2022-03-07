import{player1, player2, createPlayer, arenasBlock} from './game-objects.js';
import{ generateLogs, generateTimeString, chatBlock } from './game-create.js';
import{ getTime, getRandomNumber, createHTMLElement } from './utils.js';
import{renderPlayerWin, enemyAttack, playerAttack, showResult, createReloadButton, formFight} from './game-logic.js';
import{ATTACK, HIT,} from './constants.js';

createPlayer('player1', player1);
createPlayer('player2', player2);
generateLogs('start', player1, player2);

formFight.addEventListener('submit', (e) => {
    e.preventDefault();

    const enemy = enemyAttack();
    const attack = playerAttack();

    let damagePlayer1 = 0;
    let damagePlayer2 = 0;

    if(enemy.hit === attack.defence){
        generateLogs('defence', player2, player1, damagePlayer1);
    }else{
        damagePlayer1 = enemy.value;

        player1.changeHP(damagePlayer1);
        player1.renderHP();

        generateLogs('hit', player2, player1, damagePlayer1);
    }

    if(attack.hit === enemy.defence){
        generateLogs('defence', player1, player2, damagePlayer1);
    } else{
        damagePlayer2 = attack.value;

        player2.changeHP(damagePlayer2);
        player2.renderHP();

        generateLogs('hit', player1, player2, damagePlayer2);
    }

    showResult();
    });