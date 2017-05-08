var debug = false;
var weixin = (function () {
    function CheckWeixinEnv() {
        if (typeof ($) === "undefined") {
            if (debug) {
                alert("没有引入所必须的jquery组件");
            }
            return false;
        }

        if (typeof (wx) === "undefined") {
            if (debug) {
                alert("微信js-sdk对象缺失，请确认引入了js-sdk底层库");
            }
            return false;
        }

        return CheckDom();

    }

    function Setting() {
        return {
            debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: $(".js-WeixinJsApi input[type=hidden][name=AppId]").val(), // 必填，公众号的唯一标识
            timestamp: $(".js-WeixinJsApi input[type=hidden][name=timeStamp]").val(), // 必填，生成签名的时间戳
            nonceStr: $(".js-WeixinJsApi input[type=hidden][name=nonce]").val(), // 必填，生成签名的随机串
            signature: $(".js-WeixinJsApi input[type=hidden][name=signature]").val(),// 必填，签名，见附录1
            jsApiList: [
                "chooseImage", "previewImage", "uploadImage", "downloadImage", "translateVoice", "getNetworkType", "openLocation",
                "getLocation","closeWindow"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        }
    }

    function CheckDom() {
        if ($(".js-WeixinJsApi").length <= 0
            || $(".js-WeixinJsApi input[type=hidden][name=AppId]") <= 0
            || $(".js-WeixinJsApi input[type=hidden][name=timeStamp]").val() <= 0
            || $(".js-WeixinJsApi input[type=hidden][name=nonce]").val() <= 0
            || $(".js-WeixinJsApi input[type=hidden][name=signature]").val() <= 0) {
            if (debug) {
                alert("jssdk设置不正确");
            }
            return false;
        }

        return true;
    }

    function chooseImg() {
        var selector = ".item-choose";
        if ($(selector).length <= 0) {
            return;
        }

        $(selector).click(function (e) {
            wx.chooseImage({
                count: 9, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    if ($(".js-WeixinImageUploaded").length > 0) {
                        var qeue = [];
                        for (var i = 0; i <= localIds.length - 1; i++) {
                            qeue.unshift(localIds[i]);
                        }

                        var html = '            <div class="col-xs-6 no-padding col-sm-4 col-md-3 col-lg-2 item">';
                        html += '<div class="js-image"><div class="pos-rlt"><div class="top padder m-b-sm"><a class="pull-right js-item-remove"><i class="fa fa-trash-o i-2x text" style="color:#fff;"></i></a></div>';
                        html += '<a class="fancybox"><img src="${localId}" serverId="${serverId}" class="img-full"></a></div></div></div>';
                        upload(qeue);
                        function upload(q) {
                            var e = q.pop();
                            wx.uploadImage({
                                localId: e, // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    if (res.errMsg === "uploadImage:ok") {
                                        var temp = html.replace("${localId}", e).replace("${serverId}", res.serverId);
                                        $(".js-uploaded").append(temp);
                                        if (q.length > 0) {
                                            upload(q);
                                        } else {
                                            $(".js-item-remove").click(function (e) {
                                                var selector = $(this).parent().parent().parent().parent();
                                                $(selector).remove();
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            });
        });
    }

    //添加位置
    function getlocation() {
        var selector = ".btn_loc";
        if ($(selector).length <= 0) {
            return;
        }
        $(selector).click(function (e) {
            wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                alert('latitude');
            }, cancel: function (res) {
                alert('用户拒绝授权获取地理位置');
            },error: function (res) {
                alert('错误');
            }
        });
        })
        

    }
    ///

    function previewImg() {
        var domianName = "http://www.i170.in";
        var selector = ".js-previewImg";
        if ($(selector).length <= 0) {
            return;
        }
        var urlCollection = [];
        var images = $(selector).find("img");
        for (var i = 0; i <= images.length - 1; i++) {
            urlCollection.push(domianName + $(images[i]).attr("src"));
        }

        $(images).click(function () {

            wx.previewImage({
                current: domianName + $(this).attr("src"), // 当前显示图片的http链接
                urls: urlCollection // 需要预览的图片http链接列表
            });
        });
    }

    function ImageInit() {
        chooseImg();
        previewImg();
    }

    return {
        CheckWeixinEnv: CheckWeixinEnv,
        Options: Setting(),
        ImageInit: ImageInit
    };
})();
$(function () {
    if (weixin.CheckWeixinEnv()) {
        wx.config(weixin.Options);

        wx.error(function (res) {
            alert(res.error);
        });

        wx.ready(function () {
            weixin.ImageInit();
            weixin.getlocation();
        });
    }
});