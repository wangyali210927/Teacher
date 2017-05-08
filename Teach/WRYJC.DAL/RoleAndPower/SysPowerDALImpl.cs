using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;

namespace WRYJC.DAL
{
    public class SysPowerDALImpl : ISysPowerDAL
    {
        public Response<SysPower> GetAllPowers()
        {
            List<SysPower> list;
            var db = new DataWRYJCDataContext();
            list = (from item in db.SysPower select item).ToList();
            return new Response<SysPower>
            {
                isSuccess = true,
                list = list
            };
        }

    }
}
