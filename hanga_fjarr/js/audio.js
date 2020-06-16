class AudioController {
    constructor() 
    {
        this.correctSound = new Audio('audio/171697__nenadsimic__menu-selection-click.wav')
        this.wrongSound = new Audio('audio/67454__splashdust__negativebeep.wav')
        this.bgMusic = new Audio('audio/488114__doctor-dreamchip__tchaikovsky-oktober-korg-minilogue-xd-remix.wav')
        this.bgMusic.volume = 0.5
        this.wrongSound.volume = 0.8
        this.bgMusic.loop = true
    }

    startMusic() 
    {
        this.bgMusic.play()
    }

    stopMusic() 
    {
        this.bgMusic.pause()
        this.bgMusic.currentTime = 0
    }

    playCorrect() {
        this.correctSound.play()
    }

    playWrong() {
        this.wrongSound.play()
    }
}