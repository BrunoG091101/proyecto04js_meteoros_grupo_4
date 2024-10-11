class Ecena2 extends Phaser.Scene{
    constructor() {
        super("Ecena2");
        this.jugador=null;
        this.cursors=null;
        this.puntaje=0;
        this.PuntajeM = 0;
        this.textoDePuntaje=0;
        this.music;
        this.paradax1=null;
        this.paradax2=null;
        this.paradax3=null;
        this.paradax4=null;
        this.grupoBalas = null;
        this.teclaDisparo = null;
    }
    
    init(data) {
        this.puntaje = data.puntaje || 0;
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

    generarMoneda() {
        this.anims.create({
            key: 'moneda',
            frames: this.anims.generateFrameNumbers('moneda', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        const y = Phaser.Math.Between(0, 800); // Posición aleatoria en el eje X
        const moneda = this.grupoMoneda.create(800, y, 'moneda'); // Crear una moneda
        moneda.anims.play('moneda');
        moneda.setVelocityX(-100);
    }

    generarEnemigos(){
        const y = Phaser.Math.Between(0, 600); // Posición aleatoria en el eje X
        const enemigo = this.grupoEnemigos.create(800, y, 'Enemigo'); // Crear una moneda
        enemigo.setVelocityX(-100);
        enemigo.angle=90;
    }

    recogerMoneda(jugador, moneda) {
        this.PuntajeM += 1;

        this.textoMonedas.setText('Monedas: ' + this.PuntajeM);
        moneda.destroy();
    }
    shootBullet() {
        this.anims.create({
            key: 'moneda',
            frames: this.anims.generateFrameNumbers('moneda', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        const bala = this.grupoBalas.create(this.jugador.x, this.jugador.y, 'bala'); // Crear una bala
        bala.setVelocityX(300); 
        bala.anims.play('bala');
    }

    destruirEnemigo(bala, enemigo) {
        bala.destroy(); 
        enemigo.destroy(); 
        this.puntaje += 100; 
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);
    }

    preload(){
        /*this.load.spritesheet('ecenario2','Public/resources/fondo2.png', {
            frameWidth: 200,
            frameHeight: 200
        });*/
        this.load.image('parallax1','public/resources/imagen1.png');
        this.load.image('parallax2','public/resources/imagen2.png');
        this.load.image('parallax3','public/resources/imagen3.png');
        this.load.image('parallax4','public/resources/imagen4.png');


        this.load.spritesheet('nave','public/resources/player1.png',{frameWidth:46.6,frameHeight:52});
        this.load.spritesheet('asteroide','public/resources/asteroide.png',{frameWidth:21.5,frameHeight:46});
        this.load.spritesheet('moneda', 'public/resources/moneda1.png', { frameWidth: 19.75, frameHeight: 22 });
        this.load.spritesheet('bala', 'public/resources/bala.png',{frameWidth:49.43,frameHeight:32}); // Cargar la imagen de la bala

        this.load.audio('song2','public/resources/audio/musica.mp3');
    }
    create(){
        //const fondo=this.add.sprite(0,0, 'ecenario2').setOrigin(0);
        /*this.anims.create({
            key: 'segundoFondo',
            frames: this.anims.generateFrameNumbers('ecenario2', { start: 0, end:7 }),
            frameRate: 10,
            repeat: -1
        });
        fondo.anims.play('segundoFondo');
        fondo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
        */
        this.paradax1=this.add.tileSprite(0, 0, this.scale.width, this.scale.height,'parallax1');
        this.paradax1.setOrigin(0,0);
        this.paradax1.setDisplaySize(this.sys.game.config.width,this.sys.game.config.height);

        this.paradax2=this.add.tileSprite(0, 0, 577, 433,'parallax2');
        this.paradax2.setOrigin(0,0);
        this.paradax2.setDisplaySize(this.sys.game.config.width,this.sys.game.config.height);

        this.paradax3=this.add.tileSprite(0, 0, 696, 522,'parallax3');
        this.paradax3.setOrigin(0,0);
        this.paradax3.setDisplaySize(this.sys.game.config.width,this.sys.game.config.height);

        this.paradax4=this.add.tileSprite(0, 0,577 , 433,'parallax4');
        this.paradax4.setOrigin(0,0);
        this.paradax4.setDisplaySize(this.sys.game.config.width,this.sys.game.config.height);
        

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
        this.grupoMoneda = this.physics.add.group();
        this.grupoEnemigos= this.physics.add.group();
        this.grupoBalas = this.physics.add.group(); // Grupo de balas

        this.time.addEvent({ delay: 250, callback: this.generarMeteoros, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 1050, callback: this.generarMoneda, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 2000, callback: this.generarEnemigos, callbackScope: this, loop: true });

        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null, this);
        this.physics.add.collider(this.jugador, this.grupoMoneda, this.recogerMoneda, null, this);
        this.physics.add.collider(this.jugador, this.grupoEnemigos, this.gameOver, null, this);
        this.physics.add.collider(this.grupoBalas, this.grupoEnemigos, this.destruirEnemigo, null, this); // Colisión de balas con enemigos

        this.cursors=this.input.keyboard.createCursorKeys();
        this.teclaDisparo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Barra espaciadora para disparar

        this.textoDePuntaje=this.add.text(50,100,'Puntaje:0',{fontFamily:'Impact' ,fontSize:'32px',fill:'#FFFFFF'});
        this.textoMonedas = this.add.text(50, 150, 'Monedas: 0', { fontFamily: 'Impact', fontSize: '32px', fill: '#FFFF00' });

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
        this.paradax1.tilePositionX+=1;
        this.paradax2.tilePositionX+=1;
        this.paradax3.tilePositionX+=1;
        this.paradax4.tilePositionX+=1;
        if (Phaser.Input.Keyboard.JustDown(this.teclaDisparo)) {
            this.shootBullet(); // Disparar una bala
        }
    }

    
}
export default Ecena2;