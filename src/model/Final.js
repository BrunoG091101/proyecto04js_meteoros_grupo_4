class Final extends Phaser.Scene{
    constructor(){
        super('Final');
    }
    preload(){
        this.load.image('final1','public/resources/final.png');
        this.load.audio('finalaudio','public/resources/audio/final.mp3');
    }
    create(){
        let imagen=this.add.image(0,0,'final1').setOrigin(0);
        imagen.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        let songFinal=this.sound.add('finalaudio',{loop:false});
        songFinal.play();
    }

}
export default Final;