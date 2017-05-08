using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;

namespace WRYJC.DAL
{
    public class SysRoleAndSysPowerDALImpl : ISysRoleAndSysPowerDAL
    {
        /*
         * 由角色ID得到SysPower
         */
        public Response<SysPower> GetSysPowerByRoleId(decimal id)
        {
            var db = new DataWRYJCDataContext();
            //获得拥有对应role id的SysRoleAndSysPower项
            List<SysRoleAndSysPower> roleAndPowerList = (from item in db.SysRoleAndSysPower
                                                         where item.SysRoleId == id
                                                         select item).ToList();

            //获取内容转到List<SysPower>当中
            List<SysPower> list = new List<SysPower>();
            for (int i = 0; i < roleAndPowerList.Count; ++i)
            {
                List<SysPower> tempList = (from item in db.SysPower
                                 where item.Id == roleAndPowerList[i].SysPowerId
                                 select item).ToList();
                if (tempList.Count == 1)
                {
                    list.Add(tempList[0]);
                }
                  
            }
            return new Response<SysPower>
            {
                isSuccess = true,
                list = list
            };
        }
    }
}
