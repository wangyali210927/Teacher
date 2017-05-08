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
     * author：戴清
     * 有关系统用户的数据库操作内容
     * 用户BLL接口定义
     */
    public interface ISysUserBLL
    {
        Response<SysUser> Login(string loginName, string password);

        Response<SysPower> GetPowerByID(decimal id);
    }
}
