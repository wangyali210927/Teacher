using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Base.Common;
using Base.Common.Utilities;
using WRYJC.UI.Controllers.Base;
using WRYJC.DAL;
using WRYJC.BLL;
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
        /// </summary>
        /// <returns></returns>
        public ActionResult GetPollutantParaByPollutionPoint(PollutionPoint model)
        {
            decimal id = model.Id;
            return null;
        }
    }
}
