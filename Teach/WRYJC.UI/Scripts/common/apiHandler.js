var core = (function () {
    var processing = false;
    function dataExchange(url, data, beforeHandler, afterHandler, async, errorHandler, dataType, method, timeout) {
        function ajax(url, data, beforeHandler, afterHandler, async, errorHandler, dataType, method, timeout) {

            $.ajax({
                url: url,
                dataType: dataType || "json",
                async: async,
                type: method || "post",
                data: data || {},
                beforeSend: function (jqXHR, settings) {
                    if (processing) {
                        jqXHR.abort();
                    } else {
                        processing = true;
                    }

                    if (!utilities.Common.isEmpty(timeout)) {
                        $.ajaxSetup({ timeout: timeout || 5000 });
                    }

                    var b = {};
                    if (utilities.Common.isFunction(beforeHandler) && !utilities.Common.isEmpty(data)) {
                        b = beforeHandler(data);
                    } else {
                        b.bValue = true;
                    }
                    if (!b.bValue) {
                        processing = false;
                        alert(b.Message);
                        jqXHR.abort();
                    }
                },
                complete: function (jqXHR, textStatus) {
                    processing = false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //默认错误处理函数
                    processing = false;
                    function _errorHandler(msg) {
                        alert(msg);
                    }

                    if (async) {
                        if (utilities.Common.isFunction(errorHandler)) {
                            errorHandler(jqXHR, textStatus, errorThrown);
                        } else {
                            _errorHandler(errorThrown);
                        }
                    } else {
                        ret = "error:" + errorThrown;
                    }
                },

                success: function (data, textStatus, jqXHR) {
                    //请求成功后的处理
                    processing = false;

                    if (data["Type"] === "Script") {
                        eval(data["Msg"]);
                    } else {
                        if (myAsync) {
                            if (utilities.Common.isFunction(afterHandler)) {
                                afterHandler(data);
                            } else {
                                if (dataType === "String") {
                                    alert(data["Msg"]);
                                } else {
                                    alert(data);
                                }
                            }
                        } else {
                            ret = data;
                        }
                    }
                }
            });
        }
        /*****************Init parameters begin***************************/
        var ret = null;
        /****************Send data to server begin**********************/
        var myAsync = typeof async === "undefined" || async == null ? true : async;

        if (typeof utilities === "undefined") {
            $.getScript("/Scripts/common/utilities.js", function (script, textStatus, jqxhr) {
                ajax(url, data, beforeHandler, afterHandler, myAsync, errorHandler, dataType, method, timeout);
            });
        } else {
            ajax(url, data, beforeHandler, afterHandler, myAsync, errorHandler, dataType, method, timeout);
        }
        /****************Send data to server end**********************/
        return ret;
    }

    return {
        ajax: dataExchange
    };
})();