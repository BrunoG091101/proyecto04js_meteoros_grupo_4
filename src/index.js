
import Escena1 from './model/Escena1.js'
import GameOver from './model/GameOver.js';
import Victoria from './model/Victoria.js';


import Escena2 from './model/Escena2.js';
import Inicio from './model/Inicio.js';
import Final from './model/Final.js';

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

    scene:[Inicio,Escena1,GameOver,Victoria,Escena2,Final]
};
let game = new Phaser.Game(config);

