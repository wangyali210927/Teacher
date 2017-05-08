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
     * 2017-05-07 17:08:20
     * 有关用户获取的数据库操作接口定义
     */
    public class SysUserDALImpl : ISysUserDAL
    {
        public Response<SysUser> GetUserByNameAndPassWord(string loginName,string encryptPwd)
        {
            var db = new DataWRYJCDataContext();
            List<SysUser> user = (from m in db.SysUser
                            where m.LoginName == loginName && m.Pwd == encryptPwd
                            select m).ToList();

            if (user.Count != 1 )
            {
                return new Response<SysUser>
                {
                    isSuccess = false,
                    list = user
                };
            }
            else
            {
                return new Response<SysUser>
                {
                    isSuccess = true,
                    list = user
                };
            }
        }

        public Response<SysPower> GetPowerByUserId(decimal id)
        {
            //获取所有用户角色
            ISysUserAndSysRoleDAL userAndRole = new SysUserAndSysRoleDALImpl();
            Response<SysRole> userRoles = userAndRole.GetSysRoleBySysUserId(id);

            //获取用户角色对应的权利
            ISysRoleAndSysPowerDAL roleAndSysPower = new SysRoleAndSysPowerDALImpl();
            List<SysPower> list = new List<SysPower>();
            //遍历用户的用户角色查看每个角色具有的权利
            for (int i = 0; i < userRoles.list.Count; ++i)
            {
                decimal tempId = userRoles.list[i].Id;
                //根据角色id查询权利
                Response<SysPower> powers = roleAndSysPower.GetSysPowerByRoleId(tempId);
                //添加角色对应的权利信息
                for (int j = 0; j < powers.list.Count; ++j)
                {
                    list.Add(powers.list[j]);
                }
            }
            return new Response<SysPower>
            {
                list = list,
                isSuccess = true
            };
        }
    }
}
