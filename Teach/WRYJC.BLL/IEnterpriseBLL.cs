using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;
using WRYJC.DAL;

namespace WRYJC.BLL
{    
    /*
     * author：戴清
     * 有关系统用户的数据库操作内容
     * 企业对于BLL接口定义
     */
    public interface IEnterpriseBLL
    {
        Response<Enterprise> GetAllEnterprises();

        Response<Enterprise> GetEnterpriseById(decimal id);
    }
}
