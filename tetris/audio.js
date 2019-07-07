class AudioController {
    constructor() 
    {
        this.bgMusic = new Audio('audio/443128__sirkoto51__boss-battle-loop-3.wav');
        this.flipSound = new Audio('audio/rotate.mp3');
        this.rowSound = new Audio('audio/row.wav');
        this.dropSound = new Audio('audio/drop.wav');
        this.bgMusic.volume = 0.2; 
        this.bgMusic.loop = true;
        this.flipSound.volume = 0;
        this.rowSound.volume = 0;
        this.dropSound.volume = 0;
    }
    startSound() 
    {
        this.bgMusic.play();
        this.rowSound.volume = 0.5;
        this.flipSound.volume = 0.5;
        this.dropSound.volume = 0.5;
    }
    stopSound() 
    {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
        this.rowSound.volume = 0;
        this.flipSound.volume = 0;
        this.dropSound.volume = 0;
    }
    flip() 
    {
        this.flipSound.play();
    }
    row() 
    {
        this.rowSound.play();
    }
    drop()
    {
        this.dropSound.play();
    }
}