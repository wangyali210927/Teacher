using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;

namespace WRYJC.DAL
{
    public class EnterpriseDALImpl : IEnterpriseDAL
    {
        public Response<Enterprise> GetAllEnterprises()
        {
            var db = new DataWRYJCDataContext();
            List<Enterprise> list = (from item in db.Enterprise select item).ToList();
            return new Response<Enterprise>()
            {
                list = list,
                isSuccess = true
            };
        }

        public Response<Enterprise> GetEnterPriseById(decimal id)
        {
            var db = new DataWRYJCDataContext();
            List<Enterprise> list = (from item in db.Enterprise
                                     where item.Id == id
                                     select item).ToList();
            return new Response<Enterprise>()
            {
                list = list,
                isSuccess = true
            };
        }
    }
}
