class Ecena2 extends Phaser.Scene{
    constructor() {
        super("Ecena2");
        this.jugador=null;
        this.cursors=null;
        this.puntaje=0;
        this.textoDePuntaje=0;
        this.music;
    }
    init(data) {
        this.puntaje = data.puntaje || 0;
    }
    preload(){
        this.load.spritesheet('ecenario2','Public/resources/fondo2.png', {
            frameWidth: 200,
            frameHeight: 200
        });

        this.load.spritesheet('nave','Public/resources/player1.png',{frameWidth:46.6,frameHeight:52});
        this.load.spritesheet('asteroide','Public/resources/asteroide.png',{frameWidth:21.5,frameHeight:46});
        
        this.load.audio('song2','Public/resources/audio/level2.mp3');
    }
    create(){
        const fondo=this.add.sprite(0,0, 'ecenario2').setOrigin(0);
        this.anims.create({
            key: 'segundoFondo',
            frames: this.anims.generateFrameNumbers('ecenario2', { start: 0, end:7 }),
            frameRate: 10,
            repeat: -1
        });
        fondo.anims.play('segundoFondo');
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
       
        this.textoDePuntaje=this.add.text(50,100,'Puntaje:0',{fontFamily:'Impact' ,fontSize:'32px',fill:'#FFFFFF'});
       
        let music= this.sound.add('song2', { loop: false });
       music.play();
       music.on('complete', () => {
        this.scene.start('Final');
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
        this.puntaje+=1;
        this.textoDePuntaje.setText('Puntaje : '+this.puntaje);
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
        this.scene.start('GameOver', {puntaje:this.puntaje} ); 
        this.sound.stopAll();
    }
}
export default Ecena2;