using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;

namespace WRYJC.DAL
{
    public interface ISysRoleAndSysPowerDAL
    {
        /*
         * 在SysRoleAndSysPower表中
         * 根据Role的id获得所有的权限（power）信息
         */
        Response<SysPower> GetSysPowerByRoleId(decimal id);
    }
}
