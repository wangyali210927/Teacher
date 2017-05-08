using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WRYJC.UI.Models;
using WRYJC.Domain;
using WRYJC.BLL;
using WRYJC.DAL;

namespace WRYJC.UI.Controllers
{
    /*
    * author：戴清
    * 2017-05-07 16:59:47 
    * 展示废气信息的Controller
    */
    public class GasDataController : Controller
    {
        private IGasDataDisplayBLL GasDataDisplay = new GasDataDisplayBLLImpl();
        //
        // GET: /GasData/

        public ActionResult Index()
        {
            Response<GasDayData> data = GasDataDisplay.GetDayDataByID(0); 
            if (!data.isSuccess)
            {
                return View("null");
            }
            GasDayDataView viewData = new GasDayDataView
            {
                Id = data.list[0].ID,
                PollutantPointId = data.list[0].WasteObjectID.ToString()
            };
            return View(viewData);
        }

    }
}
