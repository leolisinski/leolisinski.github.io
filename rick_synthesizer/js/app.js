const c_piano = new Audio('audio/piano/c.wav')
const d_piano = new Audio('audio/piano/d.wav')
const e_piano = new Audio('audio/piano/e.wav')
const f_piano = new Audio('audio/piano/f.wav')
const g_piano = new Audio('audio/piano/g.wav')
const a_piano = new Audio('audio/piano/a.wav')
const b_piano = new Audio('audio/piano/b.wav')
const c2_piano = new Audio('audio/piano/c2.wav')

const c_violin = new Audio('audio/violin/c.wav')
const d_violin = new Audio('audio/violin/d.wav')
const e_violin = new Audio('audio/violin/e.wav')
const f_violin = new Audio('audio/violin/f.wav')
const g_violin = new Audio('audio/violin/g.wav')
const a_violin = new Audio('audio/violin/a.wav')
const b_violin = new Audio('audio/violin/b.wav')
const c2_violin = new Audio('audio/violin/c2.wav')

const c_guitar = new Audio('audio/guitar/c.wav')
const d_guitar = new Audio('audio/guitar/d.wav')
const e_guitar = new Audio('audio/guitar/e.wav')
const f_guitar = new Audio('audio/guitar/f.wav')
const g_guitar = new Audio('audio/guitar/g.wav')
const a_guitar = new Audio('audio/guitar/a.wav')
const b_guitar = new Audio('audio/guitar/b.wav')
const c2_guitar = new Audio('audio/guitar/c2.wav')

const tetris = new Audio('audio/songs/tetris_theme.wav')
const rick = new Audio('audio/songs/never_gonna_give_you_up.wav')

var current_instrument = "piano"

document.getElementById('c').addEventListener('click', () => {
    eval(`c_${current_instrument}.play()`)
})

document.getElementById('d').addEventListener('click', () => {
    eval(`d_${current_instrument}.play()`)
})

document.getElementById('e').addEventListener('click', () => {
    eval(`e_${current_instrument}.play()`)
})

document.getElementById('f').addEventListener('click', () => {
    eval(`f_${current_instrument}.play()`)
})

document.getElementById('g').addEventListener('click', () => {
    eval(`g_${current_instrument}.play()`)
})

document.getElementById('a').addEventListener('click', () => {
    eval(`a_${current_instrument}.play()`)
})

document.getElementById('b').addEventListener('click', () => {
    eval(`b_${current_instrument}.play()`)
})

document.getElementById('c2').addEventListener('click', () => {
    eval(`c2_${current_instrument}.play()`)
})

document.getElementById('tetris_button').addEventListener('click', () => {
    rick.pause()
    rick.currentTime = 0
    tetris.play()
})

document.getElementById('rick_button').addEventListener('click', () => {
    tetris.pause()
    tetris.currentTime = 0
    rick.play()
})

document.getElementById('solo_button').addEventListener('click', () => {
    rick.pause()
    rick.currentTime = 0
    tetris.pause()
    tetris.currentTime = 0
})

document.getElementById('piano_button').addEventListener('click', () => {
    current_instrument = "piano"
})

document.getElementById('violin_button').addEventListener('click', () => {
    current_instrument = "violin"
})

document.getElementById('guitar_button').addEventListener('click', () => {
    current_instrument = "guitar"
})