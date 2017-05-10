using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;

namespace WRYJC.DAL
{
    /*
     * author : 戴清
     * 2017-05-10 11:24:17
     * 有关污染点的获取内容
     */
    public interface IPollutionPointDAL
    {
        Response<PollutionPoint> GetAllPollutionPoints();
        Response<PollutionPoint> GetPollutionPointByEnterpriseId(decimal id);
    }
}
