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
     * author : 戴清
     * 2017-05-10 11:32:26
     */
    public class PollutionPointBLLImpl : IPollutionPointBLL
    {
        IPollutionPointDAL pollutionPointDal = new PollutionPointDALImpl();
        public Response<PollutionPoint> GetAllPollutionPoints()
        {
            return pollutionPointDal.GetAllPollutionPoints();
        }
        public Response<PollutionPoint> GetPollutionPointsByEnterpriseId(decimal id)
        {
            return pollutionPointDal.GetPollutionPointByEnterpriseId(id);
        }
    }
}
