using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;

namespace WRYJC.DAL
{
    /*
     * author：戴清
     * 2017-05-07 17:01:01
     * 有关气体日数据的数据库操作内容
     */
    public interface IGasDayDataDAL
    {
        Response<GasDayData> GetDayDataByID(decimal id);

        Response<GasDayData> GetDayDataByDateRange(DateTime from,DateTime to);

        Response<GasDayData> GetDayDataByPollutionPointId(decimal id);
    }
}
