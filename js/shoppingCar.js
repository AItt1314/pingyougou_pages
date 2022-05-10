$(function() {
    //功能1 全选 全部选中,再点击全部取消
    $(".checkall").change(function() {
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        getSum();
        discolor();
    });
    // 商品的选中状态影响全选按钮
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        getSum();
        discolor();
    });
    //功能2 点击减号数量价格变化
    $(".decrement").click(function() {
        let num = $(this).siblings(".itxt").val();
        num--;
        if (num <= 1) {
            num = 1;
            $(this).siblings(".itxt").val("1");
        } else {
            $(this).siblings(".itxt").val(num);
        }
        let price = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(price);
        price = price.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (price * num).toFixed(2));
        getSum();
    });
    // 功能3 点击加号数量价格变化
    $(".increment").click(function() {
        let num = $(this).siblings(".itxt").val();
        num++;
        $(this).siblings(".itxt").val(num);
        let price = $(this).parents(".p-num").siblings(".p-price").html();
        price = price.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (price * num).toFixed(2));
        getSum();
    });
    //功能4 输入数量，价格发生变化
    $(".itxt").change(function() {
            let price = $(this).parents(".p-num").siblings(".p-price").html();
            price = price.substr(1);
            //输入的为空或负数，转化为1
            if ($(this).val() == "" || $(this).val() < 0) {
                $(this).val(1);
            };
            //输入的不是整数转化为整数
            if (Number($(this).val()) % 1 !== 0) {
                $(this).val(parseInt(Number($(this).val())));
            }
            let num = $(this).val();
            $(this).parents(".p-num").siblings(".p-sum").html("￥" + (price * num).toFixed(2));
            getSum();
        })
        // 功能五 底部小计数量合计,价格合计
    function getSum() {
        let sunN = 0;
        let sumP = 0;
        //购物车里有商品且商品被选中才进行计算，否则直接合计为0
        if ($(".cart-item").length != 0 && $(".j-checkbox:checked").length != 0) {
            $(".j-checkbox:checked").parents(".cart-item").find(".itxt").each(function(i, docEle) {
                sunN += parseFloat($(docEle).val());
                $(".amount-sum em").html(sunN);
            });
            $(".j-checkbox:checked").parents(".cart-item").find(".p-sum").each(function(i, docEle) {
                sumP += parseFloat($(docEle).text().substr(1));
                $(".price-sum em").html('￥' + sumP.toFixed(2));
            })
        } else {
            $(".amount-sum em").html(sunN);
            $(".price-sum em").html('￥' + sumP.toFixed(2));
        }
    };
    getSum(); //在页面加载的时候，先执行一次函数
    // 功能六 删除按钮功能
    //1右侧删除
    $(".p-action").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //底部删除所选
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    });
    //功能七 被选中的商品栏背景色变色
    function discolor() {
        if ($(".j-checkbox:checked").length != 0) {
            $(".j-checkbox:checked").parents(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    }
})