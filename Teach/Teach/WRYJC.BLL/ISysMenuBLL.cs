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
     * 系统菜单相关内容
     */
    public interface ISysMenuBLL
    {
        Response<SysMenu> GetMenuByUserPower(List<SysPower> powers);
    }
}
