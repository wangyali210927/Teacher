/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 13-4-28
 * Time: 上午11:48
 * To change this template use File | Settings | File Templates.
 */

 var utilities = (function () {
        /**
        * 初始化
        * @param object：值对象
        * @param defaultObj：默认对象
        * @return {*}：初始化后的对象
        */
        function initObj(object, defaultObj) {
            return object || defaultObj;
        }

        /**
        * 判断是否html
        * @param content 内容
        * @return {Boolean} 判断结果
        */
        function isHtml(content) {
            return content !== '' && content.substring(0, 1) === "<";
        }

        /**
        * 判断是否是Uri
        * @param content 判断内容
        * @return {Boolean} 判断结果
        */
        function isUri(content) {
            //没有实现
            return true;
        }

        /**
        * 判断是否为空
        * @param content
        * @return {Boolean}
        */
        function isEmpty(content) {
            var t = $.type(content);
            return t === "undefined" || t === "null" || t === "string" && content === "";
        }

        /**
        * 判断是否为函数
        * @param content 被判断的对象
        * @return {Boolean} 判断结果
        */
        function isFunction(content) {
            return $.type(content) === "function";
        }

        /**
         *判断是否为字符串
         * @param content 被判断的对象
         * @return {Boolean} 判断结果
         */
        function isString(content) {
            return $.type(content) === "string";
        }

        /**
         * 判断是否为数组
         * @param content 被判断的对象
         * @return {Boolean} 判断结果
         */
        function isArray(content) {
            return $.type(content) === "array";
        }

        /**
         * 判断是否为对象
         * @param content
         * @return {Boolean}
         */
        function isObject(content) {
            return $.type(content) === "object";
        }

        function changeDateFormat(time) {
            if (time != null) {
                var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                return date.getFullYear() + "-" + month + "-" + currentDate;
            }
            return "";
        }

        function changeDateFormat2(time) {
            if (time != null) {
                time = time.replace("T", " ").replace(/-/g, "/");
                var date = new Date(time);
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                return date.getFullYear() + "-" + month + "-" + currentDate;
            }
            return "";
        }

        function changeDateTimeFormat(time) {
            if (time != null) {
                var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                var currentHour = date.getHours();
                var currentMin = date.getMinutes();
                var currentSecond = date.getMilliseconds();
                return date.getFullYear() + "-" + month + "-" + currentDate;
            }
            return "";
        }

        function getDateNumber(str) {
            return getDate(str).getTime();
        }

        function getDate(str) {
            str = str.split('-');
            var date = new Date();
            date.setFullYear(str[0], str[1] - 1, str[2]);
            date.setHours(0, 0, 0, 0);
            return date;
        }

        /**
                 * 取得不含有http的uri地址
                 * @param uri
                 */
        function getActionUri(uri) {
            if (uri.indexOf('/') > -1) {
                var uriArray = uri.split('/');
                return uriArray[uriArray.length - 1];
            }

            return uri;
        }

        /**
         * 返回不含有url前缀(如http://www.scdtv.com)的相对路径
         * @param uri
         */
        function toRelateUri(uri) {
            if (!isEmpty(uri)) {
                var preSuffix = "http://" + window.location.host;
                uri = uri.replace(preSuffix, "");
                preSuffix = null;
            }

            return uri;
        }

        /*
        *取得请求对象
        *@param uri
        */
        function urlToDataObj(uri) {
            function getParamter(paramterString) {
                var paraArray = parameterString.split("&");
                var pStr = "";
                var pData = {};
                var key = "";
                var value = "";
                for (var i = 0; i < paraArray.length; i++) {
                    pStr = paraArray[i];
                    pStrArray = pStr.split("=");
                    key = pStrArray[0];
                    value = pStrArray[1];
                    pData[key] = value;
                }

                return pData;
            }

            var url = "";
            var parameterString = "";
            uri = toRelateUri(uri);
            if (uri.indexOf("?") >= 0) {
                var urlSplit = uri.split("?");
                url = urlSplit[0];
                parameterString = urlSplit[1];
            } else {
                url = uri;
            }

            if (url.substring(0, 1) === "/")
                url = url.replace("/", "");

            var parameters = url.replace(".html", "").split('/');
            var data = {};
            data["module"] = parameters[0];
            data["function"] = parameters[1];
            data["action"] = parameters[2];
            data["selector"] = parameters[3];

            if (parameters.length === 5) {
                data["node"] = parameters[4];
            }

            if (isEmpty(parameterString))
                data["data"] = getParamter(parameterString);

            return data;
        }



        /**
         * 垃圾回收
         */
        function clearMemory() {
            try {
                CollectGarbage();
            } catch (e) {
                if ($.Scdtv.Config.Common.currentModel === "Debug") {
                    alert(e);
                }
            }
        }

        return {
            Common: {
                initObj: initObj,
                isHtml: isHtml,
                isEmpty: isEmpty,
                isFunction: isFunction,
                isString: isString,
                isArray: isArray,
                isObject: isObject
            },
            DateTime: {
                changeDateFormat: changeDateFormat,
                changeDateFormat2: changeDateFormat2,
                changeDateTimeFormat: changeDateTimeFormat,
                getDateNumber: getDateNumber,
                getDate: getDate
            },
            Uri: {
                isUri: isUri,
                toRelateUri: toRelateUri,
                urlToDataObj: urlToDataObj
            },
            DocumentObject: {
                clearMemory: clearMemory
            }
        };
    })();