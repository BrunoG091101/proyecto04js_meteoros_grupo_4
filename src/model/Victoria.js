class Victoria extends Phaser.Scene{
    constructor(){
        super('Victoria');
    }
    preload(){
        this.load.spritesheet('victoria','Public/resources/Victoria.png',{frameWidth:600,frameHeight:600});
        this.load.audio('completado','Public/resources/audio/completado.mp3');

    }
    create(){
        const victoria = this.add.sprite(0, 0, 'victoria').setOrigin(0);

        this.anims.create({
            key: 'ecenaVictoria',
            frames: this.anims.generateFrameNumbers('victoria', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.add.text(180,480,'Nivel Bonus Presionando (Space)',{fontFamily:'Impact',fontSize:'32px',fill:'#FFFFFF'});

        let completado=this.sound.add('completado',{loop:false});
        completado.play();
        
        victoria.anims.play('ecenaVictoria');
        victoria.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        
        this.input.keyboard.on('keydown-SPACE',() =>{
            this.scene.start('Ecena2');
            completado.stop();
        })
    }

}
export default Victoria;