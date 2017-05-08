using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.DAL;
using WRYJC.Domain;

namespace WRYJC.BLL
{
    public class SysMenuBLLImpl : ISysMenuBLL
    {
        public Response<SysMenu> GetMenuByUserPower(List<SysPower> powers)
        {
            ISysMenuDAL menuDAL = new SysMenuDALImpl();
            Response<SysMenu> res = menuDAL.GetSysMenuByUserPower(powers);
            Response<SysMenu> ret = new Response<SysMenu>();
            if (!res.isSuccess)
            {
                ret.isSuccess = false;
                return ret;
            }
            ret.isSuccess = true;
            ret.list = res.list;
            return ret;
        }

    }
}
