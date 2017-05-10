using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.DAL;
using WRYJC.Domain;

namespace WRYJC.BLL
{
    public class EnterpriseBLLImpl : IEnterpriseBLL
    {
        private IEnterpriseDAL enterpriseDal = new EnterpriseDALImpl();
        public Response<Enterprise> GetAllEnterprises()
        {
            return enterpriseDal.GetAllEnterprises();
        }
    }
}
