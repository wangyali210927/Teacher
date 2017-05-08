
function getDealStatusName(value) {
    var dealStatusName = "";
    // alert($(DealStatus[i]).html());
    switch (value) {
        case 52:
            dealStatusName = "受理";
            break;
        case 53:
            dealStatusName = "待审";
            break;
        case 54:
            dealStatusName = "终结";
            break;
        case 55:
            dealStatusName = "归档";
            break;
        case 56:
            dealStatusName = "核实";
            break;
        case 241:
            dealStatusName = "复核";
            break;
        case 242:
            dealStatusName = "协办";
            break;
        case 243:
            dealStatusName = "待办";
            break;
        case 244:
            dealStatusName = "办结";
            break;
        case 245:
            dealStatusName = "巡查";
            break;
        case 246:
            dealStatusName = "已上报";
            break;
        case 247:
            dealStatusName = "办理中";
            break;
        default:
            dealStatusName = "其它";
            break;
    }

    return dealStatusName;
}

function getStatusName(value) {
    var text = "";
    switch (value) {
        case 1:
            text = '<span class="label label-primary">正常</span>';
            break;
        case 2:
            text = '<span class="label label-danger">删除</span>';
            break;
        case 3:
            text = '<span class="label label-warning">冻结</span>';
            break;
        default:
            text = value;
            break;
    }

    return text;
}

function ChangeAllDataEnabledInt(value) {

    var text = value ? '<span class="label label-primary">全部</span>' : '<span class="label label-default">私有</span>';

    return text;
}

function GetSexValue(value) {

    var text = "";
    switch (value) {
        case 146:
            text = "男"
            break;
        case 147:
            text = "女";
            break;
        default:
            text = value;
            break;
    }

    return text;
}

function setUserIcon(value) {
    var html = "";
    if (value === "") {
        html = '<i class="fa fa-user"></i>';
    } else {
        html = '<img alt="image" src="/System/DbFile/' + value + '">';
    }

    return html;
}

function getDictName(value, bizCode) {
    var dealStatusName = "";
    var bizDict = $("body").data("bizDict");
    if (value == null||value=="") {
        return "暂无数据";
    }
    if (value != "") {
        if (typeof bizDict === "undefined") {
            bizDict = {};
        }

        if (typeof bizDict[bizCode] === "undefined") {
            var url = "/Common/GetBizCodeJson";
            var data = { bizcode: bizCode };
            var data = core.ajax(url, data, null, null, false);
            bizDict[bizCode] = data["Type"] === "Json" ? JSON.parse(data["Msg"]) : data["Msg"];
            $("body").data("bizDict", bizDict);
        }

        for (var i = 0; i < bizDict[bizCode].length; i++) {
            if (bizDict[bizCode][i].ID == value) {
                dealStatusName = bizDict[bizCode][i].Name;
                break;
            }
        }

    }

    return dealStatusName==""?value:dealStatusName;
}

function IsUrge(value)
{
    
    var text = "";
    switch (value) {
        case true:
            text = '<span class="label label-primary">催办</span>';
            break;
        case false:
            text = '<span class="label label-warning">非催办</span>';
            break;
        default:
            text = value;
            break;
    }

    return text;
}

