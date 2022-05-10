window.addEventListener('load', function() {
    let preview_img = this.document.querySelector('.preview_img');
    let mask = this.document.querySelector('.mask');
    let big = this.document.querySelector('.big');
    let bigImg = big.querySelector('img');
    preview_img.addEventListener('mousemove', function(e) {
        mask.style.display = 'block';
        big.style.display = 'block';
        let X = e.pageX - preview_img.offsetLeft;
        let Y = e.pageY - preview_img.offsetTop;
        let maskX = X - mask.offsetWidth / 2;
        let maskY = Y - mask.offsetWidth / 2;
        let maskMax = preview_img.offsetWidth - mask.offsetWidth;
        //鼠标移动，mask移动，mask的坐标是鼠标在盒子内的坐标；
        if (maskX < 0) {
            maskX = 0;
        } else if (maskX > maskMax) {
            maskX = maskMax;
        }
        if (maskY < 0) {
            maskY = 0;
        } else if (maskY > maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        let bigImgMax = bigImg.offsetWidth - big.offsetWidth;
        //big 移动距离:  mask/maskMax=big/bigImgMax
        bigImg.style.top = -maskY * bigImgMax / maskMax + 'px';
        bigImg.style.left = -maskX * bigImgMax / maskMax + 'px';
        console.log(e.pageY);
    })
})