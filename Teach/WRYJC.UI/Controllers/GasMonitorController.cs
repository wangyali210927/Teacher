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
        //
        // GET: /GasMonitor/

        public ActionResult Index()
        {
            return View();
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
