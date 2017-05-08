using System;
using System.Collections.Generic;
using System.Collections;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WRYJC.UI.Controllers.Base;
using WRYJC.UI.Controllers;
using System.Web.Mvc;
using System.Web;
using WRYJC.DAL;
using WRYJC.BLL;

namespace WRYJC.UI.Tests
{
    /*
     * author：戴清
     * 有关系统用户的数据库操作内容
     * UI层的测试类
     */
    [TestClass]
    public class UnitTest1
    {
        //登录测试，已通过
        //存在session操作，会导致空引用异常
        //故该单元测试废除
        //[TestMethod]
        //public void LoginTest()
        //{
        //    LoginController target = new LoginController();
        //    ContentResult result = (ContentResult)target.Login("admin", "123456");
        //    Assert.AreEqual("{\"Success\":true,\"Type\":\"String\",\"Msg\":\"登录成功\"}", result.Content);
        //    result = (ContentResult)target.Login("admin", "1234");
        //    Assert.AreEqual("{\"Success\":false,\"Type\":\"String\",\"Msg\":\"用户名或密码错误\"}", result.Content);
        //}

        //Session内容测试
        //[TestMethod]
        //public void SessionMenuTest()
        //{
        //    ISysUserBLL userBLL = new SysUserBLLImpl();
        //    SysUser user = userBLL.Login("admin", "123456").list[0];
        //    LoginController target = new LoginController();
        //    List<SysMenu> menuList = HttpContext.Current.Session["currentMenu"] as List<SysMenu>;
        //    Assert.AreEqual(33, menuList.Count);
        //}
    }
}
