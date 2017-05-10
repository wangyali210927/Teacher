using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Base.Data.Charts.Models;

namespace WRYJC.UI.Models
{
    public class EntChartModel
    {
        public Pie Pie { get; set; }
        public List<Column> Column { get; set; }
        public EntChartModel()
        {
            Column = new List<Column>();
        }
    }
}
