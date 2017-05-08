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
     * 2017-05-07 17:07:26
     * 有关系统菜单获取的数据库操作接口定义
     */
    public interface ISysMenuDAL
    {
        Response<SysMenu> GetSysMenuByUserPower(List<SysPower> userPowers);
    }
}
