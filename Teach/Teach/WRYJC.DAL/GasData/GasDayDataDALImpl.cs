using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;

namespace WRYJC.DAL
{
    /*
     * 2017-05-07 17:02:31
     * author：戴清
     * 气体日数据的获取的接口实现
     */
    public class GasDayDataDALImpl : IGasDayDataDAL
    {
        public Response<GasDayData> GetDayDataByID(decimal id)
        {
            var db = new DataWRYJCDataContext();
            List<GasDayData> list = (from item in db.GasDayData where (id.Equals(item.ID)) select item).ToList();
            if (list.Count != 1)
                return new Response<GasDayData>
                {
                    isSuccess = false
                };
            else
                return new Response<GasDayData>{
                    list = list,
                    isSuccess = true
                };
        }
        //张雪婷
        public Response<GasDayData> GetDayDataByDateRange(DateTime from, DateTime to)
        {
            var db = new DataWRYJCDataContext();
            //List<GasDayData> list = (from item in db.GasDayData where())
            Response<GasDayData> res = null;
            return res;
        }
    }
}
