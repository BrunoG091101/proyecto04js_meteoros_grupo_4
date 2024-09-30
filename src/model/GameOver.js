class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver"); 
    }

    preload() {
        this.load.spritesheet('final', 'Public/resources/GameOverV2.png', {
            frameWidth: 626,
            frameHeight: 417
        });
        this.load.audio('gameOver','Public/resources/audio/Derrota.mp3')

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

    }
    update() {
    }
}

export default GameOver;