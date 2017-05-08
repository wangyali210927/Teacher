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
     * 2017-05-07 17:06:22
     * 有关系统用户的BLL实现
     */
    public class SysUserBLLImpl : ISysUserBLL
    {
        public Response<SysUser> Login(string loginName, string password)
        {
            ISysUserDAL userDb = new SysUserDALImpl();
            Response<SysUser> res = userDb.GetUserByNameAndPassWord(loginName, password);
            Response<SysUser> ret = new Response<SysUser>();
            if (res.isSuccess)
            {
                ret.list = res.list;
                if (res.list[0].DelTime == null)
                {
                    ret.isSuccess = true;
                    ret.message = "登录成功";
                }
                else{
                    ret.isSuccess = false;
                    ret.message = "用户当前状态不允许登录";
                }
            }
            else
            {
                ret.isSuccess = false;
                ret.message = "用户名或密码错误";
            }
            return ret;
        }

        /*
         * 获取用户权限
         */
        public Response<SysPower> GetPowerByID(decimal id)
        {
            ISysUserDAL userDAL = new SysUserDALImpl();
            return userDAL.GetPowerByUserId(id);
        }
    }
}
