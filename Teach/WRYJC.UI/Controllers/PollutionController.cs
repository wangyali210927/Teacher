using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Base.Common;
using Base.Common.Utilities;
using Base.Data.Charts;
using Base.Data.Charts.Models;
using WRYJC.UI.Controllers.Base;
using WRYJC.UI.Models;
using WRYJC.DAL;
using WRYJC.BLL;
using WRYJC.BLL.Gas;
using WRYJC.Domain;

namespace WRYJC.UI.Controllers
{
    /*
     * author : 戴清
     * 2017-05-10 11:47:35
     * 完成污染源监控部分controller
     */
    public class PollutionController : LoginedController
    {

        IPollutionPointBLL pollutionPointBLL = new PollutionPointBLLImpl();
        IGasDayDataBLL gasDayDataBLL = new GasDayDataBLLImpl();
        //
        // GET: /Pollution/
        [HttpGet]
        public ActionResult MonitorPoint()
        {
            ViewData["title"] = "监控点监测";
            return View();
        }
        /// <summary>
        /// 根据前端企业内容向前端返回新的数据
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ActionResult GetPollutionPointByEnterprise(Enterprise model)
        {
            decimal id = model.Id;
            Response<PollutionPoint> res = pollutionPointBLL.GetPollutionPointsByEnterpriseId(id);
            return Content(true, res.list.ToString(), ResultType.Json);
        }

        /// <summary>
        /// 得到污染源数据，并向前台返回图表
        /// 暂时返回内容为日数据、此处需要使用实时数据
        /// </summary>
        /// <returns></returns>
        public ActionResult GetPollutantDataByPollutionPoint(PollutionPoint model)
        {
            decimal id = model.Id;
            Response<GasDayData> resDayData = gasDayDataBLL.GetDayDataByPollutionPointId(id);
            EntChartModel resultModel = new EntChartModel();

            List<EntChartModelColumn> lineList = new List<EntChartModelColumn>();
            lineList.Add(new EntChartModelColumn()
            {
                ID = Convert.ToInt32(resDayData.list[0].Id),
                Name = resDayData.list[0].PCode,
                Entcount1 = 1,
                Entcount2 = 3,
                Entcount3 = 2,
                Entcount4 = 5,
                Entcount5 = 4,
                Entcount6 = 6
            });
            List<LineOrColumnSeries> lineSeries = new List<LineOrColumnSeries>();
            foreach (var item in lineList)
            {
                List<decimal> data = new List<decimal>();
                data.Add(item.Entcount1);
                data.Add(item.Entcount2);
                data.Add(item.Entcount3);
                data.Add(item.Entcount4);
                data.Add(item.Entcount5);
                data.Add(item.Entcount6);
                lineSeries.Add(new LineOrColumnSeries()
                {
                    name = item.Name,
                    data = data
                });
            }
            Dictionary<string, string> toolTip = new Dictionary<string, string>();
            //toolTip.Add("valueSuffix","");
            List<string> category = new List<string>();
            category.Add(DateTime.Now.AddDays(-5).Day + "日");
            category.Add(DateTime.Now.AddDays(-4).Day + "日");
            category.Add(DateTime.Now.AddDays(-3).Day + "日");
            category.Add(DateTime.Now.AddDays(-2).Day + "日");
            category.Add(DateTime.Now.AddDays(-1).Day + "日");
            category.Add(DateTime.Now.Day + "日");
            Column line = Charts.SetColumn(resDayData.list[0].PCode, DateTime.Now.ToString("yyyy年mm月dd日")
                , "总量", toolTip, category, lineSeries);
            resultModel.Column.Add(line);
            return Content(true, resultModel.ToJsonString(), ResultType.Json);
        }


        #region 企业首页
        /// <summary>
        /// 根据ID，得到企业
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ActionResult getEnterpriseByID(Enterprise model)
        {
            decimal id = model.Id;
            IEnterpriseBLL bll = new EnterpriseBLLImpl();
            List<Enterprise> list = bll.GetEnterpriseById(id).list;
            return Content(true, list.ToJsonString(), ResultType.Json);
        }
        /// <summary>
        /// 根据企业，得到上报率
        /// uncensored
        /// </summary>
        /// <param name="form"></param>
        /// <returns></returns>
        public ActionResult getReportRate(FormCollection form)
        {
            //decimal id = model.ID.Value;
            IDataCollectDeviceBLL bll = new DataCollectBLLImpl();
            var list = new List<DataCollectDevice>();
            //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
            return Content(true, list, ResultType.Json);
        }
        #endregion

        // uncensored
        #region 监测数据
        public ActionResult getSumData(FormCollection form)
        {
            IDataCollectDeviceBLL bll = new DataCollectBLLImpl();
            var list = new List<DataCollectDevice>();
            //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
            return Content(true, list, ResultType.Json);
        }
        #endregion

        #region 报警处置
        public ActionResult getPollutOverData(FormCollection form)
        {
            //PollutionAlarmBll bll = new PollutionAlarmBll();
            //var list = new List<PollutionAlarm>();
            //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
            //return Content(true, list, ResultType.Json);
            return null;
        }

        public ActionResult getDataDropData(FormCollection form)
        {
            IDataCollectDeviceOfflineBLL bll = new DataCollectDeviceOfflineBLLImpl();
            var list = new List<DataCollectDviceOffline>();
            //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
            return Content(true, list, ResultType.Json);
        }

        public ActionResult getPollutOverInfoByID(FormCollection form, string ID)
        {
            if (Request.HttpMethod == HttpMethod.Get)
            {
                return View("PollutOverInfoForm");
            }
            else
            {
                IDataCollectDeviceBLL bll = new DataCollectBLLImpl();
                var list = new List<DataCollectDevice>();
                //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
                return Content(true, list, ResultType.Json);
            }
        }

        public ActionResult getPollutOverDealByID(FormCollection form, string ID)
        {
            if (Request.HttpMethod == HttpMethod.Get)
            {
                return View("PollutOverDealForm");
            }
            else
            {
                IDataCollectDeviceBLL bll = new DataCollectBLLImpl();
                var list = new List<DataCollectDevice>();
                //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
                //return Content(true, list, ResultType.Json);
                return null;
            }
        }

        public ActionResult getDataDropDealByID(FormCollection form, string ID)
        {
            if (Request.HttpMethod == HttpMethod.Get)
            {
                return View("PollutOverDealForm");
            }
            else
            {
                IDataCollectDeviceBLL bll = new DataCollectBLLImpl();
                var list = new List<DataCollectDevice>();
                //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
                return Content(true, list, ResultType.Json);
            }
        }
        #endregion

        public ActionResult getRealtimeStatus(FormCollection form)
        {
            //PollutionAlarmBll bll = new PollutionAlarmBll();
            //var list = new List<PollutionAlarm>();
            //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
            //return Content(true, list, ResultType.Json);
            return null;
        }

        public ActionResult getHistoryStatus(FormCollection form)
        {
            //PollutionAlarmBll bll = new PollutionAlarmBll();
            //var list = new List<PollutionAlarm>();
            //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
            //return Content(true, list, ResultType.Json);
            return null;
        }

        public ActionResult getAlarmByID(FormCollection form)
        {
            //PollutionAlarmBll bll = new PollutionAlarmBll();
            //var list = new List<PollutionAlarm>();
            //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
            //return Content(true, list, ResultType.Json);
            return null;
        }

        public ActionResult getAttByE(FormCollection form)
        {
            //PollutionAlarmBll bll = new PollutionAlarmBll();
            //var list = new List<PollutionAlarm>();
            //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
            //return Content(true, list, ResultType.Json);
            return null;
        }

        /// <summary>
        /// 得到企业树
        /// </summary>
        /// <param name="form"></param>
        /// <returns></returns>
        //public ActionResult EnterpriseTree(FormCollection form)
        //{
        //    if (Request.HttpMethod == HttpMethod.Get)
        //    {
        //        ViewData["title"] = "附件管理";
        //        //ViewData["currentPowers"] = CurrentPowerList;
        //        return View();
        //    }
        //    else
        //    {
        //        EnterpriseBll bll = new EnterpriseBll();
        //        var list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
        //        var treeList = new List<TreeViewModel>();
        //        foreach (Enterprise item in list)
        //        {
        //            TreeViewModel tree = new TreeViewModel();
        //            bool hasChildren = list.Count(t => t.ID == item.ID) != 0 ? false : true;
        //            tree.id = "e" + item.ID.ToString();
        //            tree.name = item.Name;
        //            tree.t = item.Name;
        //            tree.pId = "0";
        //            treeList.Add(tree);

        //            decimal id = item.ID;
        //            WasteObjectBll wobll = new WasteObjectBll();
        //            var wolist = new List<View_WasteObject>();
        //            wolist = wobll.GetWasteObjectByE(id);
        //            foreach (View_WasteObject vw in wolist)
        //            {
        //                tree = new TreeViewModel();
        //                tree.id = "w" + vw.ID.ToString();
        //                tree.name = vw.Name;
        //                tree.t = vw.Name;
        //                tree.pId = "e" + id.ToString();
        //                treeList.Add(tree);

        //                decimal wid = vw.ID;
        //                DataCollectBll dcbll = new DataCollectBll();
        //                var dclist = new List<DataCollect>();
        //                dclist = dcbll.GetDataCollectByW(wid);
        //                foreach (DataCollect vd in dclist)
        //                {
        //                    tree = new TreeViewModel();
        //                    tree.id = "d" + vd.ID.ToString();
        //                    tree.name = vd.Name;
        //                    tree.t = vd.Name;
        //                    tree.pId = "w" + wid.ToString();
        //                    treeList.Add(tree);
        //                }

        //                PollutantParaBll ppbll = new PollutantParaBll();
        //                var pplist = new List<PollutantPara>();
        //                pplist = ppbll.GetPollutantParaByW(wid);
        //                foreach (PollutantPara pp in pplist)
        //                {
        //                    tree = new TreeViewModel();
        //                    tree.id = "p" + pp.ID.ToString();
        //                    tree.name = pp.Code;
        //                    tree.t = pp.Code;
        //                    tree.pId = "w" + wid.ToString();
        //                    treeList.Add(tree);
        //                }
        //                MonitorEquipBll mebll = new MonitorEquipBll();
        //                var melist = new List<MonitorEquip>();
        //                melist = mebll.GetMonitorEquipByW(wid);
        //                foreach (MonitorEquip me in melist)
        //                {
        //                    tree = new TreeViewModel();
        //                    tree.id = "m" + me.ID.ToString();
        //                    tree.name = me.Name;
        //                    tree.t = me.Name;
        //                    tree.pId = "w" + wid.ToString();
        //                    treeList.Add(tree);
        //                }
        //            }
        //            ControlFacilityBll cfbll = new ControlFacilityBll();
        //            var cflist = new List<ControlFacility>();
        //            cflist = cfbll.GetControlFacilityByE(id);
        //            foreach (ControlFacility cf in cflist)
        //            {
        //                tree = new TreeViewModel();
        //                tree.id = "c" + cf.ID.ToString();
        //                tree.name = cf.Name;
        //                tree.t = cf.Name;
        //                tree.pId = "e" + id.ToString();
        //                treeList.Add(tree);
        //            }
        //        }
        //        return Content(true, treeList, ResultType.Json, treeList.ToJsonString());
        //    }
        //}

        //public ActionResult GetTreeJson(FormCollection form)
        //{
        //    EnterpriseBll bll = new EnterpriseBll();
        //    var list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
        //    var treeList = new List<TreeViewModel>();
        //    foreach (Enterprise item in list)
        //    {
        //        TreeViewModel tree = new TreeViewModel();
        //        bool hasChildren = list.Count(t => t.ID == item.ID) != 0 ? false : true;
        //        tree.id = item.ID.ToString();
        //        tree.name = item.Name;
        //        //tree.value = item.ID.ToString();
        //        tree.pId = "";
        //        //tree.isexpand = true;
        //        //tree.complete = true;
        //        //tree.hasChildren = hasChildren;
        //        treeList.Add(tree);
        //    }
        //    var str = "[{id:\"node1\", text:\"node 1\", value:\"1\", showcheck:false,checkstate:0, hasChildren:true, isexpand:false, complete:false, ChildNodes:[] }]";
        //    return Content(str);
        //}

        public ActionResult getWasteObjectDataByID(Enterprise model)
        {
            decimal id = model.Id;
            List<PollutionPoint> list = new List<PollutionPoint>();
            list = pollutionPointBLL.GetPollutionPointsByEnterpriseId(id).list;

            //PollutantParaBll ppbll = new PollutantParaBll();
            //var pplist = new List<PollutantPara>();
            //pplist = ppbll.GetPollutantParaByW(id);

            //EntChartModel resultmodel = new EntChartModel();
            //Random ra = new Random();


            ////线图
            //List<EntChartModelColumn> Linelist = new List<EntChartModelColumn>();
            //for (int i = 0; i < pplist.Count; i++)
            //{
            //    int val = ra.Next(10);
            //    Linelist.Add(new EntChartModelColumn() { ID = Convert.ToInt32(pplist[i].ID), Name = pplist[i].Code, Entcount1 = val + 1, Entcount2 = val + 3, Entcount3 = val + 2, Entcount4 = val + 5, Entcount5 = val + 4, Entcount6 = val + 6 });
            //}
            //List<LineOrColumnSeries> lineseries = new List<LineOrColumnSeries>();

            //foreach (var item in Linelist)
            //{
            //    List<decimal> data = new List<decimal>();
            //    data.Add(item.Entcount1);
            //    data.Add(item.Entcount2);
            //    data.Add(item.Entcount3);
            //    data.Add(item.Entcount4);
            //    data.Add(item.Entcount5);
            //    data.Add(item.Entcount6);
            //    lineseries.Add(new LineOrColumnSeries() { name = item.Name, data = data });
            //}
            //Dictionary<string, string> toolTip = new Dictionary<string, string>();
            //toolTip.Add("valueSuffix", "家");
            //List<string> category = new List<string>();
            //category.Add((DateTime.Now.AddMonths(-5).Month + "月"));
            //category.Add((DateTime.Now.AddMonths(-4).Month + "月"));
            //category.Add((DateTime.Now.AddMonths(-3).Month + "月"));
            //category.Add((DateTime.Now.AddMonths(-2).Month + "月"));
            //category.Add((DateTime.Now.AddMonths(-1).Month + "月"));
            //category.Add((DateTime.Now.Month) + "月");
            //var line = Charts.SetColumn(list[0].Name, DateTime.Now.ToString("yyyy年MM月"), "总量", toolTip, category, lineseries);
            //resultmodel.Column.Add(line);
            //list[0].RegionCode = resultmodel.ToJsonString();
            //return Content(true, list.ToJsonString(), ResultType.Json);

            return null;
        }

        public ActionResult getWasteObjectByID(PollutionPoint model)
        {
            decimal id = model.Id;
            List<PollutionPoint> list = new List<PollutionPoint>();
            list = pollutionPointBLL.GetPollutionPointsByEnterpriseId(id).list;
            return Content(true, list.ToJsonString(), ResultType.Json);
        }

        public ActionResult getAttByW(FormCollection form)
        {
            //PollutionAlarmBll bll = new PollutionAlarmBll();
            //var list = new List<PollutionAlarm>();
            //list = bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
            //return Content(true, list, ResultType.Json);
            return null;
        }
        #region 污染物数据查询
        /// <summary>
        /// 污染物数据查询
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        //public ActionResult getPollutantParaDataByID(PollutantPara model)
        //{
        //    decimal id = model.ID;

        //    PollutantParaBll ppbll = new PollutantParaBll();
        //    var pplist = new List<PollutantPara>();
        //    pplist = ppbll.GetPollutantParaByID(id);

        //    EntChartModel resultmodel = new EntChartModel();
        //    Random ra = new Random();


        //    //线图
        //    List<EntChartModelColumn> Linelist = new List<EntChartModelColumn>();
        //    for (int i = 0; i < pplist.Count; i++)
        //    {
        //        int val = ra.Next(10);
        //        Linelist.Add(new EntChartModelColumn() { ID = Convert.ToInt32(pplist[i].ID), Name = pplist[i].Code, Entcount1 = val + 1, Entcount2 = val + 3, Entcount3 = val + 2, Entcount4 = val + 5, Entcount5 = val + 4, Entcount6 = val + 6 });
        //    }
        //    List<LineOrColumnSeries> lineseries = new List<LineOrColumnSeries>();

        //    foreach (var item in Linelist)
        //    {
        //        List<decimal> data = new List<decimal>();
        //        data.Add(item.Entcount1);
        //        data.Add(item.Entcount2);
        //        data.Add(item.Entcount3);
        //        data.Add(item.Entcount4);
        //        data.Add(item.Entcount5);
        //        data.Add(item.Entcount6);
        //        lineseries.Add(new LineOrColumnSeries() { name = item.Name, data = data });
        //    }
        //    Dictionary<string, string> toolTip = new Dictionary<string, string>();
        //    toolTip.Add("valueSuffix", "家");
        //    List<string> category = new List<string>();
        //    category.Add((DateTime.Now.AddMonths(-5).Month + "月"));
        //    category.Add((DateTime.Now.AddMonths(-4).Month + "月"));
        //    category.Add((DateTime.Now.AddMonths(-3).Month + "月"));
        //    category.Add((DateTime.Now.AddMonths(-2).Month + "月"));
        //    category.Add((DateTime.Now.AddMonths(-1).Month + "月"));
        //    category.Add((DateTime.Now.Month) + "月");
        //    var line = Charts.SetColumn(Linelist[0].Name, DateTime.Now.ToString("yyyy年MM月"), "总量", toolTip, category, lineseries);
        //    resultmodel.Column.Add(line);
        //    Linelist[0].BizCode = resultmodel.ToJsonString();
        //    return Content(true, Linelist.ToJsonString(), ResultType.Json);
        //}
        #endregion

        #region 污染物报警查询
        //public ActionResult getPollutantParaAlarmByID(PollutantPara model)
        //{
        //    decimal id = model.ID;

        //    PollutantParaBll ppbll = new PollutantParaBll();
        //    var pplist = new List<PollutantPara>();
        //    pplist = ppbll.GetPollutantParaByID(id);

        //    return Content(true, pplist.ToJsonString(), ResultType.Json);
        //}

        //public ActionResult getPollutOverDataByPoll(FormCollection form)
        //{
        //    PollutionAlarmBll bll = new PollutionAlarmBll();
        //    var list = new List<PollutionAlarm>();
        //    list = bll.GetListByPolPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
        //    return Content(true, list, ResultType.Json);
        //}
        #endregion

        //public ActionResult getDropDataByID(DataCollect model)
        //{
        //    decimal id = model.ID.Value;
        //    DataCollectBll bll = new DataCollectBll();
        //    var list = new List<DataCollect>();
        //    list = bll.GetDataCollectByID(id);
        //    return Content(true, list.ToJsonString(), ResultType.Json);
        //}
        //public ActionResult getDropDataByW(FormCollection form)
        //{
        //    PollutionAlarmBll bll = new PollutionAlarmBll();
        //    var list = new List<PollutionAlarm>();
        //    list = bll.GetListByPolPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
        //    return Content(true, list, ResultType.Json);
        //}

        //public ActionResult getMonitorEquipByID(MonitorEquip model)
        //{
        //    decimal id = model.ID;
        //    MonitorEquipBll bll = new MonitorEquipBll();
        //    var list = new List<MonitorEquip>();
        //    list = bll.GetMonitorEquipByID(id);
        //    return Content(true, list.ToJsonString(), ResultType.Json);
        //}

        //public ActionResult getControlFacilityByID(ControlFacility model)
        //{
        //    decimal id = model.ID.Value;
        //    ControlFacilityBll bll = new ControlFacilityBll();
        //    var list = new List<ControlFacility>();
        //    list = bll.GetControlFacilityByID(id);
        //    return Content(true, list.ToJsonString(), ResultType.Json);
        //}
    }
}