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
     * 2017-05-09 16:32:22
     * 有关企业信息的数据库操作接口定义
     */
    public interface IEnterpriseDAL
    {
        Response<Enterprise> GetAllEnterprises();

        Response<Enterprise> GetEnterPriseById(decimal id);
    }
}
