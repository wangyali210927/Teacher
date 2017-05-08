//进度条初始化
$(function () {
    if ($("#small-chat").size() > 0) {
        $(".full-height-scroll").slimScroll({
            height: "100%"
        })
        $("#smallchatclose").click(function
        () {
            $(".open-small-chat").children().toggleClass("fa-comments").toggleClass("fa-remove")
            $(".small-chat-box").toggleClass("active")
        })
    }

});

var lasttr;
var Markerjson = [];
$(function () {
    //删除按钮重写，多选删除
    $(".js-delete-button").click(function (e) {
        if (typeof e.preventDefault === "function") {
            e.preventDefault();
        }
        var data;
        if ($(".js-table").size() > 0) {

            data = uiHelper.Button.selectedData(".js-table");
        }
        else {

            data = uiHelper.Button.selectedData(".js-map-list");
        }
        //附带地图的表格获取选中数据
        if ($(".js-map-list").size() > 0) {
            data = uiHelper.Button.selectedData(".js-map-list");
        }
        if ($(".js-lists").size() > 0) {
            data = uiHelper.Button.selectedData(".js-lists");
        }
        uiHelper.Button.ajaxButtonBattch(".js-delete-button", data, function (d) {
            confirm('你确定要删除选中数据吗？', function () {
                //alert("确定");
                var url = $(".js-delete-button").hasClass("btn") ? $(".js-delete-button").attr("url") : $(".js-delete-button").attr("href");

                var json = {};
                var jsonTemp = [];
                for (var i in d) {
                    jsonTemp.push({ "ID": parseInt(d[i]) });
                }

                json["list"] = dataHelper.fromJSON(jsonTemp);
                core.ajax(url, json, null, function (data) {
                    if (data["Success"]) {
                        alert(data["Msg"]);
                        if ($(".js-map-list").size() > 0) {
                            Enterprisemaplistload(".js-map-list");
                        }
                        else {
                            if ($(".js-table").size() > 0) {
                                listHelper.table.init();
                            }
                            else {
                                listHelper.list.init();
                            }
                        }
                    }
                    else {
                        alert(data["Msg"]);
                    }
                });
            });
        });
    })
    //重置密码
    $(".js-dlg-submit").click(function (e) {

        //显示：$('#myModal').modal('show');

        //隐藏：$('#myModal').modal('hide');

        //开关：$('#myModal').modal('toogle');

        //事件:   $('#myModal').on('hidden', function () {// do something…});
        UpdatePwdCheck = uiHelper.Button.selectedData(".js-table");
        if (UpdatePwdCheck.length > 1) {
            alert("只能对一条数据进行操作");
            return;
        }
        uiHelper.Button.ajaxButtonBattch(".js-delete-button", UpdatePwdCheck, function (d) {
            $('#mymodal').modal('show');

        });
    })
    //修改密码
    $("#updatepwdbtn").click(function () {
        var newpwd = $("#Pwd").val();
        var newpwdto = $("#Pwdto").val();
        if (newpwd.length < 6) {
            alert("密码至少六位字符");
        }
        else if (newpwd != newpwdto) {
            alert("两次密码输入不一致");
        }
        else {
            //alert("确定");
            var url = $(".js-dlg-submit").hasClass("btn") ? $(".js-dlg-submit").attr("url") : $(".js-dlg-submit").attr("href");
            //var json = {};
            //var jsonTemp = [];
            //for (var i in UpdatePwdCheck) {
            //    jsonTemp.push({ "ID": parseInt(UpdatePwdCheck[i]), "Pwd": newpwd });
            //}

            //json["list"] = dataHelper.fromJSON(jsonTemp);
            var json = { "ID": parseInt(UpdatePwdCheck[0]), "Pwd": newpwd }
            core.ajax(url, json, null, function (data) {

                if (data["Success"]) {
                    $('#mymodal').modal('hide');
                    success(data["Msg"]);
                }
                else {
                    alert(data["Msg"]);
                }
            });
        }
    })
    //修改登录用户密码
    $("#UpdateselfPwd").click(
        function () {
            $('#mymodal').modal('show');
        }
        )
    $("#updatemypwd").click(function () {
        var oldpwd = $("#oldPwd").val();
        var newpwd = $("#newPwd").val();
        var newpwdto = $("#newPwdto").val();
        if (newpwd.length < 6) {
            alert("密码至少六位字符");
        }
        else if (newpwd != newpwdto) {
            alert("两次密码输入不一致");
        }
        else {
            //alert("确定");
            var url = $(this).attr("url");
            //var json = {};
            //var jsonTemp = [];
            //for (var i in UpdatePwdCheck) {
            //    jsonTemp.push({ "ID": parseInt(UpdatePwdCheck[i]), "Pwd": newpwd });
            //}

            //json["list"] = dataHelper.fromJSON(jsonTemp);
            var postdata = {};
            postdata.oldpwd = oldpwd;
            postdata.newPwd = newpwd;
            core.ajax(url, postdata, null, function (data) {
                if (data["Success"]) {
                    $('#mymodal').modal('hide')

                    success(data["Msg"]);
                    // listHelper.table.init();
                }
                else {
                    alert(data["Msg"]);
                }
            });
        }
    })

    //获取应用凭证
    $(".js-secrt-button ").click(function (e) {
        //显示：$('#myModal').modal('show');

        //隐藏：$('#myModal').modal('hide');

        //开关：$('#myModal').modal('toogle');

        //事件:   $('#myModal').on('hidden', function () {// do something…});
        UpdatePwdCheck = uiHelper.Button.selectedData(".js-table");
        uiHelper.Button.ajaxButtonBattch(".js-delete-button", UpdatePwdCheck, function (d) {
            var url = $(".js-secrt-button").hasClass("btn") ? $(".js-secrt-button").attr("url") : $(".js-secrt-button").attr("href");
            var json = { "ID": parseInt(UpdatePwdCheck[0]) }
            core.ajax(url, json, null, function (data) {
                $('#mymodal').modal('show');
                if (data["Success"]) {
                    var json = JSON.parse(data["Msg"]);
                    var appid = json.AppId;
                    var secrt = json.AppSecert;
                    $("#title").html("应用" + appid + "的应用凭证：");
                    $("#secrt").val(secrt)
                    // listHelper.table.init();
                }
                else {
                    alert(data["Msg"]);
                }
            });



        });
    })

    //-----------------企业
    $("#step3next").click(function () {
        window.location.href = "/Business/EnterpriseAdd?step=5"
    })
    $("#step4next").click(function () {
        window.location.href = "/Business/EnterpriseList"
    })
    //返回
    $("#stepback").click(function () {
        if ($(this).val() != "") {
            window.location.href = "/Business/EnterpriseUpdate?ID=" + $(this).val();
        }
        else {
            window.location.href = $(this).attr("url");
        }
    })

    //企业列表地图
    //Enterprisemaplistload(".js-table-map");
    //企业表单地图
    Enterprisemapformload("#map");
    //Enterprisesteps("#wizard")
    //第三步骤新增企业人
    Enterprisesetps3("#newperson")
    //第步骤新增企业附件
    Enterprisesetps4("#newfile")
    //第二步骤提交表单
    Enterprisestepssubmit(".form");
    //-----------------企业

    $("input[name='options']").change(function () {
        if ($("input[name='options']").size() <= 0) {
            return;
        }
        var map = addmap();

        var value = $('input:radio[name="options"]:checked').val()
        if (value == "Ent") {
            Markerjson = [];

            Enterprisemaplistload(".js-table");
        }
        else {
            Enterprisesetps2(map);
        }
    })
    //任务选择污染源时，复制位置信息
    //$("#TaskWasteobject").change(function () {
    //    if ($("#TaskWasteobject").size() <= 0) {
    //        return;
    //    }
    //    var value = $('#TaskWasteobject').val();
    //    if (value != "") {
    //        var url = "/Business/GetWasteObjectModel";
    //        var data = { ID: value };
    //        core.ajax(url, data, null, function (data) {
    //            if (data["Success"]) {
    //                var json = JSON.parse(data["Msg"]);
    //                $("#Lon").val(json.Lon);
    //                $("#Lat").val(json.Lat);
    //                $("#Address").val(json.Address);
    //                Enterprisemapformload("#map");
    //            }
    //            else {
    //                alert(data["Msg"]);
    //            }
    //        });
    //    }
    //})
    //一企业一档选择网格时，复制行政区划分代码
    $("#TaskNetgrid").change(function () {
        if ($("#TaskNetgrid").size() <= 0) {
            return;
        }
        var value = $('#TaskNetgrid').val();
        if (value != "") {
            var url = "/Business/GetTaskNetGridModel";
            var data = { ID: value };
            core.ajax(url, data, null, function (data) {
                if (data["Success"]) {
                    var json = JSON.parse(data["Msg"]);
                    $("#RegionCode").val(json.RegionCode);
                    $("#DepartmentID").children('option[value=' + json.DepartmentID + ']').prop('selected', true);

                }
                else {
                    alert(data["Msg"]);
                }
            });
        }
    })
    //网格部门下拉级联
    AddSysUsersdiv("#NetGridDepatmentID");

    $("#NetGridDepatmentID").change(function () {
        AddSysUsersdiv("#NetGridDepatmentID");
    })
    $("#GridLevel").change(function () {
        AddParentNetdiv("#NetGridParentdiv")
    })

    //污染类型级联
    WasteTypeFather("#TaskWasteTypeFather")
    GetDeaulRemark("select[name='DealStatus']")
    GetIsCurrent(".js-GetIsCurrent-button")
    
    WasteObjectChange("#WasteObjectLists")
 

    //核实审核步骤，如果任务指定网格有负责人，则处理人默认选中负责人
    CheckTrialDeaulUser("#CheckTrialDeaulUser")
    //协办审核步骤，状态改变
    CooperateTrialStatus("#CooperateTrialStatus")
    //任务列表修改处理状态ID为值
    ChooseSysRoles("#SysRoles")
    ChooseSysUsers("#manageDepartment");
    //一企业一档第三步选择部门级联人员
    $("#EnterpriseDepartmentID").change(function () {
        var departmentid = $("#EnterpriseDepartmentID").val();
        if (departmentid != "") {
            var url = "/Business/GetNetGridSelect";
            var data = { ID: departmentid };
            core.ajax(url, data, null, function (data) {
                if (data["Success"]) {
                    var list = JSON.parse(data["Msg"]);
                    // $(".js-chosen").remove();
                    //alert(list);
                    $("#UserIDdiv").html("");
                    $("#UserIDdiv").html(selectHtml("专管员", "ID", "UserID", "TrueName", list));
                    uiHelper.Chosen();
                }
                else {
                    alert(data["Msg"]);
                }
            });
        }
        else {
            $("#UserIDdiv").html("");

        }
    })
    //一企业一档第三步修改初始专管员
    ChooseEnterpriseUser("#EnterpriseDepartmentID");
    //单位简称默认与全称相同
    $("#DepartmentName").blur(function () {
        if ($("#Aliase").val() == "") {
            $("#Aliase").val($(this).val());
        }
    });
    //企业简称默认与全称相同
    $("#EnterpriseName").blur(function () {
        if ($("#Aliase").val() == "") {
            $("#Aliase").val($(this).val());
        }
    });
    $("input[name='BtnComponent']").change(function () {
        GetWastgeListByComponent($(this).val())
    })
    WasteObjectTypesListsSelected("#WasteObjectTypesLists")
    GetWasteCode("#GetCodeSpan");

    //专题图地图自动加载
    MapAutoLoad("#map");

    $(".EntChartData").click(function () {
        ChangeSeriesType(this);
    })
});
var stepcount = 1;

//获取无父级污染类型
function GetWasteCode(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    $(selector).click(function () {
        var EnterpriseID = $("#EnterpriseID").val();
        if (EnterpriseID == "") {
            alert("请选择所属企业！")
            return;
        }
        $("#mymodal").modal('show');

        var data = { EnterpriseID: EnterpriseID };
        $("#GetCode").click(function () {
            var data2 = { EnterpriseID: $("#EnterpriseID").val() };

            var url = "/Business/GetMaxWasteCodeSingle";
            core.ajax(url, data2, null, function (data) {
                if (data["Success"]) {
                    $("#Code").val(data["Msg"]);
                    $("#mymodal").modal('hide');

                }
                else {
                    alert(data["Msg"]);
                }
            });
        })
        listHelper.table.load(".js-model-table", data, null, null, null)

    })
}

//获取肃然类别列表
function WasteObjectTypesListsSelected(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    WasteObjectTypesListsChanged(selector, "#WasteObjectTypesSecond", "ObjectType")

    $(selector).change(function () {
        WasteObjectTypesListsChanged(selector, "#WasteObjectTypesSecond", "ObjectType")
    })
    var parentid = $("#ObjectTypeParentIDhidden").val();
    if (parentid > 0) {
        $(selector).children('option[value=' + parentid + ']').prop('selected', true);
    }
}

//污染类型选择更换时
function WasteObjectTypesListsChanged(selector, insertdiv, insertname) {
    if ($(selector).size() <= 0) {
        return;
    }
    var value = $(selector).val();
    var text = $(selector).find("option:selected").text();
    if (value != "") {
        var url = "/Business/GetWasteObjectTypeByParentID";
        var data = { ID: value };
        core.ajax(url, data, null, function (data) {
            if (data["Success"]) {
                var list = JSON.parse(data["Msg"]);
                // $(".js-chosen").remove();
                //alert(list);
                $(insertdiv).html("");
                $(insertdiv).html(selectHtml(text, "ID", insertname, "Name", list));
                uiHelper.Chosen();
                //if (insertdiv == "#WasteObjectTypesSecond") {
                //    WasteObjectTypesListsChanged("#WasteObjectTypesSecondList", "#WasteObjectTypesThird", "ObjectType")
                //    $("#WasteObjectTypesSecondList").change(function () {
                //        WasteObjectTypesListsChanged("#WasteObjectTypesSecondList", "#WasteObjectTypesThird", "ObjectType")
                //    })
                //}
                var objecttype = $("#ObjectTypehidden").val();
                if (objecttype > 0) {
                    $("#ObjectType").children('option[value=' + objecttype + ']').prop('selected', true);
                }
            }
            else {
                alert(data["Msg"]);
            }
        });
    }
    else {
        $("#SysUsersdiv").html("");

    }
}

//添加用户下拉
function AddSysUsersdiv(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    var value = $(selector).val();
    if (value != "") {
        var url = "/Business/GetNetGridSelect";
        var data = { ID: value };
        core.ajax(url, data, null, function (data) {
            if (data["Success"]) {
                var list = JSON.parse(data["Msg"]);
                // $(".js-chosen").remove();
                //alert(list);
                $("#SysUsersdiv").html("");
                $("#SysUsersdiv").html(multipleselectHtml("主管用户", "ID", "SysUsers", "TrueName", list));
                $("#manageusersdiv").html("");
                $("#manageusersdiv").html(selectHtml("分管领导", "ID", "ManageUserID", "TrueName", list));

                uiHelper.Chosen();
                var users = $("#Netmanageusers").val()
                var manageusers = $("#Netmanageusersid").val()

                if (users
                != "") {
                    var userarry = users.split(',');
                    for (var i = 0; i < userarry.length; i++) {
                        $("#SysUsers").children('option[value=' + userarry[i] + ']').prop('selected', true);
                    }
                }
                if (manageusers != "") {
                    $("#ManageUserID").children('option[value=' + manageusers + ']').prop('selected', true);
                }
                AddParentNetdiv("#NetGridParentdiv")

            }
            else {
                alert(data["Msg"]);
            }
        });
    }
    else {
        $("#SysUsersdiv").html("");

    }
}

//添加上级网格下拉
function AddParentNetdiv(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    var value = $("#NetGridDepatmentID").val();
    var NetLevel = $("#GridLevel").val();
    if (value != "") {
        var url = "/Business/GetParentNetdiv";
        var data = { ID: value, NetLevel: NetLevel };
        core.ajax(url, data, null, function (data) {
            if (data["Success"]) {
                var list = JSON.parse(data["Msg"]);
                // $(".js-chosen").remove();
                //alert(list);
                $("#NetGridParentdiv").html("");
                $("#NetGridParentdiv").html(selectHtml("上级网格", "Value", "ParentID", "Text", list));
                uiHelper.Chosen();
                var parentid = $("#NetParentID").val()

                if (parentid != "") {
                    $("#ParentID").children('option[value=' + parentid + ']').prop('selected', true);
                }
                //网格上级网格选择时获取上级网格的区划代码
                changeparentNetFunc("#ParentID")
                $("#ParentID").change(function () {
                    changeparentNetFunc(this)
                })
            }
            else {
                alert(data["Msg"]);
            }
        });
    }
    else {
        $("#NetGridParentdiv").html("");

    }
}

//网格增修页面切换父级网格下拉
function changeparentNetFunc(e) {
    var value = $(e).val()//$("#NetGridFormParent").find("option:selected").val()
    if (value != "") {
        var url = "/Business/GetParentNet";
        var data = { ID: parseInt(value) };
        core.ajax(url, data, null, function (data) {
            if (data["Success"]) {
                var list = JSON.parse(data["Msg"]);
                if (list != null) {
                    $("#RegionCode").val(list.RegionCode);
                    var map = Enterprisemapformload("#map");
                    map.centerAndZoom(new BMap.Point(list.Lon, list.Lat), 12);
                }
            }
            else {
                alert(data["Msg"]);
            }
        });
    }
}
//企业查看地图增加该企业的污染源标致
function EnterpriseMapAddWasteObject(selector, map) {
    if ($(selector).size() <= 0) {
        return;
    }
    var url = "/Business/GetEnterPriseWasteList";
    var data = { EnterpriseID: $("#EnterpriseIDhidden").val() };
    core.ajax(url, data, null, function (data) {
        if (data["Success"]) {
            AddWasteTypeSon("#TaskWasteTypeFather");
            var list = JSON.parse(data["Msg"]);

            if (list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].Lon == "" || list[i].Lon == null || list[i].Lat == "" || list[i].Lat == null) {
                        continue;
                    }
                    var point = new BMap.Point(list[i].Lon, list[i].Lat); // 创建点坐标  
                    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                        offset: new BMap.Size(10, 25), // 指定定位位置  
                        imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移  
                    });
                    var marker = new BMap.Marker(point, { icon: myIcon });
                    map.addOverlay(marker);
                    (function () {
                        var indmark = marker;
                        var index = i;
                        var sContent = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>污染源：" + list[i].Name + "</h4>"
                        sContent += "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>地址:" + list[i].Address + "</p>";
                        sContent += "</br><button  onclick='selectWasteObject(" + list[i].ID + ")' class='btn btn-w-m btn-info' style='margin-left:20px' >查看详情</button>";

                        var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
                        marker.addEventListener("mouseover", function (event) {
                            this.openInfoWindow(infoWindow);
                        });
                    }())
                }
            }

        }
        else {
            alert(data["Msg"]);
        }
    });
}
//查看污染源详情
function selectWasteObject(id) {
    window.location.href = "/Business/WasteObjectSelect?ID=" + id;

}
function ChooseEnterpriseUser(selector) {
    if ($(selector).size() <= 0) {
        return;
    }

    var departmentid = $("#EnterpriseDepartmentID").val();
    if (departmentid != "") {

        var url = "/Business/GetNetGridSelect";
        var data = { ID: departmentid };
        core.ajax(url, data, null, function (data) {
            if (data["Success"]) {

                var list = JSON.parse(data["Msg"]);
                // $(".js-chosen").remove();
                //alert(list);
                $("#UserIDdiv").html("");
                $("#UserIDdiv").html(selectHtml("专管员", "ID", "UserID", "TrueName", list));
                uiHelper.Chosen();
                var users = $("#hiddenUserID").val()
                if (users
                != "") {
                    $("#UserID").children('option[value=' + users + ']').prop('selected', true);
                }
            }
            else {
                alert(data["Msg"]);
            }
        });
    }
    else {
        $("#UserIDdiv").html("");

    }
}
function ChooseSysRoles(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    var users = $(selector).attr("manageroles")
    if (users
        != "") {
        var userarry = users.split(',');
        for (var i = 0; i < userarry.length; i++) {
            $(selector).children('option[value=' + userarry[i] + ']').prop('selected', true);
        }
    }
}
function ChooseSysUsers(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    var value = $('#manageDepartment').val();
    if (value != "") {
        var url = "/Business/GetNetGridSelect";
        var data = { ID: value };
        core.ajax(url, data, null, function (data) {
            if (data["Success"]) {
                var list = JSON.parse(data["Msg"]);
                // $(".js-chosen").remove();
                $("#SysUsersdiv").html("");
                $("#SysUsersdiv").html(multipleselectHtml("主管用户", "ID", "SysUsers", "TrueName", list));

                uiHelper.Chosen();
                var users = $("#manageusers").val()

                if (users
                != "") {
                    var userarry = users.split(',');
                    for (var i = 0; i < userarry.length; i++) {
                        $("#SysUsers").children('option[value=' + userarry[i] + ']').prop('selected', true);
                    }
                }

            }
            else {
                alert(data["Msg"]);
            }
        });
    }

}
function CooperateTrialStatus(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    $(selector).change(function () {
        if ($(selector).val() == 241)//协助办理，退回复核
        {
            $("select[name='DealDepartmentID']").parent().hide();
        }
    })
}
function CheckTrialDeaulUser(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    var choosevalue = $("#CheckTrialDeaulUserhidden").val();
    if (choosevalue > 0) {
        $(selector).children('option[value=' + choosevalue + ']').prop('selected', true);
    }
}

function GetIsCurrent(selector) {

    if ($(selector).size() <= 0) {
        return;
    }
    $(selector).click(function (e) {
        if (typeof e.preventDefault === "function") {
            e.preventDefault();
        }
        var data = { ID: uiHelper.Button.selectedData(".js-map-list")[0] }

        var url = $(this).attr("url") || $(this).attr("href");
        core.ajax(url + "?ajaxcurrent=1", data, null, function (data) {
            if (data["Success"]) {

                window.location.href = url + "?ID=" + uiHelper.Button.selectedData(".js-map-list")[0];

            }
            else {
                alert(data["Msg"]);
            }
        }, true, null, null, "post");
    })
}

function GetDeaulRemark(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    var data = { AuditStatus: $(selector).val() };
    var url = "/Business/GetDeaulRemark";

    core.ajax(url, data, null, function (data) {
        if (data["Success"]) {
            var json = JSON.parse(data["Msg"]);
            // $(".js-chosen").remove();
            //$("textarea[name='DealRemark']").val(json.AuditRemark||"")
        }
        else {
            alert(data["Msg"]);
        }
    });
    $(selector).change(function () {
        function afterHandler(data) {
            if (data["Success"]) {
                var json = JSON.parse(data["Msg"]);
                // $(".js-chosen").remove();
                $("textarea[name='DealRemark']").val(json.AuditRemark)
            }
            else {
                alert(data["Msg"]);
            }
        }
        var data = { AuditStatus: $(this).val() };
        var url = "/Business/GetDeaulRemark"

        if (typeof core === "undefined") {
            $.getScript("/Scripts/common/form.js", function (script, textStatus, jqxhr) {
                core.ajax(url, data, null, afterHandler);
            });
        } else {
            core.ajax(url, data, null, afterHandler);
        }

    })
}

//表单提交
function Enterprisestepssubmit(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    $("form").submit(function () {
        return false;
    });

    function dataHandler(form) {
        var data = formHelper.data.getFormData(form);
        var d = {};
        for (var k in data) {
            if (data[k] != "") {
                d[k] = data[k];
            }
        }
        var mydata = {};
        mydata["model"] = dataHelper.fromJSON(d);
        return mydata;
    }


    function afterHandler(data) {
        var mydata = typeof data !== "object" ? JSON.parse(data) : data;
        if (mydata["Success"]) {
            success("操作成功,请稍候...");
            if (!utilities.Common.isEmpty(nextStepUrl)) {
                location.href = nextStepUrl;
            }
        } else {
            alert(mydata["Msg"]);
        }
    }


    if (typeof formHelper === "undefined") {
        $.getScript("/Scripts/common/form.js", function (script, textStatus, jqxhr) {
            formHelper.data.initSelectorWithDataHandlerAndAfterHandler(selector, dataHandler, null);
        });
    } else {
        formHelper.data.initSelectorWithDataHandlerAndAfterHandler(selector, dataHandler, null);
    }
}

//一企业一档档案文件的操作js
function Enterprisesetps4(selector) {

    if ($(selector).size() <= 0) {
        return;
    }
    $(selector).click(function () {
        $("#mymodal").modal('show');

    })
    //一企业一档新增修改附件的添加
    $("#addnewfile").click(function () {
        var data = {
            Name: $("#Name").val(),
            FileID: $("#FileID").val(),
            Description: $("#Description").val(),
            VoucherID: $("#VoucherID").val()
        }
        $("#Name").val("");
        $("#FileID").val("");
        $("#Description").val("");
        //$("#VoucherID").val("");
        $("#CurfileName").html("");
        var d = {};
        for (var k in data) {
            if (data[k] != "") {
                d[k] = data[k];
            }
        }
        //if (data.Name == null || data.Name == "") {
        //    alert("附件名称不能为空")
        //    return;
        //}
        var url = "/Voucher/RelationFile"

            core.ajax(url, data, null, function (data) {
                $("#mymodal").modal('hide');
                if (data["Success"]) {
                    listHelper.list.load(".js-lists", {}, null, null, null);
                }
                else {
                    alert(data["Msg"]);
                }
            });
    });
    //一企业一档新增修改附件的删除
    $("#delfile").click(function () {
        confirm("你确定要删除该附件？", function () {
            // var fileID = uiHelper.Button.selectedData(".js-lists");


            var url = "/Business/AttachmentDel"
            var json = {};
            var jsonTemp = [];
            $('input[name="ID"]:checked').each(function () {
                jsonTemp.push({ "ID": $(this).val() });
            });
            if (jsonTemp.length <= 0) {
                alert("未选中任何行");
                return;
            }
            json["list"] = dataHelper.fromJSON(jsonTemp);
            if ($("#CheckReportTrial").size() > 0) {
                url = "/Business/DelRecceAttchment"
            }
            core.ajax(url, json, null, function (data) {
                if (data["Success"]) {
                    success(data["Msg"]);
                    listHelper.list.load(".js-lists", {}, null, null, null);
                }
                else {
                    alert(data["Msg"]);
                }
            });
        })
    })
}

//表单页面的地图添加标注
function Enterprisesetps2(map) {
    if ($(map).size() <= 0) {
        return;
    }
    var geoc = new BMap.Geocoder();
    if ($("#Lon").size() <= 0) {
        return
    }
    if ($("#Lon").val() != "" && $("#Lat").val() != "") {
        var point = new BMap.Point($("#Lon").val(), $("#Lat").val());

        geoc.getLocation(point, function (rs) {
            var addComp = rs.addressComponents;
            var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
            var marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);               // 将标注添加到地图中
            var sContent = "<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>" + address + "</h4>" + "</div>";
            var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
            marker.openInfoWindow(infoWindow);
            marker.addEventListener("mouseover", function (event) {
                this.openInfoWindow(infoWindow);
            });
        });
        map.setCenter(point);
        return point;
    }
}

function Enterprisesetps3(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    var addorup = 1;

    $(selector).click(function () {
        addorup = 1;
        $("#Name").val("");
        $("#Phone").val("");
        $("#IDCard").val("");
        $("#mymodal").modal('show');

    })
    //编辑企业人员
    $("#updateperson").click(function () {
        addorup = 2;
        $("#Name").val("");
        $("#Phone").val("");
        $("#IDCard").val("");
        var url = "/Business/EnterprisePersonSelect?step3=true"
        var data = { ID: uiHelper.Button.selectedData(".js-table")[0] };
        core.ajax(url, data, null, function (data) {
            $("#mymodal").modal('show');
            if (data["Success"]) {
                var model = JSON.parse(data["Msg"]);
                $("#Name").val(model.Name);
                $("#Phone").val(model.Phone);
                $("#IDCard").val(model.IDCard);
                $("#PersonType").children('option[value=' + model.PersonType + ']').prop('selected', true);
            }
            else {
                alert(data["Msg"]);
            }
        });
    });

    $("#addnewperson").click(function () {
        var data = {};
        var url = "";
        var mydata = {};
        if (addorup == 1) {
            url = "/Business/EnterpriseAdd?step=4"
            data = {
                Name: $("#Name").val(),
                Phone: $("#Phone").val(),
                IDCard: $("#IDCard").val(),
                PersonType: $("#PersonType").val()
            }
            var d = {};
            for (var k in data) {
                if (data[k] != "") {
                    d[k] = data[k];
                }
            }
            if (data.Name == null || data.Name == "") {
                alert("员工姓名不能为空")
                return;
            }
            mydata["model"] = dataHelper.fromJSON(d);
        }
        else {
            url = "/Business/EnterprisePersonUpdate"
            data = {
                ID: uiHelper.Button.selectedData(".js-table")[0],
                Name: $("#Name").val(),
                Phone: $("#Phone").val(),
                IDCard: $("#IDCard").val(),
                PersonType: $("#PersonType").val()
            }
            mydata = data;
        }



        core.ajax(url, mydata, null, function (data) {
            $("#mymodal").modal('hide');
            if (data["Success"]) {
                listHelper.table.init();
            }
            else {
                alert(data["Msg"]);
            }
        });
    });
}



function Enterprisemaplistload(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    var data = listHelper.getPageData(selector);
    listHelper.list.load(selector, data, null, function () {

    }, function (selector, rows) {
        onAfterLoaded(selector, rows);
    }
    );
}

function onAfterLoaded(selector, rows) {
    //var map = addmap();


    //map.addEventListener("dragstart", function () {

    //    ////删除之前的标注
    //    addmarker(map, rows);


    //});
    //map.addEventListener
    //("zoomstart", function () {
    //    // map.clearOverlays();//删除之前的标注
    //    addmarker(map, rows);

    //});
    //addmarker(map, rows);
    var map;
    tablemove(map, selector);

}

function WasteTypeFather(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    //选择污染类型（父级时）,展开子集
    $(selector).change(function () {
        if ($(selector).val() == "") {
            $("#wastetypeson").html("");
        }
        else {
            var readonly = $(selector).prop("disabled");

            AddWasteTypeSon(selector, readonly)
        }
    })
    $(selector).children('option[value=' + $(selector).attr("fathervalue") + ']').prop('selected', true);
    //alert($(selector).val());
    AddWasteTypeSon(selector);

}
var timeid = 0;
function WasteObjectChange(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    
    $(selector).change(function () {
        var woid=$(selector).find("option:selected").val();
        if (woid == "") {
            $("#wastetypeson").html("");
        }
        else {
            if ($("#chartShow").size() <= 0) {
                return;
            }
            var readonly = $(selector).prop("disabled");
            //$("#chartShow").html(woid);
            //AddWasteTypeSon(selector, readonly)
            clearInterval(timeid);
            var url = "/Pollution/getPollutantParaByW";
            var data = { ID: woid };
            core.ajax(url, data, null, function (data) {
                if (data["Success"]) {

                    //var list = JSON.parse(data["Msg"]);
                    chartHandler(".js-chart", data["Msg"]);
                }
                else {
                    alert(data["Msg"]);
                }
            });
            timeid = setInterval(function runajax() {

                var url = "/Pollution/getPollutantParaByW";
                var data = { ID: woid };
                core.ajax(url, data, null, function (data) {
                    if (data["Success"]) {

                        //var list = JSON.parse(data["Msg"]);
                        chartHandler(".js-chart", data["Msg"]);
                    }
                    else {
                        alert(data["Msg"]);
                    }
                });

            }, 5000);
        }
    })
    $(selector).children('option[value=' + $(selector).attr("value") + ']').prop('selected', true);
    //AddWasteTypeSon(selector);

}



function AddWasteTypeSon(selector, disabled) {
    if ($(selector).size() <= 0) {
        return;
    }
    var value = $(selector).val();

    var url = "/Business/GetBizList";
    var data = { parentID: value };

    core.ajax(url, data, null, function (data) {
        if (data["Success"]) {

            var list = JSON.parse(data["Msg"]);
            // $(".js-chosen").remove();
            var modelname = "WasteType";
            if ($("#CheckReportTrial").size() > 0) {
                modelname = "WasteEvent"
            }
            $("#wastetypeson").html("");
            $("#wastetypeson").html(selectHtml("具体类型", "Value", modelname, "Text", list.dataRows, disabled));
            if ($(selector).attr("sonvalue") > 0) {
                $("select[name='WasteType']").children("option[value=" + $(selector).attr("sonvalue") + "]").prop('selected', true);
            }
        }
        else {
            alert(data["Msg"]);
        }
    });
}

function addmap() {
    // 百度地图API功能

    var map = new BMap.Map("map");    // 创建Map实例
    var geoc = new BMap.Geocoder();
    if ($("#netgridcenter").size() > 0) {
        var lonlat = $("#netgridcenter").val().split(',');
        map.centerAndZoom(new BMap.Point(lonlat[0], lonlat[1]), 12);
    }
    else {
        map.centerAndZoom(new BMap.Point(110.98, 35.02), 12);  // 初始化地图,设置中心点坐标和地图级别

    }
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("运城");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

    return map;
}
function tablemove(map, selector) {
    //$(selector).children('tr').click(function () {
    //    var id = $(this).find("#select").href();
        
    //})

    $(selector).children(".basic-element").click(function (e) {
        var id = $(this).find(":checkbox").val();
        var url = "/Pollution/getEnterpriseByID";
        var postdata = {};
        postdata.ID = id;
        core.ajax(url, postdata, null, function (data) {
            if (data["Success"]) {
                var json = JSON.parse(data["Msg"]);
                if (json.length > 0) {
                    $("#ehid").val(json[0].ID);
                    $("#ename").html(json[0].Name);
                    //uiHelper.Chosen();
                    //$("#ename").trigger("change");
                    listHelper.list.load(".filebox", {}, null, null, null);
                }
            }
            else {
                alert(data["Msg"]);
            }
        });
    });

    $(selector).children(".status-element").click(function (e) {
        var id = $(this).find(":checkbox").val();
        var url = "/Pollution/getEnterpriseByID";
        var postdata = {};
        postdata.ID = id;
        core.ajax(url, postdata, null, function (data) {
            if (data["Success"]) {
                var json = JSON.parse(data["Msg"]);
                if (json.length > 0) {
                    $("#eacqhid").val(json[0].ID);
                    $("#EName").html(json[0].Name);
                    $("#acqForm").submit();
                    //$('#acqForm').trigger('submit')
                }
            }
            else {
                alert(data["Msg"]);
            }
        });
    });

    
}
//任务查看详情跳转
function selectbtntask(ID) {

    window.location.href = "/Business/TaskSelect?ID=" + ID;
};
//企业查看详情跳转
function selectbtnEnt(ID) {

    window.location.href = "/Business/EnterpriseSelect?ID=" + ID;
};
//网格查看详情跳转
function selectbtnNet(ID) {

    window.location.href = "/Business/NetGridSelect?ID=" + ID;
};
//污染源查看详情跳转
function selectbtnWaste(ID) {

    window.location.href = "/Business/WasteObjectSelect?ID=" + ID;
};
//任务查看详情跳转

function selectbtnTask(ID) {

    window.location.href = "/Business/TaskSelect?ID=" + ID;

}
//地图添加标注
function addmarker(map, demolist) {
    map.clearOverlays();

    var bound = map.getBounds();//地图可视区域
    var allpoints = [];
    for (var i = 0; i < demolist.length; i++) {


        var location = demolist[i];

        var point = new BMap.Point(location.Lon, location.Lat);
        if (point.lng == "" || point.lat == "" || point.lng == null || point.lat == null) {
            continue;
        }
        allpoints.push(point);
        //if (bound.containsPoint(point) != true) {

        //    continue;

        //}
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        (function () {
            var indmark = marker;
            var index = i;
            var sContent = '';
            if ($("#EnterpriseListUl").size() > 0) {
                //企业列表专用地图windowinfo
                var winwidth = $("#map").width();
                winwidth = winwidth * 0.35;
                sContent += '<div class="ibox" style="width:' + winwidth + 'px">' +
                       '<div class="text-center"><h4>' + (demolist[index].Aliase || demolist[index].Name) + '</h4></div>' +
                                     '<ul class="list-group clear-list">' +
                                                      '    <li class="list-group-item fist-item">' +
                 '        <span class="pull-right">' + (demolist[index].Contact == undefined ? '暂无数据' : demolist[index].Contact) + '</span><i class="fa fa-user"></i> 负责人' +
                 '    </li>' +

                 '    <li class="list-group-item ">' +
                 '        <span class="pull-right">' + (demolist[index].Phone == undefined ? '暂无数据' : demolist[index].Phone) + '</span><i class="fa fa-pencil-square-o"></i> 联系电话' +
                 '    </li>' +
                 '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].Address == undefined ? '暂无数据' : demolist[index].Address) + ' </span><i class="fa fa-recycle"></i>联系地址' +
                 '    </li>' +
                                  '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].NetGrid == undefined ? '暂无数据' : demolist[index].NetGrid.Name) + ' </span><i class="fa fa-rocket"></i>所属网格' +
                 '    </li>' +
                '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].Department == undefined ? '暂无数据' : demolist[index].Department.Name) + '</span><i class="fa fa-rss"></i> 所属部门' +
                 '    </li>' +
                              '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (getDictName(demolist[index].FieldID, "EnterpriseType")) + '</span><i class="fa fa-puzzle-piece"></i> 企业类型' +
                 '    </li>' +
                 '</ul>' +
                       ' <strong>污染说明</strong>' +
                                '    <p>' +
                                (demolist[index].WastesInfo == undefined ? '暂无数据' : demolist[index].WastesInfo) +
                                '    </p>' +
                        "<div class='text-center'><button type='button' onclick='selectbtnEnt(" + demolist[index].ID + ")' class='btn btn-w-m btn-info' style='margin-left:20px' >查看详情</button></div>" +

                        '</div></div>'
            }
            else if ($("#NetGridListTable").size() > 0) {
                //网格列表专用地图windowinfo
                var winwidth = $("#map").width();
                winwidth = winwidth * 0.35;
                sContent += sContent += '<div class="ibox" style="width:' + winwidth + 'px">' +
                       '<div class="text-center"><h4>' + (demolist[index].Aliase || demolist[index].Name) + '</h4></div>' +
                    '<ul class="list-group clear-list">' +
                 '    <li class="list-group-item fist-item">' +
                 '        <span class="pull-right">' + (demolist[index].RegionCode == undefined ? '暂无数据' : demolist[index].RegionCode) + '</span><i class="fa fa-pencil-square-o"></i> 区划代码' +
                 '    </li>' +
                 '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].Department == undefined ? '暂无数据' : demolist[index].Department.Name) + ' </span><i class="fa fa-recycle"></i>主管部门' +
                 '    </li>' +
                                  '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].SysUserName == undefined ? '暂无数据' : demolist[index].SysUserName) + ' </span><i class="fa fa-rocket"></i>分管领导' +
                 '    </li>' +
                '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].NetGrid2 == undefined ? '暂无数据' : demolist[index].NetGrid2.Name) + '</span><i class="fa fa-rss"></i> 上级网格' +
                 '    </li>' +
                              '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (getDictName(demolist[index].GridLevel, "NetGridLevel")) + '</span><i class="fa fa-puzzle-piece"></i> 网格级别' +
                 '    </li>' +
                 '</ul>' +
                    ' <strong>备注</strong>' +
                       '    <p>' +
                     (demolist[index].Remark == undefined ? '暂无数据' : demolist[index].Remark) +
                 '    </p>' +
                "<div class='text-center'><button type='button'  onclick='selectbtnNet(" + demolist[index].ID + ")' class='btn btn-w-m btn-info' style='margin-left:20px' >查看详情</button></div>" +

                 '</div></div>';
            }
            else if ($("#WasteObjectListUl").size() > 0) {//污染源
                var winwidth = $("#map").width();
                winwidth = winwidth * 0.35;
                sContent += sContent += '<div class="ibox" style="width:' + winwidth + 'px">' +
                       '<div class="text-center"><h4>' + (demolist[index].Aliase || demolist[index].Name) + '</h4></div>' +
                    '<ul class="list-group clear-list">' +
                                     '    <li class="list-group-item ">' +
                 '        <span class="pull-right">' + (demolist[index].MainWasteInfo == undefined ? '暂无数据' : demolist[index].MainWasteInfo) + '</span><i class="fa fa-ticket"></i> 主要污染物' +
                 '    </li>' +
                                  '    <li class="list-group-item ">' +
                 '        <span class="pull-right">' + (demolist[index].Information == undefined ? '暂无数据' : demolist[index].Information) + '</span><i class="fa fa-tint"></i> 污染源介绍' +
                 '    </li>' +
                 '    <li class="list-group-item ">' +
                 '        <span class="pull-right">' + (demolist[index].Code == undefined ? '暂无数据' : demolist[index].Code) + '</span><i class="fa fa-tag"></i> 污染源编码' +
                 '    </li>' +
                 '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].Enterprise == undefined ? '暂无数据' : demolist[index].Enterprise.Name) + ' </span><i class="fa fa-pencil-square"></i>所属企业' +
                 '    </li>' +
                '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].Address == undefined ? '暂无数据' : demolist[index].Address) + '</span><i class="fa fa-puzzle-piece"></i> 地址' +
                 '    </li>' +
                 '</ul>' +
                    ' <strong>备注</strong>' +
                       '    <p>' +
                     (demolist[index].Remark == undefined ? '暂无数据' : demolist[index].Remark) +
                 '    </p>' +
                "<div class='text-center'><button  onclick='selectbtnWaste(" + demolist[index].ID + ")' class='btn btn-w-m btn-info' style='margin-left:20px' >查看详情</button></div>" +

                 '</div></div>';

            }
            else if ($("#TaskListUl").size() > 0) {
                //任务列表专用地图windowinfo
                var winwidth = $("#map").width();
                winwidth = winwidth * 0.35;
                sContent += sContent += '<div class="ibox" style="width:' + winwidth + 'px">' +
                       '<div class="text-center"><h4>' + (demolist[index].Aliase || demolist[index].Name) + '</h4></div>' +
                    '<ul class="list-group clear-list">' +
                 '    <li class="list-group-item fist-item">' +
                 '        <span class="pull-right">' + (demolist[index].Code == undefined ? '暂无数据' : demolist[index].Code) + '</span><i class="fa fa-tty"></i> 任务编码' +
                 '    </li>' +
                 '    <li class="list-group-item ">' +
                 '        <span class="pull-right">' + (demolist[index].DealLevel == undefined ? '暂无数据' : demolist[index].DealLevel) + '</span><i class="fa fa-tree"></i> 办理级别' +
                 '    </li>' +
                  '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (getDictName(demolist[index].DealStatus, "TaskStep")) + '</span><i class="fa fa-paw"></i> 办理状态' +
                 '    </li>' +
                 '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].NetGrid == undefined ? '暂无数据' : demolist[index].NetGrid.Name) + '</span><i class="fa fa-map-o"></i> 所在网格' +
                 '    </li>' +
                 '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].DealDepartment == undefined ? '暂无数据' : demolist[index].DealDepartment.Name) + ' </span><i class="fa fa-pencil-square"></i>办理单位' +
                 '    </li>' +
                 '   <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].RegiDepartment == undefined ? '暂无数据' : demolist[index].RegiDepartment.Name) + '</span><i class="fa fa-home"></i> 受理单位' +
                 '    </li>' +
                 ' <li class="list-group-item">' +
                 '        <span class="pull-right">' + (demolist[index].Address == undefined ? '暂无数据' : demolist[index].Address) + '</span><i class="fa fa-map-marker"></i> 地址' +
                 '    </li>' +
                 '</ul>' +
                    ' <strong>备注</strong>' +
                       '    <p>' +
                     (demolist[index].Remark == undefined ? '暂无数据' : demolist[index].Remark) +
                 '    </p>' +
                "<div class='text-center'><button type='button'  onclick='selectbtnTask(" + demolist[index].ID + ")' class='btn btn-w-m btn-info' style='margin-left:20px' >查看详情</button></div>" +

                 '</div></div>';
            }
            else {
                sContent = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>" + demolist[index].Name + "</h4>"

                if (demolist[index].Address != undefined) {
                    sContent += "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>地址:" + demolist[index].Address + "</p>";
                }
                if (demolist[index].DealLevel != undefined) {
                    sContent += "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>办理级别:" + demolist[index].DealLevel + "</p>";

                }
                if (demolist[index].RegiDepartment != undefined) {
                    sContent += "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>受理单位:" + demolist[index].RegiDepartment.Name + "</p>";

                }
                if (demolist[index].DealDepartment != undefined) {
                    sContent += "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>受理单位:" + demolist[index].DealDepartment.Name + "</p>";

                }
                if (demolist[index].DealStatus != undefined) {
                    sContent += "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>办理状态:" + ReturnDealStatus(demolist[index].DealStatus) + "</p>";

                }
                if (demolist[index].Enterprise != undefined) {
                    sContent += "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>来源企业:" + demolist[index].Enterprise.Name + "</p>";

                }
                if (demolist[index].Summary != undefined) {
                    sContent += "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>任务摘要:" + demolist[index].Summary + "</p>";
                }
                if (demolist[index].DealStatus != undefined) {
                    sContent += "</br><button  onclick='selectbtntask(" + demolist[index].ID + ")' class='btn btn-w-m btn-info' style='margin-left:20px' >查看详情</button>";
                }
                sContent += "</div>";
            }
            var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
            //markerlist.push(indmark);

            //windowlist.push(infoWindow);
            var jsonmarkermodel = { "ID": demolist[index].ID, "marker": indmark, "window": infoWindow }
            Markerjson.push(jsonmarkermodel);
            indmark.addEventListener("mouseover", function (event) {
                $(lasttr).css("background-color", "");
                this.openInfoWindow(infoWindow);
                var ids = $(".js-list").find(":checkbox");
                for (var z = 0; z < ids.length; z++) {
                    if ($(ids[z]).val() == demolist[index].ID) {
                        var tr;

                        if ($("#EnterpriseListUl").size() <= 0) {
                            tr = $(ids[z]).parent().parent().parent();
                        }
                        else {
                            //企业列表
                            tr = $(ids[z]).parent().parent().parent().parent();
                        }
                        lasttr = tr;
                        $(tr).css("background-color", "#f3f3f4");

                    }
                }

            });
        })();
    } map.setViewport(allpoints)

}

//表单页面的地图初始化和添加标注
function Enterprisemapformload(selector) {
    if ($(selector).size() <= 0) {
        return;
    }
    var geoc = new BMap.Geocoder();
    var map = addmap();
    var modelpoint = Enterprisesetps2(map);
    //一企业一档污染源标注的添加
    EnterpriseMapAddWasteObject("#EnterpriseSelect", map);
    //任务查看添加上报位置marker
    AddReportMarker("#reccejson", map, modelpoint);
    if ($("#EnterpriseSelect").size() > 0) {
        return;
    }
    map.addEventListener("click", function (e) {
        map.clearOverlays();
        var pt = e.point;

        var address = '';
        var location = '';
        $("#Lon").val(pt.lng);
        $("#Lat").val(pt.lat);

        geoc.getLocation(pt, function (rs) {

            var addComp = rs.addressComponents;
            address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
            //表单值输入
            $("input[name='Province']").val(addComp.province);
            $("input[name='City']").val(addComp.city);
            $("input[name='County']").val(addComp.district);
            $("input[name='Address']").val(address);
            location = e.point.lng + ", " + e.point.lat;
            var marker = new BMap.Marker(pt);  // 创建标注
            map.addOverlay(marker);               // 将标注添加到地图中
            var sContent = "<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>" + address + "</h4>" + "</div>";
            var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
            marker.openInfoWindow(infoWindow);
            marker.addEventListener("mouseover", function (event) {
                this.openInfoWindow(infoWindow);
            });
        })
    });

    return map;
}


$(".js-sysroleandpower-button").click(function (e) {
    if (typeof e.preventDefault === "function") {
        e.preventDefault();
    }

    var data = uiHelper.Button.selectedData(".js-data");
    uiHelper.Button.ajaxButtonBattch(".js-sysroleandpower-button", data, function (d) {
        function afterHandler(data) {
            $('#mymodal').modal('hide')
            if (data["Success"]) {
                var nextStepUrl = $(".js-sysroleandpower-button").attr("nextStepUrl") || "";
                location.href = nextStepUrl;
            }
            else {
                alert(data["Msg"]);
            }
        }

        var json = {};
        var jsonTemp = [];
        for (var i in d) {
            if (typeof d[i] !== "undefined" && d[i] != null)
                jsonTemp.push({ "SysPowerID": parseInt(d[i]) });
        }

        json["list"] = dataHelper.fromJSON(jsonTemp);
        var url = $(".js-sysroleandpower-button").attr("url") || $(".js-sysroleandpower-button").attr("href");
        if (typeof core === "undefined") {
            $.getScript("/Scripts/common/apiHandler.js", function (script, textStatus, jqxhr) {
                core.ajax(url, json, null, afterHandler);
            });
        } else {
            core.ajax(url, json, null, afterHandler);
        }
    });
});

function loginout() {
    confirm("你确定退出登录？", function () {
        window.location.href = "Passport/LoginOut";
    });
}

//添加下拉列表代码
function selectHtml(text, key, field, name, list, disabled) {
    var htmlTemplate = "";
    if (field === "MasterId") {
        htmlTemplate = '<div class="form-group ><label>' + text + '</label>';
        htmlTemplate += '<select id="' + field + '" " name="' + field + '"  class="form-control chosen-select-width">';
        for (var i = 0; i <= list.length - 1; i++) {
            htmlTemplate += '<option value="' + list[i][key] + '">' + list[i][name] + '</option>';
        }
        htmlTemplate += '<lect></div>';
    } else {
        htmlTemplate = '<div class="form-group "><label>' + text + '</label>';
        htmlTemplate += '<select id="' + field + '" name="' + field + '"  class="form-control chosen-select-width" >';
        for (var i = 0; i <= list.length - 1; i++) {
            htmlTemplate += '<option value="' + list[i][key] + '">' + list[i][name] + '</option>';
        }
        htmlTemplate += '<lect></div>';
    }

    return htmlTemplate;
}
//添加多选下拉列表
function multipleselectHtml(text, key, field, name, list) {
    var htmlTemplate = "";
    if (field === "MasterId") {
        htmlTemplate = '<div class="form-group ><label>' + text + '</label>';
        htmlTemplate += '<select id="' + field + '" name="' + field + '" multiple = "multiple"  class="chosen-select-width col-sm-11" >';
        for (var i = 0; i <= list.length - 1; i++) {
            htmlTemplate += '<option value="' + list[i][key] + '">' + list[i][name] + '</option>';
        }
        htmlTemplate += '<lect></div>';
    } else {
        htmlTemplate = '<div class="form-group "><label>' + text + '</label>';
        htmlTemplate += '<select id="' + field + '" name="' + field + '" multiple = "multiple"  class="chosen-select-width col-sm-11" >';
        for (var i = 0; i <= list.length - 1; i++) {
            htmlTemplate += '<option value="' + list[i][key] + '">' + list[i][name] + '</option>';
        }
        htmlTemplate += '<lect></div>';
    }

    return htmlTemplate;
}





function ReturnDealStatus(status) {
    var result = "";
    status = status.toString();
    switch (status) {
        case "52": result = "受理"; break;
        case "53": result = "待审"; break;
        case "54": result = "终结"; break;
        case "55": result = "归档"; break;
        case "56": result = "核实"; break;
        case "241": result = "复核"; break;
        case "242": result = "协办"; break;
        case "243": result = "待办"; break;
        case "244": result = "办结"; break;
        case "245": result = "巡查"; break;
        case "246": result = "已上报"; break;
        case "247": result = "办理中"; break;
        default: result = "未知"; break;
    }
    return result;
}

function GetBigImg(name, obj) {
    //var name = $(obj).parent().siblings("div[name='Name']").html();
    var src = $(obj).prop("src");
    $("#bigimgname").html(name);
    $("#bigimg").prop("src", src);
    $('#BigImg').modal('show');
}
//MoveTypes = SXXHX.Bll
//ObjectTypes = SXXHX.B
//SpaceTypes = SXXHX.Bl
//ActiveTypes = SXXHX.B
//PartternTypes = SXXHX
//Components = SXXHX.Bl
//WastTos = SXXHX.Bll.B
function GetWastgeListBySearch(ParentSelector, Value, Text) {
    $(ParentSelector).val(Value)
    $(ParentSelector).html('<i class="fa fa-align-left icon-align-left"></i>' + Text)
    var url = "/Business/GetWastgeListByComponent";
    var data = {
        MoveType: $("#MoveTypeSelect").val(),
        ObjectType: $("#ObjectTypeSelect").val(),
        SpaceType: $("#SpaceTypeSelect").val(),
        ActiveType: $("#ActiveTypeSelect").val(),
        PartternType: $("#PartternTypeSelect").val(),
        Component: $("#ComponentSelect").val(),
        WastTo: $("#WastToSelectSelect").val(),
    };
    core.ajax(url, data, null, function (data) {
        if (data["Success"]) {
            $("#Lon").val("");
            $("#Lat").val(""); $("#Address").val("");
            var map = Enterprisemapformload("#map");
            var list = JSON.parse(data["Msg"]);
            addmarker(map, list);


        }
        else {
            alert(data["Msg"]);
        }
    });
}
function UseComponentAddress(row) {
    $("#Lon").val(row.Lon);
    $("#Lat").val(row.Lat);
    $("#Address").val(row.Address);
}

var TaskMap;
var TaskLastMarker = 0;
var WasteLastMarker = 0;

//添加上报位置标注
function AddReportMarker(selector, map, modelpoint) {

    if ($(selector).size() <= 0) {
        return pointarry;
    }
    var pointarry = [];
    pointarry.push(modelpoint);
    var list = JSON.parse($(selector).val());
    var point;
    var model;
    if (list.length > 0) {

        for (var i = (list.length - 1) ; i > 0; i--) {
            if (list[i].ReportLon == "" || list[i].ReportLon == null || list[i].ReportLat == "" || list[i].ReportLat == null) {
                continue;
            }
            else {
                point = new BMap.Point(list[i].ReportLon, list[i].ReportLat); // 创建点坐标  
                model = list[i];
                break;
            }
        }

        //上报坐标
        TaskMap = map;
        pointarry.push(point);
        map.setViewport(pointarry);
        TaskAddWastemarker(map, model);
        TaskAddDealmarker(map, model);

        //geoc.getLocation( point, function (rs) {

        //    var addComp = rs.addressComponents;
        //   var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;

        //)})
    }

    if ($("#CheckReportTrial").size() > 0) {
        map.addEventListener("click", function (e) {
            var pt = e.point;

            var address = '';
            var location = '';
            $("#ReportLon").val(pt.lng);
            $("#ReportLat").val(pt.lat);
            var geoc = new BMap.Geocoder();

            geoc.getLocation(pt, function (rs) {

                var addComp = rs.addressComponents;
                address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                //表单值输入

                $("input[name='Address']").val(address);
                location = e.point.lng + ", " + e.point.lat;
                var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                    offset: new BMap.Size(10, 25), // 指定定位位置  
                    imageOffset: new BMap.Size(0, 0 - 3 * 25) // 设置图片偏移  
                });
                var marker = new BMap.Marker(pt, { icon: myIcon }); map.addOverlay(marker);               // 将标注添加到地图中
                var sContent = "<div><h4 style='margin:0 0 5px 0;padding:0.2em 0'>" + address + "</h4>" + "</div>";
                var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
                marker.openInfoWindow(infoWindow);
                marker.addEventListener("mouseover", function (event) {
                    this.openInfoWindow(infoWindow);
                });
            })
        });
    }
}

function TaskDealClick(e) {
    TaskMap.removeOverlay(TaskLastMarker);
    TaskMap.removeOverlay(WasteLastMarker)
    var model = $(e).attr("url");
    TaskAddWastemarker(TaskMap, JSON.parse(model));

    TaskAddDealmarker(TaskMap, JSON.parse(model));
}
//任务添加处理位置标注
function TaskAddDealmarker(map, model) {
    point = new BMap.Point(model.ReportLon, model.ReportLat); // 创建点坐标  
    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25), // 指定定位位置  
        imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移  
    });
    var marker = new BMap.Marker(point, { icon: myIcon });
    TaskLastMarker = marker;
    map.addOverlay(marker);
    var winwidth = $("#map").width();
    winwidth = winwidth * 0.45;

    var sContent = '<div class="ibox" style="width:' + winwidth + 'px">' +
               '<div class="text-center"><h4>' + (model.Province) + '</h4></div>' +
            '<ul class="list-group clear-list">' +
         '    <li class="list-group-item fist-item">' +
         '        <span class="pull-right">' + (model.Address) + '</span><i class="fa fa-pencil-square-o"></i> 上报地址' +
         '    </li>' +
        '    <li class="list-group-item">' +
         '        <span class="pull-right">' + (model.ReportTime) + '</span><i class="fa fa-puzzle-piece"></i> 上报时间' +
         '    </li>' +
         '</ul>' +
            ' <strong>巡查结论</strong>' +
               '    <p>' +
        (model.DealRemark == null ? '暂无数据' : model.DealRemark) +
'    </p>' +
         '</div></div>';
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象

    marker.addEventListener("mouseover", function (event) {
        this.openInfoWindow(infoWindow);
    });
}
//任务添加污染标注
function TaskAddWastemarker(map, model) {
    point = new BMap.Point(model.Lon, model.Lat); // 创建点坐标  
    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25), // 指定定位位置  
        imageOffset: new BMap.Size(0, 0 - 2 * 25) // 设置图片偏移  
    });
    var marker = new BMap.Marker(point, { icon: myIcon });
    WasteLastMarker = marker;
    map.addOverlay(marker);
    var winwidth = $("#map").width();
    winwidth = winwidth * 0.45;
    var geoc = new BMap.Geocoder();
    geoc.getLocation(point, function (rs) {

        var addComp = rs.addressComponents;
        var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;

        var sContent = '<div class="ibox" style="width:' + winwidth + 'px">' +
                   '<div class="text-center"><h4>污染位置</h4></div>' +
                '<ul class="list-group clear-list">' +
                                 '    <li class="list-group-item fist-item">' +
                 '        <span class="pull-right">' + (getDictName(model.WasteEvent, "WasteEvent")) + '</span><i class="fa fa-pencil-square-o"></i> 环境污染对象' +
                 '    </li>' +
                 '    <li class="list-group-item ">' +
                 '        <span class="pull-right">' + (getDictName(model.MoveType, "WasteMoveType")) + '</span><i class="fa fa-rocket"></i> 运动方式' +
                 '    </li>' +
                  '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (getDictName(model.ObjectType, "WasteObjectType")) + '</span><i class="fa fa-paw"></i> 污染对象分类' +
                 '    </li>' +
                 '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (getDictName(model.SpaceType, "WasteSpaceType")) + '</span><i class="fa fa-map-o"></i> 空间分布' +
                 '    </li>' +
                 '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (getDictName(model.ActiveType, "WasteActiveType")) + ' </span><i class="fa fa-pencil-square"></i>活动分类' +
                 '    </li>' +
                                  '    <li class="list-group-item">' +
                 '        <span class="pull-right">' + (getDictName(model.PartternType, "WastePartternType")) + '</span><i class="fa fa-pencil-square"></i> 形态分布' +
                 '    </li>' +
             '    <li class="list-group-item fist-item">' +
             '        <span class="pull-right">' + (address) + '</span><i class="fa fa-pencil-square-o"></i> 污染地址' +
             '    </li>' +
             '    <li class="list-group-item">' +
             '        <span class="pull-right">' + (model.WasteRemark == null ? '暂无数据' : model.WasteRemark) + ' </span><i class="fa fa-pencil-square"></i>污染说明' +
             '</div></div>'

        var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象

        marker.addEventListener("mouseover", function (event) {
            this.openInfoWindow(infoWindow);
        })
    })
}

//自动标注地图
function MapAutoLoad(selector) {
    if ($(selector).size() <= 0)
        return;

    var url = $(selector).attr("url") || "";
    if (url === "") {
        return;
    }
    
    var data = {};
    if (typeof core === "undefined") {
        $.getScript("/Scripts/common/apiHandler.js", function (script, textStatus, jqxhr) {
            core.ajax(url, data, null, function (data) {
                if (data["Success"]) {
                    var dataResult = data["Type"] === "Json" ? JSON.parse(data["Msg"]) : data["Msg"];
                    var rows = dataResult["dataRows"];
                    //以下做地图标注
                    addMapMarkers(selector, rows);
                }
                else {
                    alert(data["Msg"]);
                }
            });
        });
    } else {
        core.ajax(url, data, null, function (data) {
            if (data["Success"]) {
                var rows = dataResult["dataRows"];
                //以下做地图标注
                addMapMarkers(selector, rows);
            }
            else {
                alert(data["Msg"]);
            }
        });
    }
}

var clickrelationcode = 0;

function addmap2() {
    // 百度地图API功能

    var map = new BMap.Map("map");    // 创建Map实例
    var geoc = new BMap.Geocoder();
    if ($("#netgridcenter").size() > 0) {
        var lonlat = $("#netgridcenter").val().split(',');
        map.centerAndZoom(new BMap.Point(lonlat[0], lonlat[1]), 12);
    }
    else {
        map.centerAndZoom(new BMap.Point(110.98, 35.02), 12);  // 初始化地图,设置中心点坐标和地图级别

    }
    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    map.setCurrentCity("运城");          // 设置地图显示的城市 此项是必须设置的

    return map;
}
//图表模块添加地图标注
function addMapMarkers(selector, list) {
    var map = addmap2();
    for (var i = 0; i <= list.length - 1; i++) {
        var model = list[i];
        var point = new BMap.Point(model["Lon"], model["Lat"]); // 创建点坐标  
        var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
            offset: new BMap.Size(10, 25), // 指定定位位置  
            imageOffset: new BMap.Size(0, 0 - 12 * 25) // 设置图片偏移  
        });

        var sContent = "<div class='text-center'><span style='margin:0 0 5px 0;padding:0.2em 0'>" + model["Name"] + "</span><br /><small class='text-muted'>点击标注点查看详情</small></div>";
        var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
        var n = typeof netgrid!=="undefined"? netgrid : {};
        if (typeof n[model["ID"]] === "undefined") {
        var marker = new BMap.Marker(point, { icon: myIcon });
        TaskLastMarker = marker;
        map.addOverlay(marker);

        marker.addEventListener("mouseover", function (event) {
            this.openInfoWindow(infoWindow);
        });
        var clickfunc = function (z) {

            marker.addEventListener("click", function (event) {
                var item = list[z - 1];
                clickrelationcode = item.RelationCode;
                //this.openInfoWindow(infoWindow);
                $(".js-modal .modal-title").html(model["Name"]);

                var selector = ".js-chart";
                var data = {
                    RelationCode: clickrelationcode
                };
                var url = $("#demourl").attr("url");//"/Chart/GetEnterpriseData?SeriesType=EntType";
                if (url !== "") {
                    if (typeof core === "undefined") {
                        $.getScript("/Scripts/common/apiHandler.js", function (script, textStatus, jqxhr) {
                            core.ajax(url, data, null, function (data) {
                                if (data["Success"]) {
                                    chartHandler(selector, data["Msg"]);
                                } else {
                                    alert(data["Msg"]);
                                }

                            });
                        });
                    } else {
                        core.ajax(url, data, null, function (data) {
                            if (data["Success"]) {

                                chartHandler(selector, data["Msg"]);
                            } else {
                                alert(data["Msg"]);
                            }
                        });
                    }
                }


                $('.js-modal').modal('show');
            })
        }(i);
        } else {
            //map.enableScrollWheelZoom(false);
            var polygonData = n[model["ID"]];
            var polygon = new BMap.Polygon(polygonData["data"], { strokeColor: "#000000", strokeWeight: 1, strokeOpacity: 1, fillColor: polygonData["color"] });
            map.addOverlay(polygon);

            polygon.addEventListener("mouseover", function (event) {
                this.openInfoWindow(infoWindow);
            });
            var clickfunc = function (z) {
                polygon.addEventListener("click", function (event) {
                    var item = list[z - 1];
                    clickrelationcode = item.RelationCode;
                    //this.openInfoWindow(infoWindow);
                    $(".js-modal .modal-title").html(model["Name"]);

                    var selector = ".js-chart";
                    var data = {
                        RelationCode: clickrelationcode
                    };

                    var url = $("#demourl").attr("url");// "/Chart/GetEnterpriseData?SeriesType=EntType";
                    if (url !== "") {
                        if (typeof core === "undefined") {
                            $.getScript("/Scripts/common/apiHandler.js", function (script, textStatus, jqxhr) {
                                core.ajax(url, data, null, function (data) {
                                    if (data["Success"]) {
                                        chartHandler(selector, data["Msg"]);
                                    } else {
                                        alert(data["Msg"]);
                                    }

                                });
                            });
                        } else {
                            core.ajax(url, data, null, function (data) {
                                if (data["Success"]) {

                                    chartHandler(selector, data["Msg"]);
                                } else {
                                    alert(data["Msg"]);
                                }
                            });
                        }
                    }


                    $('.js-modal').modal('show');
                })
            }(i);
        }


    }
}
//修改图标分类类型
function ChangeSeriesType(Btn) {


    var selector = ".js-chart";
    var data = {
        RelationCode: clickrelationcode
    };
    var url = $(Btn).attr("url");
    if (url !== "") {
        if (typeof core === "undefined") {
            $.getScript("/Scripts/common/apiHandler.js", function (script, textStatus, jqxhr) {
                core.ajax(url, data, null, function (data) {
                    if (data["Success"]) {

                        chartHandler(selector, data["Msg"]);
                    } else {
                        alert(data["Msg"]);
                    }

                });
            });
        } else {
            core.ajax(url, data, null, function (data) {
                if (data["Success"]) {
                    chartHandler(selector, data["Msg"]);
                } else {
                    alert(data["Msg"]);
                }
            });
        }
        
    };
}






