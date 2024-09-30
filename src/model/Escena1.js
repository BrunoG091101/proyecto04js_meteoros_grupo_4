export default class Escena1 extends Phaser.Scene {
    constructor() {
        super("Escena1");
        this.jugador=null;
        this.cursors=null;
        this.putaje=0;
        this.textoDePuntaje;
        this.music;
    }

    preload(){
        this.load.spritesheet('ecenario','public/resources/ecena1.png', {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.spritesheet('nave','public/resources/player1.png',{frameWidth:46.6,frameHeight:52});
        this.load.spritesheet('asteroide','public/resources/asteroide.png',{frameWidth:21.5,frameHeight:46});
        
        this.load.audio('song1','public/resources/audio/level1.mp3');
    }
    create(){
        const fondo=this.add.sprite(0,0, 'ecenario').setOrigin(0);
        this.anims.create({
            key: 'primerFondo',
            frames: this.anims.generateFrameNumbers('ecenario', { start: 0, end:5 }),
            frameRate: 10,
            repeat: -1
        });
        fondo.anims.play('primerFondo');
        fondo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        
       this.jugador=this.physics.add.sprite(300,500,'nave',1);
        this.jugador.setCollideWorldBounds(true);

        this.anims.create({
            key: 'Izquierda',
            frames: [{key:'nave',frame:0}],
            frameRate: 10,
        });
        this.anims.create({
            key: 'Centro',
            frames: [{key:'nave',frame:1}],
            frameRate: 10,
        });
        this.anims.create({
            key: 'Derecha',
            frames: [{key:'nave',frame:2}],
            frameRate: 10,
        });
        this.grupoMeteoros = this.physics.add.group(); 
        this.time.addEvent({ delay: 250, callback: this.generarMeteoros, callbackScope: this, loop: true });
        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null, this);
        this.cursors=this.input.keyboard.createCursorKeys();
        this.textoDePuntaje=this.add.text(50,100,'Puntaje:0',{fontSize:'32px',fill:'fff'});
       let music= this.sound.add('song1', { loop: false });
       music.play();
       music.on('complete', () => {
        this.scene.start('Victoria');
    });
       
    }
    update(){
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        if(this.cursors.left.isDown){
            this.jugador.setVelocityX(-300);
            this.jugador.anims.play('Izquierda');
        }else if(this.cursors.right.isDown){
            this.jugador.setVelocityX(300);
            this.jugador.anims.play('Derecha');
        }else if(this.cursors.up.isDown){
            this.jugador.setVelocityY(-300);
        } else if(this.cursors.down.isDown){
            this.jugador.setVelocityY(300);
        }
        else {
            this.jugador.anims.play('Centro');
        }
    }

    generarMeteoros() {
        this.anims.create({
            key: 'asteroide',
            frames: this.anims.generateFrameNumbers('asteroide', { start: 0, end:7 }),
            frameRate: 10,
            repeat: -1
        });
        
        const x = Phaser.Math.Between(0, 800); 
        const meteoro = this.grupoMeteoros.create(x, 0, 'asteroide'); 
        meteoro.anims.play('asteroide');
        meteoro.setVelocityY(200); 
    }

    gameOver(jugador) {
        this.physics.pause(); 
        jugador.setTint(0xff0000); 
        console.log('Game Over');
        this.scene.start('GameOver'); 
        this.sound.stopAll();
    }    
    

}