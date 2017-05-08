using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Base.Common;
using Base.Common.Utilities;
using WRYJC.UI.Controllers.Base;
using WRYJC.BLL;
using WRYJC.DAL;
using WRYJC.Domain;

namespace WRYJC.UI.Controllers
{
    /*
     * author：戴清
     * 继承BaseControler（源于公司之前的项目）
     * 的LoginController
     * 完成登录相关前台交互
     */
    public class LoginController : BaseController
    {
        //
        // GET: /Login/
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string loginName , string password)
        {
            ISysUserBLL userBll = new SysUserBLLImpl();
            //Response<SysUser> res = userBll.Login(loginName, SecurityHelper.Encrypt(password));
            Response<SysUser> res = userBll.Login(loginName, password);
            if (!res.isSuccess)
            {
                return Content(false, res.message, ResultType.String);
            }
            SetInSession(res.list[0]);
            return Content(true, res.message, ResultType.String);
        }
        [NonAction]
        private void SetInSession(SysUser user)
        {
            ISysMenuBLL menuBLL = new SysMenuBLLImpl();
            ISysUserBLL userBLL = new SysUserBLLImpl();
            Response<SysPower> res = userBLL.GetPowerByID(user.Id);
            if (!res.isSuccess)
                return;
            Response<SysMenu> resMenu = menuBLL.GetMenuByUserPower(res.list);
            if (!resMenu.isSuccess)
                return;
            Session["currentMenu"] = resMenu.list;
            Session["UserName"] = user.TrueName + "(" + user.IdCard + ")";
        }

    }
}
