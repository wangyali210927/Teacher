using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WRYJC.UI.Models
{
    /*
     * controller向前台传数据的demo
     * 根据前台需要的数据添加内容，绑定前台数据
     */
    public class GasDayDataView
    {
        public string Id{get;set;}
        public string PollutantPointId { get; set; }
    }
}