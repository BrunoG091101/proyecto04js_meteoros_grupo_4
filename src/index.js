import Escena1 from './model/Escena1.js'
import GameOver from './model/GameOver.js';
import Victoria from './model/Victoria.js';
let config={
    type:Phaser.AUTO,
    width:800,
    height:600,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:0},
            debug:false
        }
    },
    scene:[Escena1,GameOver,Victoria]
};
let game = new Phaser.Game(config);