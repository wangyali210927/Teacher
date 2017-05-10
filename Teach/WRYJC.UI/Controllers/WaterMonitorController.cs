using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WRYJC.BLL;
using WRYJC.DAL;
using WRYJC.UI.Models;

namespace WRYJC.UI.Controllers
{
    /*
     * author : 戴清
     * 2017-05-10 20:23:38
     * 完成废水在线监测部分controller
     */
    public class WaterMonitorController : LoginController
    {
        IEnterpriseBLL enterpriseBll = new EnterpriseBLLImpl();
        IPollutionPointBLL pollitionPointBLL = new PollutionPointBLLImpl();
        //
        // GET: /WaterData/

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
