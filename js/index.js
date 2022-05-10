window.addEventListener('load', function() {
    let focus = document.querySelector('.focus');
    let arrow_l = document.querySelector('.arrow_l');
    let arrow_r = document.querySelector('.arrow_r');
    let focusUl = focus.querySelector('ul');
    let ol = focus.querySelector('.circle');
    //轮播图功能
    //功能一 鼠标移到focus出现向左向右按钮，功能七开关定时器
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer); //清除定时器
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //重启定时器
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000)
    });

    function clearCircle() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].style.backgroundColor = 'transparent';
        }
    };
    //功能二 点击某个小圆圈 使其背景色改变为白色，其他小圆圈背景色改成透明，排他思想
    for (let i = 0; i < focusUl.children.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('date-index', i); //添加自定义属性，使小圆圈与图片移动关联
        ol.appendChild(li);
        ol.children[i].addEventListener('click', function() {
            clearCircle();
            this.style.backgroundColor = '#fff';
            //功能三 点击小圆圈出现对应的图片
            let index = this.getAttribute('date-index');
            animation(focusUl, -index * focus.offsetWidth);
            num = circle = index; //让小圆圈及按钮的索引号等于图片索引号
        })
    }
    let first = focusUl.children[0].cloneNode('true');
    focusUl.appendChild(first);
    //功能四 点击向左向右按钮，图片移动
    let num = 0;
    let circle = 0;
    let flag = true;
    arrow_r.addEventListener('click', function() {
            if (flag) {
                flag = false;
                if (num == focusUl.children.length - 1) { //走到最后一张重复图片
                    focusUl.style.left = '0';
                    num = 0;
                }
                num++;
                animation(focusUl, -num * focus.offsetWidth, function() {
                    flag = true;
                });
                //功能五 点击向右播放按钮，下部小圆圈向右移动一个
                circle++;
                if (circle == ol.children.length) {
                    circle = 0; //让小圆圈的索引号等于第一个
                }
                clearCircle();
                ol.children[circle].style.backgroundColor = '#fff';
            }
        })
        //左侧按钮部分
    arrow_l.addEventListener('click', function() {
            if (falg) {
                flag = false;
                if (num == 0) {
                    num = focusUl.children.length - 1;
                    focusUl.style.left = -num * focus.offsetWidth + 'px';
                }
                num--;
                animation(focusUl, -num * focus.offsetWidth, function() {
                    flag = true;
                });
                //功能五 点击向左播放按钮，下部小圆圈向左移动一个
                circle--;
                if (circle < 0) {
                    circle = ol.children.length - 1; //让小圆圈的索引号等于最后一个
                }
                clearCircle();
                ol.children[circle].style.backgroundColor = '#fff';
            }
        })
        //功能六 轮播效果
    let timer = setInterval(function() {
        arrow_r.click();
    }, 2000)


    ol.children[0].style.backgroundColor = '#fff';
    //电梯导航定位功能
    let fixedtool = this.document.querySelector('.fixedtool');
    let footer = this.document.querySelector('.footer');
    let fixedtoolHeight = fixedtool.offsetHeight;
    let footerHeight = footer.offsetHeight;
    let pageHeight = document.body.scrollHeight; //网页高度
    let repetitiveHeight = footerHeight - fixedtoolHeight; // 重复部分的高
    //需要网页被卷曲的顶部=整个网页的高-footer的高-网页可视区域的高+重复部分的高（footer的高-fixedtool的高）
    this.document.addEventListener('scroll', function() {
        let pageClientHeight = document.documentElement.clientHeight //网页可视区域的高
        let pageNeedY = pageHeight - footerHeight - pageClientHeight + repetitiveHeight;
        if (window.pageYOffset > pageNeedY) {
            fixedtool.style.position = 'absolute';
            fixedtool.style.top = pageNeedY + 320 + 'px'; //需要停留的位置就是网页需要被卷去的头部+其距离屏幕顶部的距离
        } else {
            fixedtool.style.position = 'fixed';
            fixedtool.style.top = '320px'
        }
    })
})