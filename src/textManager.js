function addFollowText(textposition, followText, car, camera, canvas){
    textposition.setFromMatrixPosition(car.matrixWorld);
    textposition.project(camera);
    var widthHalf = window.innerWidth/2;
    var heightHalf = window.innerHeight/2;
    var rec = canvas.getBoundingClientRect();

    textposition.x = (textposition.x * widthHalf) + widthHalf;
    textposition.y =  (textposition.y * window.innerHeight/2) + (1.6 + (0.3/594)*(1080-window.innerHeight))*(heightHalf);
    console.log(window.innerWidth);
    followText.style.top = `${textposition.y}px`;
    followText.style.left = `${textposition.x}px`;
}

function showText(followText) {
    followText.style.display = "inline-block"
}

function hideText(followText){
    followText.style.display = "none"
}
