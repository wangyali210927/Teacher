using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;

namespace WRYJC.DAL
{
    public interface ISysUserAndSysRoleDAL
    {
        /*
         * 在SysUser和SysRole表中
         * 根据用户的id获得其拥有的角色信息
         */
        Response<SysRole> GetSysRoleBySysUserId(decimal id);
    }
}
