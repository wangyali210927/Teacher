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
    public class GasDataDisplayBLLImpl : IGasDataDisplayBLL
    {
        private IGasDayDataDAL GasDayData = new GasDayDataDALImpl();
        public Response<GasDayData> GetDayDataByID(decimal id)
        {
            Response<GasDayData> data = GasDayData.GetDayDataByID(0);
            //此处暂时无逻辑内容判断，直接返回data
            return data;
        }

        //张晗
        public Response<GasDayData> GetDayDataByDate(DateTime date)
        {
            Response<GasDayData> ret = null;
            return ret;
        }
        //张彦
        public Response<GasDayData> GetDayDataByDataRange(DateTime from, DateTime to)
        {
            Response<GasDayData> ret = null;
            List<GasDayData> res = null;
            return ret;
        }
    }
}
