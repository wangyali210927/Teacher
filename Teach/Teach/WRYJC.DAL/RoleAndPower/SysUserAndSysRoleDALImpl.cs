using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;

namespace WRYJC.DAL
{
    public class SysUserAndSysRoleDALImpl : ISysUserAndSysRoleDAL
    {
        public Response<SysRole> GetSysRoleBySysUserId(decimal id)
        {
            var db = new DataWRYJCDataContext();
            List<SysUserAndSysRole> sysUserAndSysRoleList = (from item in db.SysUserAndSysRole
                                            where item.SysUserId == id
                                            select item).ToList();
            List<SysRole> list = new List<SysRole>();
            for (int i = 0; i < sysUserAndSysRoleList.Count; ++i)
            {
                List<SysRole> tempList = (from item in db.SysRole
                                where item.Id == sysUserAndSysRoleList[i].SysRoleId
                                select item).ToList();
                if (tempList.Count == 1)
                    list.Add(tempList[0]);
            }

            return new Response<SysRole>
            {
                list = list,
                isSuccess = true
            };
        }
    }
}
