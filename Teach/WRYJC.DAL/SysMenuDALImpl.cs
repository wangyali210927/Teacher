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
     * 有关系统菜单获取的数据库操作接口实现
     */
    public class SysMenuDALImpl : ISysMenuDAL
    {
        /*
         * 通过用户权利获取用户能够掌控的菜单内容
         */
        public Response<SysMenu> GetSysMenuByUserPower(List<SysPower> userPowers)
        {
            List<SysMenu> menus = new List<SysMenu>();
            var db = new DataWRYJCDataContext();
            for (int i = 0;i < userPowers.Count;++ i)
            {
                SysMenu temp = (from item in db.SysMenu 
                                      where item.Id == userPowers[i].SysMenuID 
                                      select item).ToList()[0];
                menus.Add(temp);
            }
            return new Response<SysMenu>
            {
                isSuccess = true,
                list = menus
            };
        }
    }
}
