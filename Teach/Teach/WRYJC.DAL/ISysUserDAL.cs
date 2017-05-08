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
    * 2017-05-07 17:07:58
    * 有关系统用户的数据库操作相关内容接口定义
    */
    public interface ISysUserDAL
    {
        Response<SysUser> GetUserByNameAndPassWord(string loginName,string encryptPwd);
        Response<SysPower> GetPowerByUserId(decimal id);
    }
}
