function animation(obj, location, callBack) {
    clearInterval(obj.move);
    obj.move = setInterval(function() {
        let X = obj.offsetLeft;
        let step = (location - X) / 10;
        //正数步长值需要向上取整，负数步长值向下取整；
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (X == location) {
            clearInterval(obj.move);
            // if (callBack) {
            //     callBack();
            // }
            callBack && callBack();
        } else {
            obj.style.left = X + step + 'px';
        }
    }, 15)
}