class AudioController {
    constructor() 
    {
        this.bgMusic = new Audio('audio/tetris.mp3');
        this.bgMusic.volume = 0.5; 
        this.bgMusic.loop = true;
    }
    startMusic() 
    {
        this.bgMusic.play();
    }
    stopMusic() 
    {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
}