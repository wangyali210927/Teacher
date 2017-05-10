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
     * 2017-05-10 20:22:31
     * 完成污染源报警情况controller
     */
    public class PollutionPointAlarmController : LoginedController
    {
        IEnterpriseBLL enterpriseBll = new EnterpriseBLLImpl();
        IPollutionPointBLL pollitionPointBLL = new PollutionPointBLLImpl();
        //
        // GET: /PollutionPointAlarm/

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
