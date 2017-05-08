using Base.Common;
using Base.Common.Push;
using Base.Common.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using WRYJC.DAL;

namespace WRYJC.UI.Controllers.Base
{
    public class LoginedController : BaseController
    {
        #region 登录信息的属性

        //private SysPower currentPower = null;

        //private string appId = "NOSz3Lwi6SNFHCVKMLrjgS0M";
        //private string secret = "c6GjGaCzPnpebK1DbG67VsKFheUcE77G";
        private string appId = "HxOvmbaHHGByldQiC6Cf9kGu5gLU5QDT";
        private string secret = "0TdHXAeVdurOaKkFCrORMzGGN4eGsD6O";
        /// <summary>
        /// 存入Session的键
        /// </summary>
        public const string SessionCurrentUser = "SessionCurrentUserForYCHJJC";

        /// <summary>
        /// 权限URL
        /// </summary>
        public const string SessionCurrentPowers = "SessionCurrentPowers";

        /// <summary>
        /// 机构信息
        /// </summary>
        public const string SessionCurrentOrg = "SessionCurrentOrgForYCHJJC";

        /// <summary>
        /// 菜单
        /// </summary>
        public const string SessionCurrentMenu = "SessionCurrentMenu";

        /// <summary>
        /// 当前登录帐号 Session["SessionCurrentAdminUser"]
        /// </summary>
        //public SysUser CurrentUser
        //{
        //    get
        //    {
        //        return Session["currentUser"] as SysUser;
        //    }
        //}

        /// <summary>
        /// 当前用户机构信息
        /// </summary>
        //public Department CurrentOrg
        //{
        //    get
        //    {
        //        return Session[SessionCurrentOrg] as Department;
        //    }
        //}

        /// <summary>
        /// 当前权限
        /// </summary>
        //public List<SysPower> CurrentPowers
        //{
        //    get { return Session["currentPowers"] as List<SysPower>; }
        //}

        //public SysPower CurrentPower
        //{
        //    get { return this.currentPower; }
        //}

        //public string GetRelationCode()
        //{
        //    if (!CurrentOrg.DepartmentType.AllDataEnabled.GetValueOrDefault())
        //    {
        //        return CurrentOrg.RelationCode;
        //    }

        //    return string.Empty;
        //}

        //public bool AllowUpdateData(string rc)
        //{
        //    var relationCode = GetRelationCode();
        //    if (!string.IsNullOrEmpty(relationCode))
        //    {
        //        return rc.StartsWith(relationCode);
        //    }

        //    return true;
        //}

        //public ActionResult DataUpdateNotAllowed(string url)
        //{
        //    ViewData.Model = "你不允许操作当前数据,请返回";
        //    ViewData["ErrorText"] = "返回";
        //    ViewData["nextStepUrl"] = url;
        //    return View("GetError");
        //}

        public ActionResult Error(string msg, string methodName, string url = "")
        {
            if (methodName == HttpMethod.Get)
            {
                ViewData.Model = msg;
                ViewData["ErrorText"] = "返回";
                ViewData["nextStepUrl"] = url;
                return View("GetError");
            }

            return Content(false, msg, ResultType.Json);
        }

        /// <summary>
        /// 返回过滤情况下的数据查询条件
        /// </summary>
        /// <param name="form"></param>
        /// <returns></returns>
        public FormCollection DataFilter(FormCollection form)
        {
            //if (CurrentUser.GroupID >= (int)EnumUserGroup.Agent)
            //{
            //    if (CurrentUser.GroupID == (int)EnumUserGroup.Merchant)
            //    {
            //        form.Add("ID", CurrentUser.MasterId.GetValueOrDefault().ToString());
            //    }
            //    else
            //    {
            //        form.Add("RelationCode", this.GetRelationCode(CurrentUser));
            //    }
            //}

            return form;
        }


        /// <summary>
        /// Web.config配置文件里的withOutPowerUrl
        /// </summary>
        private static string WithOutPowerUrl = ConfigurationManager.AppSettings["withOutPowerUrl"];

        private static List<string> _notInPowers = null;

        //private static List<SysPower> _currentPowerList = null;

        /// <summary>
        /// 不需要权限判断的链接地址
        /// </summary>
        public static List<string> NotInPowers
        {
            get
            {
                if (_notInPowers != null)
                {
                    return _notInPowers;
                }
                var array = WithOutPowerUrl.Split(';');
                var resultList = new List<string>();
                foreach (var item in array)
                {
                    if (!string.IsNullOrEmpty(item) && item.IndexOf(',') != -1)
                    {
                        resultList.Add(item);
                    }
                }
                _notInPowers = new List<string>();
                _notInPowers.AddRange(resultList);
                return _notInPowers;
            }
        }

        //public List<SysPower> CurrentPowerList
        //{
        //    get { return _currentPowerList; }
        //}

        #endregion

        public static bool HasIp(Controller c)
        {
            //var ip = c.GetClientIp();
            //StringBuilder s = new StringBuilder();
            //s.SqlEqual("Status", ((int)EnumStatus.Normal).ToString(), "System.Byte");
            //s.SqlEqual("IpName", ip);
            //var allIp = new AllowIpBll().Exist(s);
            return true;
        }

        /// <summary>
        /// Action之前
        /// </summary>
        /// <param name="filterContext"></param>
        //protected override void OnActionExecuting(ActionExecutingContext filterContext)
        //{
        //    if (HasIp(this) == false)
        //    {
        //        filterContext.Result = Content(IpErrorString);
        //        base.OnActionExecuting(filterContext);
        //        return;
        //    }

        //    if (CurrentUser == null || CurrentUser.Status != 1)
        //    {
        //        int second = 2;
        //        //跳转
        //        filterContext.Result = View("GetError");
        //        ViewData.Model = "登陆会话过期,请重新登录.";
        //        ViewData["ErrorText"] = "登录";
        //        ViewData["nextStepUrl"] = Url.Action("Login", "Login");
        //        //Content(false,
        //        //"alert(\"登陆会话过期," + second +
        //        //"秒后退出平台!\");setTimeout('parent.parent.location.href=\"" +
        //        //Url.Action("Index", "Login") + "\"'," + second + "000);",
        //        //ResultType.Script);
        //        base.OnActionExecuting(filterContext);
        //        //RedirectToAction("Login","Passport");
        //        return;
        //    }

        #region 权限验证

        /*if (CurrentPowers != null)
            {
                var action = filterContext.RequestContext.RouteData.Values["action"].ToString();
                var controller = filterContext.RequestContext.RouteData.Values["controller"].ToString();
                var url = controller + "," + action;
                if (NotInPowers.Contains(url))
                {
                    base.OnActionExecuting(filterContext);
                    return; //公用页面,则不做权限判断
                }
                bool hasThisUrl = false;
                currentPower = CurrentPowers.FirstOrDefault(m => m.PowerUrl == url);
                if (currentPower != null)
                {
                    hasThisUrl = true;
                    _currentPowerList = CurrentPowers.FindAll(m => m.SysMenuID == currentPower.SysMenuID && m.ID != currentPower.ID);
                }

                if (!hasThisUrl) //没有这个页面
                {
                    filterContext.Result = Content("您没有权限访问!"); //没有此权限
                    base.OnActionExecuting(filterContext);
                    return;
                }
            }
            else
            {
                filterContext.Result = Content("您没有权限访问"); //权限有问题
                base.OnActionExecuting(filterContext);
                return;
            }*/

        #endregion

        //base.OnActionExecuting(filterContext);
        //}
    }
}