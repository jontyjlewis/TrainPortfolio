function addFollowText(textposition, followText, car, camera, canvas){
    textposition.setFromMatrixPosition(car.matrixWorld);
    textposition.project(camera);
    var widthHalf = canvas.width/2;
    var heightHalf = canvas.height/2;
    var rec = canvas.getBoundingClientRect();
    textposition.x = rec.left +(textposition.x * widthHalf) +  widthHalf;
    textposition.y = rec.top -(textposition.y * heightHalf) + heightHalf;
    followText.style.top = `${textposition.y}px`;
    followText.style.left = `${textposition.x}px`;
}

function showText(followText) {
    followText.style.display = "block"
}

function hideText(followText){
    followText.style.display = "none"
}