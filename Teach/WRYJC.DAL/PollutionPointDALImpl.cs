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
     * 2017-05-10 11:25:32
     */
    public class PollutionPointDALImpl : IPollutionPointDAL
    {
        public Response<PollutionPoint> GetAllPollutionPoints()
        {
            var db = new DataWRYJCDataContext();
            List<PollutionPoint> list = (from item in db.PollutionPoint
                                         select item).ToList();
            return new Response<PollutionPoint>()
            {
                list = list,
                isSuccess = true
            };
        }
        public Response<PollutionPoint> GetPollutionPointByEnterpriseId(decimal id)
        {
            var db = new DataWRYJCDataContext();
            List<PollutionPoint> list = (from item in db.PollutionPoint
                                         where item.EnterpriseId == id
                                         select item).ToList();
            return new Response<PollutionPoint>()
            {
                list = list,
                isSuccess = true
            };
        }
    }
}
