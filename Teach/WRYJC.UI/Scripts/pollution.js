//渲染图表
function chartHandler(element, data) {
    data = JSON.parse(data);
    $(element).each(function () {

        if ($(this).hasClass("pie-container")) {
            //饼图
            chartsHelper.Pie.init(this, data.Pie);
        } else if ($(this).hasClass("column-container")) {
            //柱状图
            chartsHelper.Column.init(this, data.Column);
        } else if ($(this).hasClass("line-container")) {
            //折线图
            for (var i = 0; i <= data.Column.length - 1; i++) {
                var model = data.Column[i];
                if (i == 0) {
                    chartsHelper.Line.init($("#linechart0"), model);
                } else if (i == 1) {
                    chartsHelper.Line.init($("#linechart1"), model);
                } else if (i == 2) {
                    chartsHelper.Line.init($("#linechart2"), model);
                } else if (i == 3) {
                    chartsHelper.Line.init($("#linechart3"), model);
                } else if (i == 4) {
                    chartsHelper.Line.init($("#linechart4"), model);
                } else if (i == 5) {
                    chartsHelper.Line.init($("#linechart5"), model);
                } else if (i == 6) {
                    chartsHelper.Line.init($("#linechart6"), model);
                } else if (i == 7) {
                    chartsHelper.Line.init($("#linechart7"), model);
                } else if (i == 8) {
                    chartsHelper.Line.init($("#linechart8"), model);
                }
            }
            for (var i = data.Column.length; i <= 8; i++) {
                $("#linechart" + i).html("");
            }
        }
    })
};

function RealtimeMonitor() {
    $("#hcurrentfun").val("realtimeMonitor")
    var id = $("#hcurrentid").val();
    $("#erealtime").show();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    //$("#arealtime").attr("href","/Pollution/RealtimeMonitor"+eid);
    var url = "/Pollution/GetPollutionPointByEnterprise";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            //$('#mymodal').modal('hide')

            //success(data["Msg"]);
            // listHelper.table.init();
            var json = JSON.parse(data["Msg"]);
            //$("#EName").html($(this).find("#EnterpriseName").val());
            if (json.length > 0) {
                $("#EName").html(json[0].EnterpriseName)
            }
            $("#WasteObjectLists").html("");
            $("#WasteObjectLists").html(selectHtml("", "ID", "Name", "Name", json));
            uiHelper.Chosen();
            $("#WasteObjectLists").trigger("change");
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function EnterpriseHome() {
    $("#hcurrentfun").val("enterpriseHome");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").show();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getEnterpriseByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#ehid").val(json[0].ID);
                $("#EeName").html(json[0].Name);
                $("#EAttention").html("国控");
                $("#EState").html("正常");
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function MonitorData() {
    $("#hcurrentfun").val("monitorData");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").show();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getEnterpriseByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#ehid").val(json[0].ID);
                $("#EmdName").html(json[0].Name);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function getPollutOverDealByID(id) {
    $('#myPollutOverDealModal').modal('show');
    var url = "/Pollution/getPollutOverDealByID";
    var data = { parentID: id };

    core.ajax(url, data, null, function (data) {
        if (data["Success"]) {
            //$('#myPollutOverDealModal').modal('hide');

        }
        else {
            alert(data["Msg"]);
        }
    });
}

function getPollutOverInfoByID(id) {
    $('#myPollutOverInfoModal').modal('show');
    var url = "/Pollution/getPollutOverInfoByID";
    var data = { parentID: id };

    core.ajax(url, data, null, function (data) {
        if (data["Success"]) {
            //$('#myPollutOverDealModal').modal('hide');

        }
        else {
            alert(data["Msg"]);
        }
    });
}

function getDataDropDealByID(id) {
    $('#myDataDropDealModal').modal('show');
    var url = "/Pollution/getDataDropDealByID";
    var data = { parentID: id };

    core.ajax(url, data, null, function (data) {
        if (data["Success"]) {
            //$('#myPollutOverDealModal').modal('hide');

        }
        else {
            alert(data["Msg"]);
        }
    });
}

function AlarmDisposal() {
    $("#hcurrentfun").val("alarmDisposal");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").show();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getEnterpriseByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#eoverhid").val(json[0].ID);
                $("#edraphid").val(json[0].ID);
                $("#EaName").html(json[0].Name);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function getAlarmByID(id) {
    $('#myAlarmModal').modal('show');
    var url = "/Pollution/getAlarmByID";
    var data = { parentID: id };

    core.ajax(url, data, null, function (data) {
        if (data["Success"]) {
            //$('#myPollutOverDealModal').modal('hide');

        }
        else {
            alert(data["Msg"]);
        }
    });
}

function EquipStatus() {
    $("#hcurrentfun").val("equipStatus");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").show();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getEnterpriseByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#ehid").val(json[0].ID);
                $("#EsName").html(json[0].Name);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function BasicInfo() {
    $("#hcurrentfun").val("basicInfo");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").show();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getEnterpriseByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#ehid").val(json[0].ID);
                $("#ename").html(json[0].Name);
                listHelper.list.load(".filebox", {}, null, null, null);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function wchartHandler(element, data) {
    data = JSON.parse(data);
    $(element).each(function () {

        if ($(this).hasClass("pie-container")) {
            //饼图
            chartsHelper.Pie.init(this, data.Pie);
        } else if ($(this).hasClass("column-container")) {
            //柱状图
            chartsHelper.Column.init(this, data.Column);
        } else if ($(this).hasClass("line-container")) {
            //折线图
            chartsHelper.Line.init($("#wlinechart0"), data.Column[0]);
        }
    })
};

function WMonitorData() {
    $("#hcurrentfun").val("wmonitorData");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").show();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getWasteObjectDataByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#ehid").val(json[0].ID);
                $("#WmdName").html(json[0].Name);
                wchartHandler(".wjs-chart", json[0].RegionCode);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function WBasicInfo() {
    $("#hcurrentfun").val("wbasicInfo");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").show();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getWasteObjectByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#ehid").val(json[0].ID);
                $("#wname").html(json[0].Name);
                listHelper.list.load(".wfilebox", {}, null, null, null);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function pchartHandler(element, data) {
    data = JSON.parse(data);
    $(element).each(function () {

        if ($(this).hasClass("pie-container")) {
            //饼图
            chartsHelper.Pie.init(this, data.Pie);
        } else if ($(this).hasClass("column-container")) {
            //柱状图
            chartsHelper.Column.init(this, data.Column);
        } else if ($(this).hasClass("line-container")) {
            //折线图
            chartsHelper.Line.init($("#plinechart0"), data.Column[0]);
        }
    })
};

function PollutData() {
    $("#hcurrentfun").val("pollutData");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").show();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getPollutantParaDataByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#ehid").val(json[0].ID);
                $("#PdName").html(json[0].Name);
                pchartHandler(".pjs-chart", json[0].BizCode);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function PollutAlarm() {
    $("#hcurrentfun").val("pollutAlarm");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").show();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getPollutantParaAlarmByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#ehid").val(json[0].ID);
                $("#PaName").html(json[0].Code);
                $("#hpcode").val(json[0].Code);
                $("#hpwoid").val(json[0].WasteObjectID);
                //pchartHandler(".pjs-chart", json[0].RegionCode);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function DDropProc() {
    $("#hcurrentfun").val("ddropProc");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").show();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getDropDataByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                //$("#ehid").val(json[0].ID);
                $("#DdpMN").html(json[0].Code);
                $("#hdwoid").val(json[0].WasteObjectID);
                //pchartHandler(".pjs-chart", json[0].RegionCode);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function DBasicInfo() {
    $("#hcurrentfun").val("dbasicInfo");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").show();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getDropDataByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                //$("#ehid").val(json[0].ID);
                $("#DbiMN").html(json[0].Code);
                $("#hdwoid").val(json[0].WasteObjectID);
                //pchartHandler(".pjs-chart", json[0].RegionCode);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function MBasicInfo() {
    $("#hcurrentfun").val("mbasicInfo");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").show();
    $("#crunstatus").hide();
    $("#cbasicinfo").hide();
    var url = "/Pollution/GetMonitorEquipByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                //$("#ehid").val(json[0].ID);
                $("#mname").html(json[0].Name);
                $("#hdwoid").val(json[0].WasteObjectID);
                //pchartHandler(".pjs-chart", json[0].RegionCode);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function CRunStatus() {
    $("#hcurrentfun").val("crunStatus");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").show();
    $("#cbasicinfo").hide();
    var url = "/Pollution/getControlFacilityByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#ehid").val(json[0].ID);
                $("#CsName").html(json[0].Name);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function CBasicInfo() {
    $("#hcurrentfun").val("cbasicInfo");
    var id = $("#hcurrentid").val();
    $("#erealtime").hide();
    $("#eenterprise").hide();
    $("#emonitordata").hide();
    $("#ealarm").hide();
    $("#estatus").hide();
    $("#ebasicinfo").hide();
    $("#wmonitordata").hide();
    $("#wbasicinfo").hide();
    $("#pollutdata").hide();
    $("#pollutalarm").hide();
    $("#ddropproc").hide();
    $("#dbasicinfo").hide();
    $("#mbasicinfo").hide();
    $("#crunstatus").hide();
    $("#cbasicinfo").show();
    var url = "/Pollution/getControlFacilityByID";
    var postdata = {};
    postdata.ID = id;
    core.ajax(url, postdata, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            if (json.length > 0) {
                $("#ehid").val(json[0].ID);
                $("#cname").html(json[0].Name);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}








