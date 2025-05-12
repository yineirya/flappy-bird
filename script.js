//code for canvas
var canvas = document.getElementById("canvas")
var cx = canvas.getContext("2d")
canvas.width = 1250
canvas.height = 550
//code for score and best score
var score = document.getElementById("score")
var towersPassed = 0
var best = document.getElementById("best")
var highscore = 0

if (localStorage['highscore']) {
  highscore = localStorage['highscore']
}
//code for character
var character = new Image()
character.src = "https://freepngimg.com/download/logo/109939-logo-pic-bird-flappy-free-transparent-image-hq.png"
//code for tower
var tower = new Image()
tower.src = "https://toppng.com/uploads/thumbnail/mobile-flappy-bird-version-12-sprites-the-spritersthe-tubo-de-mario-bros-11562922972p0nhwxb0og.png"

var tower_x = canvas.width
var tower_y = 200
var gap_h = 150
var gap_w = 80
var tower_speed = 6

//funtion for scrolling tower, size of tower, tower randomly spawning
function towers() {
  if (tower_x < -gap_w) {
    tower_x = canvas.width
    tower_y = (canvas.height - gap_h) * Math.random()
    towersPassed += 1
    if (towersPassed > highscore) {
      highscore = towersPassed
      localStorage['highscore'] = towersPassed
    }
  }
  cx.drawImage(tower, tower_x, 0, gap_w, tower_y)
  cx.drawImage(tower, tower_x, tower_y + gap_h, gap_w, canvas.height - tower_y - gap_h)
  if (y < tower_y || y + 50 > tower_y + gap_h) {
    if (x + 50 > tower_x && x < tower_x + gap_w) {
      gameover = true
    }
  }
  tower_x -= tower_speed
}
//code for background
var bg = new Image()
bg.src = "https://i.ytimg.com/vi/vB4Bz8Evl5A/maxresdefault.jpg"
//seam that connects both backgrounds
var seam = canvas.width
//scorlling background
function background() {
  if (seam < 0) { seam = canvas.width }
  cx.drawImage(bg, seam - canvas.width, 0, canvas.width, canvas.height)
  cx.drawImage(bg, seam, 0, canvas.width, canvas.height)
  seam -= 3
}
//code for when we press the space bar the character jumps up everytime
document.addEventListener("keydown", function(key) {
  if (key.code == "Space") {
    key.preventDefault()
    if (gameover == false) {
      speed = -9
      gravity = .7
    } else {
      tower_x = canvas.width
      speed = 0
      gravity = 0
      y = 200
      towersPassed = 0
      gameover = false
      requestAnimationFrame(draw)
    }
  }
})

document.addEventListener("touchend", function(key) {
  if (gameover == false) {
    speed = -5
    gravity = .4
  } else {
    tower_x = canvas.width
    speed = 0
    gravity = 0
    y = 200
    towersPassed = 0
    gameover = false
    requestAnimationFrame(draw)
  }
})

var x = 150
var y = 0
var gravity = 0
var speed = 0
var gameover = false
//end screen when we die
function showEndScreen() {
  var w = canvas.width
  var h = canvas.height
  cx.fillStyle = "#efdecd"
  cx.fillRect(w / 6 - 10,
    h / 4 - 10,
    2 * w / 3 + 20,
    h / 2 + 20)
  cx.fillStyle = "white"//#faebd7
  cx.fillRect(w / 6, h / 4, 2 * w / 3, h / 2)
  cx.font = "130pt 'VT323'"
  cx.textAlign = "center"
  cx.fillStyle = "#ffd4ff"//#f4c2c2
  //cx.textShadow = "red"
  cx.fillText("Game Over", w / 2, h / 2)
  cx.font = "48pt 'VT323'"
  cx.fillText("Press spacebar to fly again.", w / 2, 2 / 3 * h)

  cancelAnimationFrame(nf)
}
//new frame
var nf = 0

function draw() {
  cx.clearRect(0, 0, canvas.width, canvas.height)
  background()
  cx.drawImage(character, x, y, 50, 50)
  if (y + 20 > canvas.height) { gameover = true }
  towers()
  score.textContent = towersPassed
  best.textContent = highscore
  speed += gravity
  y = y + speed
  if (gameover == false) {
    nf = requestAnimationFrame(draw)
  } else {
    cancelAnimationFrame(nf)
    showEndScreen()
  }
}
draw()