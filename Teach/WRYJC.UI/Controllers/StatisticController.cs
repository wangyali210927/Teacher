using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WRYJC.UI.Controllers.Base;
using WRYJC.BLL;
using WRYJC.DAL;
using WRYJC.Domain;
using WRYJC.UI.Models;

namespace WRYJC.UI.Controllers
{
    /*
     * author : 戴清
     * 2017-05-10 19:40:45
     * 完成污染源联网率部分controller
     */
    public class StatisticController : LoginedController
    {
        //
        // GET: /Statistic/
        IEnterpriseBLL enterpriseBll = new EnterpriseBLLImpl();
        IPollutionPointBLL pollitionPointBLL = new PollutionPointBLLImpl();
        public ActionResult Index()
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

    }
}
