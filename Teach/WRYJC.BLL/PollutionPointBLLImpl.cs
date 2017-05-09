using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.DAL;
using WRYJC.Domain;

namespace WRYJC.BLL
{
    public class PollutionPointBLLImpl : IPollutionPointBLL
    {
        IPollutionPointDAL pollutionPointDal = new PollutionPointDALImpl();
        public Response<PollutionPoint> GetAllPollutionPoints()
        {
            return pollutionPointDal.GetAllPollutionPoints();
        }
    }
}
