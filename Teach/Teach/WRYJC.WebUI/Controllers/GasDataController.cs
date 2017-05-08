using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WRYJC.WebUI.Models;
using WRYJC.BLL;
using WRYJC.DAL;

namespace WRYJC.WebUI.Controllers
{
    public class GasDataController : Controller
    {
        private IGasDataDisplay GasDataDisplay = new GasDataDisplay();
        //
        // GET: /GasData/

        public ActionResult Index()
        {
            GasDayData data = GasDataDisplay.getDayDataByID(0);
            GasDayDataView viewData = new GasDayDataView
            {
                Id = data.ID,
                PollutantPointId = data.WasteObjectID.ToString()
            };
            return View(viewData);
        }

    }
}
