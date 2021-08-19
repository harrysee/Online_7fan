
const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d"); //2d로 pixel을 컨트롤한다.
const colors = document.querySelectorAll('.jsColor');
const range = document.getElementById('jsRange');

//canvas를 js에서 사용하기 위해 pixel사이즈를 설정해준다.
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.strokeStyle = "#2c2c2c"; //이 context 안에 있는 모든 선들은 이 색을 갖는다.
ctx.lineWidth = 2.5; //라인의 너비

let painting = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX; //현재 x 좌표 설정
    const y = event.offsetY; //현재 y 좌표
    
    if(painting==false){ //false일 때는 마우스를 움직이는 내내 길을 만들고 시작좌표를 업그레이드한다.
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{ //true일 때는 마우스를 움직이는 내내 끝좌표를 만들고 선을 이어나간다.
        console.log("creating path in",event);
        ctx.lineTo(x, y); 
        ctx.stroke();
    }
}

function changeColorClick(event){
    const color = event.target.style.color;
    ctx.strokeStyle=color;
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}

//colors들을 배열로 바꾸고 그 배열 하나하나에 이벤트리스너를 설정
//color이름들은 배열들을 대표하는 이름일 뿐이다.
Array.from(colors).forEach(color => color.addEventListener("click",changeColorClick));

//선의 굵기 조정
range.addEventListener("change", function (){
            ctx.lineWidth = range.value;
});

//canvas 내용을 지운 뒤 백그라운드 컬러 바꾸기
jsMOde.addEventListener('click',function(){
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.background=ctx.strokeStyle;
});

//canvas 저장하기
jsSave.addEventListener('click',function (){
    let dataURL = canvas.toDataURL('image/png');
    dataURL = dataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
    dataURL = dataURL.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

    var aTag = document.createElement('a');
    aTag.download = 'canvas.png';
    aTag.href = dataURL;
    aTag.click();
});

