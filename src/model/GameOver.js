class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver"); 
    }
    init(data){
        this.puntaje=data.puntaje
    }

    preload() {
        this.load.spritesheet('final', 'public/resources/GameOverV2.png', {
            frameWidth: 626,
            frameHeight: 417
        });
        this.load.audio('gameOver','public/resources/audio/Derrota.mp3')

    }
    create() {  
        const ecenaFinal = this.add.sprite(0, 0, 'final').setOrigin(0);

        this.anims.create({
            key: 'ecenaFinal1',
            frames: this.anims.generateFrameNumbers('final', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        ecenaFinal.anims.play('ecenaFinal1');
        ecenaFinal.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height); 
        let derrota=this.sound.add('gameOver',{loop:false});
        derrota.play();

        this.add.text(320,400,'Puntaje :'+ this.puntaje ,{fontFamily:'Impact',fontSize:'32px',fill:'#FFFFFF'});
        this.input.keyboard.on('keydown-SPACE',() =>{
            this.puntaje=0;
            this.scene.start('Escena1', { puntaje: this.puntaje });
            derrota.stop();
        })

    }
    update() {
    }
}

export default GameOver;