using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WRYJC.BLL;
using WRYJC.DAL;
using WRYJC.Domain;

namespace BLLTest
{
    /*
     * author：戴清
     * 2017-05-07 17:07:12
     * 测试BLL方面内容
     * 如果某方面测试可以综合
     * 建议多建立一个测试类
     * 命名为该方面内容
     */
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void GetDayDataTest()
        {
            IGasDataDisplayBLL dis = new GasDataDisplayBLLImpl();
            Response<GasDayData> data = dis.GetDayDataByID(0); ;
            Assert.AreEqual("0", data.list[0].ID);
        }
        [TestMethod]
        public void GetUserTest()
        {
            ISysUserBLL target = new SysUserBLLImpl();
            Response<SysUser> res = target.Login("admin", "123456");
            Assert.IsTrue(res.isSuccess);
            res = target.Login("admin", "1233");
            Assert.IsFalse(res.isSuccess);
        }
        [TestMethod]
        public void GetUserPower()
        {
            ISysUserBLL target = new SysUserBLLImpl();
            Response<SysPower> result = target.GetPowerByID(1);
            Assert.AreEqual(33, result.list.Count);
        }
        [TestMethod]
        public void GetUserMenu()
        {
            ISysMenuBLL target = new SysMenuBLLImpl();
            ISysUserBLL helper = new SysUserBLLImpl();
            Response<SysMenu> result = target.GetMenuByUserPower(helper.GetPowerByID(1).list);
            Assert.IsNotNull(result.list, "get menu error");
            Assert.AreEqual(33, result.list.Count);
        }
        [TestMethod]
        public void TestEnterprise()
        {
            IEnterpriseBLL target = new EnterpriseBLLImpl();
            Response<Enterprise> result = target.GetAllEnterprises();
            Assert.AreEqual(1, result.list[0].Id);
        }
    }
}
