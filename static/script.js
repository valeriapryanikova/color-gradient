
const alpha = 0.32
const increment = 2
var interval = 42
var flag = false
var clicks = 0

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('col-display').style.background = '#ff0000'
    setInterval(() => {
        if (document.getElementById('col-text').innerText === '#bright') forBright()
        else forNotBright()
    }, interval)
}, false)

function forBright() {
    var elem_col = document.getElementById('col-display').style.background
    rgb = getCurrColor(elem_col)
    flag = updateFlag(flag, rgb.slice(0,3))
    if (flag) {
        rgb[increaseColor(rgb)]+=increment
    } else {
        rgb[decreaseColor(rgb)]-=increment
    }
    document.getElementById('col-display').style.background = 'rgb('+rgb[0]+', '+rgb[1]+', '+rgb[2]+')'
}

function forNotBright() {
    var elem_col = document.getElementById('col-display').style.background
    rgba = getCurrColor(elem_col)
    flag = updateFlag(flag, rgba.slice(0,3))
    if (flag) {
        rgba[increaseColor(rgba)]+=increment
    } else {
        rgba[decreaseColor(rgba)]-=increment
    }
    document.getElementById('col-display').style.background = 'rgba('+rgba[0]+', '+rgba[1]+', '+rgba[2]+', '+alpha+')'
}

function getCurrColor(elem_col) {
    if (elem_col.startsWith('rgba')) return elem_col.substring(5,elem_col.length-1).split(',').map(Number)
    else return elem_col.substring(4,elem_col.length-1).split(',').map(Number)
}

function updateFlag(flag, rgb) {
    var sum = rgb.reduce((partialSum, a) => partialSum + a, 0)
    if (sum === 255 || sum === 255+255) return !flag
    else return flag
}

function decreaseColor(rgb) {
    if (rgb[0]===0) return 1
    if (rgb[1]===0) return 2
    if (rgb[2]===0) return 0
}

function increaseColor(rgb) {
    if (rgb[0]===255) return 1
    if (rgb[1]===255) return 2
    if (rgb[2]===255) return 0
}

function changeColorPalette() {
    clicks++
    if (clicks===0) {
        document.getElementById('col-text').innerText = '#bright'
        document.title = 'GRADIENT # BRIGHT'
    }
    if (clicks===1) {
        document.getElementById('col-text').innerText = '#pastel'
        document.title = 'GRADIENT # PASTEL'
        document.body.style.background = 'white'
    }
    if (clicks===2) {
        document.getElementById('col-text').innerText = '#dark'
        document.title = 'GRADIENT # DARK'
        document.body.style.background = 'black'
        clicks=-1
    }
}

function changeColor(newColor) {
    document.getElementById('col-display').style.background = newColor
}


// modal

function displayModal(btn) {
    if (btn==='help-butt') {
        document.getElementById('tip-content').innerHTML = `
        click on the text in the centre of press ENTER to change between brigh/pastel/dark gradients<br>
        click on the X button in the upper right corner or press SPACE to hide/show UI
        `
        document.getElementById('tip-modal').style.display = 'block'
    }
    if (btn==='about-butt') {
        document.getElementById('tip-content').innerHTML = `
        how and why are you here? what is wrong w/ you??<br>
        this is utterly stupid and useless but i used this to get acquainted with javascript because god knows i hate that language :)<br>
        anyway this is open source, code <a href="https://github.com/valeriapryanikova/color-gradient" target="_blank">here</a>
        `
        document.getElementById('tip-modal').style.display = 'block'
    }
}

function closeModal() {
    document.getElementById('tip-modal').style.display = 'none'
}


// on key up func

var visibility = 'none'
const speed_interval = 20

function hideUI() {
    document.getElementById('col-text').style.display = visibility
    document.getElementById('help-butt').style.display = visibility
    document.getElementById('about-butt').style.display = visibility
    if (visibility==='none') {
        visibility = 'block'
        document.getElementById('hide-butt').innerText = 'o'
    } else {
        visibility='none'
        document.getElementById('hide-butt').innerText = 'x'
    }
}

window.onkeyup = (e) => {
    if (e.key==' ' || e.code=='Space' || e.keyCode==32) hideUI()
    if (e.key=='Enter') changeColorPalette()
}
