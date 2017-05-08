var formHelper = (function () {
    var rulesDefault = (function () {
        return {
            //LicenseCode: {
            //    rangelength: [15, 15]

            //},
            //OrgCode: {
            //    rangelength: [10, 10],
            //    required:true
            //}
            //,
            RegionCode: {
                required: true,
                rangelength: [12, 12]
            },
            password: {
                required: true,
                minlength: 6
            },
            url: {
                url: true
            },
            number: {
                number: true
            },
            min: {
                required: true,
                minlength: 6
            },
            max: {
                required: true,
                maxlength: 4
            },
            digits: {
                digits: true
            },
            AppId: {
                required: true
            },
            AppSecert: {
                required: true,
                minlength: 6
            },
            Token: {
                minlength: 6
            },
            DeviceMac: {
                rangelength: [17, 17]
            },
            LoginName: {
                required: true,
                remote: {
                    type: "POST",
                    dataType: "json",
                    url: "/System/SysCheckLoginName",
                    data: {
                        LoginName: function () { return $("input[name=LoginName]").val(); }
                    }
                }
            },
            Pwd: {
                required: true,
                minlength: 6
            },

            Pwd2: {
                required: true,
                minlength: 6,
                equalTo: "input[name=Pwd]"
            }
        }
    })();
    var msgDefault = (function () {

        return {
            //LicenseCode: {
            //    rangelength: "营业执照编号长度必须为15位"
            //},
            //OrgCode: {
            //    rangelength: "组织机构代码长度必须为10位",
            //    required: "请输入组织机构代码"
            //}
            //,
            RegionCode: {
                required: "请输入区划编码",
                rangelength: "区划代码长度必须为12位"
            },
            password: {
                required: "请输入密码",
                minlength: "密码最低长度为6位"
            },
            url: {
                url: "请输入正确的URL网址"
            },
            number: {
                number: "请输入数字"
            },
            min: {
                required: "必填",
                minlength: "最少6个字符"
            },
            max: {
                required: "必填",
                maxlength: "最多4个字符"
            },
            digits: {
                digits: "请输入整数"
            },
            AppId: {
                required: "必填"
            },
            AppSecert: {
                required: "请输入密钥",
                minlength: "密钥最低长度为6位"
            },
            Token: {
                minlength: "令牌码最低长度为6位"
            },
            DeviceMac: {
                rangelength: "请填写正确的网卡地址"
            },
            LoginName: {
                required: "请输入用户名",
                remote: "该用户名已被使用"
            },
            Pwd: {
                required: "请输入密码",
                minlength: "密码最低长度为6位"
            },

            Pwd2: {
                required: "请输入密码",
                minlength: "密码最低长度为6位",
                equalTo: "两次密码输入不一致"
            }
        }
    })();
    function getFormData(form) {
        var d = {};

        if (typeof ($(form).attr("ID")) !== "undefined") {
            d["ID"] = $(form).attr("ID");
        }
        var input = $(form).find("input");
        var key = "";
        for (var i = 0; i <= input.length - 1; i++) {
            key = $(input[i]).attr("name") || "";
            if (key !== "") {
                d[key] = $(input[i]).val() || input[i].value;
            }
        }

        var select = $(form).find("select");
        for (var i = 0; i <= select.length - 1; i++) {
            key = $(select[i]).attr("name") || "";
            if (key !== "") {
                var val = $(select[i]).val();
                //防止select第一个选项无值时取得的是select的文本
                if (/^-?[1-9]\d*$/.test(val) || /([0-9]+[,]?)+/.test(val)) {
                    d[key] = typeof val !== "object" ? val : (function (v) {
                        var s = "";
                        for (var i in v) {
                            s += s !== "" ? "," + v[i] : v[i];
                        }

                        return s;
                    })(val);
                }
            }
        }

        var textArea = $(form).find("textarea");
        for (var i = 0; i <= textArea.length - 1; i++) {
            key = $(textArea[i]).attr("name") || "";
            if (key !== "") {
                d[key] = $(textArea[i]).val();
            }
        }

        return d;
    }
    function formCore(selector, checkHandler, beforeHandler, dataHandler, afterHandler, rules) {
        $(selector).validate({
            onsubmit: true,
            submitHandler: function (form) {
                try {
                    if (typeof checkHandler === "function") {
                        var b = checkHandler();
                        if (!b["bValue"]) {
                            alert(b["Message"]);
                            return;
                        }
                    }

                    var url = $(form).attr("action");
                    var nextStepUrl = $(form).attr("nextStepUrl") || "";
                    var data = typeof dataHandler === "function" ? dataHandler(form) : getFormData(form);

                    var myAfterHandler = typeof afterHandler === "function" ? afterHandler : function (d) {
                        var mydata = typeof d !== "object" ? JSON.parse(d) : d;
                        if (mydata["Success"]) {
                            success("操作成功,请稍候...");
                            if (!utilities.Common.isEmpty(nextStepUrl)) {
                                location.href = nextStepUrl;
                            }
                        } else {
                            alert(mydata["Msg"]);
                        }
                    };

                    core.ajax(url, data, beforeHandler, myAfterHandler);
                } catch (e) {
                    alert(e);
                }
            },
            rules: rules || rulesDefault,
            messages: msgDefault
        });
    }
    function initFormImplement(selector, checkHandler, beforeHandler, dataHandler, afterHandler, rules) {
        if (typeof core == "undefined") {
            $.getScript("/Scripts/common/apiHandler.js", function (script, textStatus, jqxhr) {

                $.getScript("/Scripts/plugins/validate/jquery.validate.min.js", function (script, textStatus, jqxhr) {
                    $.getScript("/Scripts/plugins/validate/messages_zh.min.js", function (script, textStatus, jqxhr) {
                        formCore(selector, checkHandler, beforeHandler, dataHandler, afterHandler, rules);
                    });
                });
            });
        } else {
            formCore(selector, checkHandler, beforeHandler, dataHandler, afterHandler, rules);
        }
    }

    function uploadCore(selector, url, option) {
        $(selector).change(function () {
            option["data"] = { "key": $(this).attr("name"), "saveto": $(selector).hasClass("db") ? "db" : "fs" };

            if (typeof $(selector).simpleUpload !== "function") {
                $.getScript("/Scripts/plugins/simpleupload/simpleUpload.min.js", function (script, textStatus, jqxhr) {
                    $(selector).simpleUpload(url, option);
                });
            } else {
                $(selector).simpleUpload(url, option);
            }
        });
    }

    function imageUpload(selector, url) {
        var tipsSelector = ".js-progress";

        var option = {};
        var previewSelector = $($(selector).parent()).find(".js-img-preview");
        //option["allowedExts"] = ["jpg", "jpeg", "png", "gif", "bmp"];
        //option["allowedTypes"] = ["image/pjpeg", "image/jpeg", "image/png", "image/x-png", "image/gif", "image/x-gif"];
        option["maxFileSize"] = 2097152;
        option["limit"] = 1;
        option["expect"] = "json";
        option["start"] = function (file) {
            if ($(tipsSelector).length <= 0) {
                $(selector).after('<span class="label label-danger js-progress">上传中</span>');
            }
        };

        option["progress"] = function (progress) {
            $(tipsSelector).html("");
            $(tipsSelector).html(progress + "%");
        }

        option["success"] = arguments[2] || function (data) {
            if (data["state"] === "SUCCESS") {
                $(tipsSelector).html("");

                var path = data["saveTo"] === "DB" ? "/System/DbFile/" + data["url"] : data["url"];
                $("input[name=" + $(selector).attr("name") + "][type=hidden]").val(data["saveTo"] === "DB" ? data["url"] : path);
                if ($(previewSelector).length <= 0) {
                    var imgHtml = '<div class="ibox-content no-padding border-left-right" style="width:160px;"><img alt="image" class="img-responsive js-img-preview" src="' + path + '"></div>';
                    $(selector).after(imgHtml);
                } else {
                    $(previewSelector).attr("src", path);
                }
                $(tipsSelector).html("");
            } else {
                $(tipsSelector).html(data["error"]);
            }
        }

        option["error"] = function (error) {
            //$(tipsSelector).html("发生错误，上传失败");
            alert(JSON.stringify(error));
        }

        var postUrl = url || "/System/FileUpload";

        uploadCore(selector, postUrl, option);
    }

    function fileUpload(selector, url, option) {
        uploadCore(selector, url, option);
    }

    return {
        data: {
            init: function () {
                var selector = ".js-form";
                if ($(selector).size() <= 0)
                    return;

                initFormImplement(selector);
            },
            initSelectorForWeixin: function () {
                var selector = ".js-weixin-form";
                if ($(selector).size() <= 0)
                    return;

                var dataHandler = function (form) {
                    var data = getFormData(form);

                    var weixinImagesSelector = ".js-uploaded";
                    if ($(weixinImagesSelector).length > 0) {
                        var uploadedImages = $(weixinImagesSelector + " img");
                        var serverImages = [];
                        for (var i = 0; i <= uploadedImages.length - 1; i++) {
                            serverImages.push({ localId: $(uploadedImages[i]).attr("src"), serverId: $(uploadedImages[i]).attr("serverId") });
                        }

                        data["serverImages"] = JSON.stringify(serverImages);
                    }

                    return data;
                }

                initFormImplement(selector, null, null, dataHandler, null);
            },
            initSelector: function (selector) {
                if ($(selector).size() <= 0)
                    return;

                initFormImplement(selector);
            },
            initSelectorWithAfterHandler: function (selector, afterHandler) {
                if ($(selector).size() <= 0)
                    return;

                initFormImplement(selector, null, null, null, afterHandler);
            },
            initSelectorWithDataHandlerAndAfterHandler: function (selector, dataHandler, afterHandler) {
                if ($(selector).size() <= 0) {
                    return;
                }
                initFormImplement(selector, null, null, dataHandler, afterHandler);
            },
            initSelectorFree: function (selector, checkHandler, beforeHandler, dataHandler, afterHandler, rules) {
                if ($(selector).size() <= 0)
                    return;

                var myRules = rules || rulesDefault;
                initFormImplement(selector, null, null, dataHandler, afterHandler);
            },

            cancelDefault: function () {
                var selector = ".js-form";
                if ($(selector).size() <= 0)
                    return;

                var preStepUrl = $(selector).attr("preStepUrl") || "";
                if (preStepUrl === "") {
                    alert("form.js:必须设置表单的preStepUrl属性");
                    return;
                }

                location.href = preStepUrl;
            },
            cancel: function (selector) {
                if ($(selector).size() <= 0)
                    return;

                var preStepUrl = $(selector).attr("preStepUrl") || "";
                if (preStepUrl === "") {
                    alert("form.js:必须设置表单的preStepUrl属性");
                    return;
                }

                location.href = preStepUrl;
            },

            getFormData: getFormData
        },
        image: {
            init: function () {
                //图片上传
                var selector = ".js-image-file";
                if ($(selector).size() <= 0) {
                    return;
                }

                var url = $(selector).attr("url");
                imageUpload(selector, url);
            },
            upload: function (selector) {
                //图片上传
                if ($(selector).size() <= 0) {
                    return;
                }

                var url = $(selector).attr("url");
                imageUpload(selector, url, arguments[1]);
            }
        },
        file: {
            init: function (selector) {
                //一般文件
                var selector = selector || ".js-file";
                if ($(selector).size() <= 0) {
                    return;
                }

                var url = $(selector).attr("url");
                uploadCore(selector, url, {});
            }
        }
    }
})();

$(function () {
    $("form").submit(function () {
        return false;
    });
    formHelper.data.init();
    formHelper.data.initSelectorForWeixin();
    formHelper.image.init();
    formHelper.file.init();
});