using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Base.Common;
using WRYJC.UI.Controllers.Base;
using WRYJC.BLL;
using WRYJC.DAL;
using WRYJC.Domain;
using WRYJC.UI.Models;
using System.Diagnostics;

namespace WRYJC.UI.Controllers
{
    /*
    * author：戴清
    * 2017-05-09 16:39:38
    * 废气污染源监控部分controller
    */
    public class GasMonitorController : LoginController
    {
        IEnterpriseBLL enterpriseBll = new EnterpriseBLLImpl();
        IPollutionPointBLL pollitionPointBLL = new PollutionPointBLLImpl();
        //
        // GET: /GasMonitor/
        public ActionResult Index()
        {
            List<Enterprise> list = enterpriseBll.GetAllEnterprises().list;
            GasMonitorView viewModel = new GasMonitorView()
            {
                listEnterprises = list
            };
            return View(viewModel);
            //return Content(true, viewModel, ResultType.Json);
        }
        public ActionResult getPollutionPoints(FormCollection form,string Id)
        {
            List<Enterprise> list = enterpriseBll.GetAllEnterprises().list;
            List<PollutionPoint> listPollutionPoints = pollitionPointBLL.GetAllPollutionPoints().list;
            GasMonitorView viewModel = new GasMonitorView()
            {
                listEnterprises = list,
                listPollutionPoints = listPollutionPoints
            }; 
            return View(viewModel);
        }
        public ActionResult getGasDayData(FormCollection form)
        {
            IGasDataDisplayBLL gasDataBLL = new GasDataDisplayBLLImpl();
            Response<GasDayData> res = gasDataBLL.GetDayDataByID(0); ;
            List<GasDayData> list = res.list;
            //bll.GetListByPage2(PageNumber, PageSize, out TotalCount, form, SortField, SortOrder);
            return Content(true, list, ResultType.Json);
        }
    }
}
