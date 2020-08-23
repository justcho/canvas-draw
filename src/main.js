
let eraser = document.getElementById("eraser");
let brush = document.getElementById("brush");
let reSetCanvas = document.getElementById("clear");
let aColorBtn = document.getElementsByClassName("color-item");
let save = document.getElementById("save");
getColor();
let clear = false

let canvas = document.getElementById("draw-board");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.storkStyle = "none";
ctx.lineWidth = 10;
ctx.lineCap = "round";

let painting = false;
let last;

const isTouchDevice = "ontouchstart" in document.documentElement
if (isTouchDevice) {
  canvas.ontouchstart = e => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    last = [x, y];
  };
  canvas.ontouchmove = e => {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    drawLine(last[0], last[1], x, y);
    last = [x, y];
  };
} else {
  canvas.onmousedown = e => {
    painting = true;
    last = [e.clientX, e.clientY];
  };

  canvas.onmousemove = e => {
    if (painting === true) {
      drawLine(last[0], last[1], e.clientX, e.clientY);
      last = [e.clientX, e.clientY];
    }
  };

  canvas.onmouseup = () => {
    painting = false;
  };
}



function drawLine(x1, y1, x2, y2) {
  if (clear) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.restore();
  }else{
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

  }
}

eraser.onclick = function () {
  clear = true;
  this.classList.add("active");
  brush.classList.remove("active");
};
brush.onclick = function () {
  clear = false;
  this.classList.add("active");
  eraser.classList.remove("active");
};
reSetCanvas.onclick = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

};
save.onclick = function () {
  let imgUrl = canvas.toDataURL("image/png");
  let saveA = document.createElement("a");
  document.body.appendChild(saveA);
  saveA.href = imgUrl;
  saveA.download = "zspic" + (new Date).getTime();
  saveA.target = "_blank";
  saveA.click();
};

function getColor(){
  for (let i = 0; i < aColorBtn.length; i++) {
    aColorBtn[i].onclick = function () {
      for (let i = 0; i < aColorBtn.length; i++) {
        aColorBtn[i].classList.remove("active");
        this.classList.add("active");
        activeColor = this.style.backgroundColor;
        ctx.fillStyle = activeColor;
        ctx.strokeStyle = activeColor;
      }
    }
  }
}



