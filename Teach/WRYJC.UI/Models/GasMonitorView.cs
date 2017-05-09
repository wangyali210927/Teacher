using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WRYJC.Domain;
using WRYJC.DAL;

namespace WRYJC.UI.Models
{
    /*
     * author:戴清
     * 2017-05-09 16:49:16
     * 废气监控数据controller向前台传数据的模型
     */
    public class GasMonitorView
    {
        public List<Enterprise> listEnterprises { get; set; }
        public List<PollutionPoint> listPollutionPoints { get;set; }
    }
}