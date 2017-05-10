using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.DAL;
using WRYJC.Domain;

namespace WRYJC.BLL
{
    /*
    * author：戴清
    * 2017-05-07 17:00:17
    * 废气数据的BLL层接口实现
    */
    public class GasDayDataBLLImpl : IGasDayDataBLL
    {
        private IGasDayDataDAL gasDayDataDAL = new GasDayDataDALImpl();
        public Response<GasDayData> GetDayDataByID(decimal id)
        {
            Response<GasDayData> data = gasDayDataDAL.GetDayDataByID(0);
            //此处暂时无逻辑内容判断，直接返回data
            return data;
        }

        public Response<GasDayData> GetDayDataByDate(DateTime date)
        {
            Response<GasDayData> res = gasDayDataDAL.GetDayDataByDateRange(date,date);
            if (!res.isSuccess)
            {
                return new Response<GasDayData>()
                {
                    isSuccess = false
                };
            }
            Response<GasDayData> ret = res;
            return ret;
        }
        
        public Response<GasDayData> GetDayDataByDataRange(DateTime from, DateTime to)
        {
            Response<GasDayData> res = gasDayDataDAL.GetDayDataByDateRange(from,to);
            if (!res.isSuccess)
            {
                return new Response<GasDayData>()
                {
                    isSuccess = false
                };
            }
            Response<GasDayData> ret = res;
            return ret;
        }

        public Response<GasDayData> GetDayDataByPollutionPointId(decimal id)
        {
            return gasDayDataDAL.GetDayDataByPollutionPointId(id);
        }
    }
}
