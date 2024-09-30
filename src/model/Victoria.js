class Victoria extends Phaser.Scene{
    constructor(){
        super('Victoria');
    }
    preload(){
        this.load.spritesheet('victoria','Public/resources/Victoria.png',{frameWidth:600,frameHeight:600});
    }
    create(){
        const victoria = this.add.sprite(0, 0, 'victoria').setOrigin(0);

        this.anims.create({
            key: 'ecenaVictoria',
            frames: this.anims.generateFrameNumbers('victoria', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        victoria.anims.play('ecenaVictoria');
        victoria.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
    }

}
export default Victoria;