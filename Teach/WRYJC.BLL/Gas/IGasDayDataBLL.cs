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
     * 2017-05-07 17:05:33
     * 有关展示废气数据的BLL层接口定义   
     */
    public interface IGasDataDisplayBLL
    {
        Response<GasDayData> GetDayDataByID(decimal id);
        
        Response<GasDayData> GetDayDataByDate(DateTime date);
        
        Response<GasDayData> GetDayDataByDataRange(DateTime from, DateTime to);

        //张晗
        //Response<GasDayData> getDayDataByPollutionPointID(decimal id);
    }
}
