class Inicio extends Phaser.Scene{
    constructor(){
        super('Inicio');
    }
    preload(){
        this.load.spritesheet('Inicio','public/resources/inicio.png',{frameWidth:600,frameHeight:600});
        this.load.audio('songinicio','public/resources/audio/inicioxd.mp3')
    }
    create(){
        const victoria = this.add.sprite(0, 0, 'Inicio').setOrigin(0);

        this.anims.create({
            key: 'ecenaInicio',
            frames: this.anims.generateFrameNumbers('Inicio', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        victoria.anims.play('ecenaInicio');
        victoria.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        this.input.keyboard.on('keydown-SPACE',() =>{
            this.scene.start('Escena1');
        });
        this.add.text(340,320,'(spacio) ',{fontFamily:'Impact',fontSize:'32px',fill:'#FFFFFF'});

        let music= this.sound.add('songinicio', { loop: true });
       music.play();

       this.input.keyboard.on('keydown-SPACE',() =>{
        this.scene.start('Escena1');
        music.stop();
    })
    }
}
export default Inicio;