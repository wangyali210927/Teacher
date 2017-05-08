using Base.Common;
using Base.Common.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WRYJC.BLL;
using WRYJC.DAL;

namespace WRYJC.UI.Controllers.Base
{
    public class BaseController : Controller
    {
        #region 私有字段

        public static bool IsDebug = ConfigurationManager.AppSettings["debug"] == "true";

        public static string WebUrl = ConfigurationManager.AppSettings["WebUrl"];

        //public static string IpErrorString
        //{
        //    get
        //    {
        //        return AppConfig["IpErrorString"];
        //    }
        //}

        //public class DicAppConfig
        //{
        //    /// <summary>
        //    /// AppConfig表集合数据
        //    /// </summary>
        //    /// <param name="name">AppConfig表的Key值</param>
        //    /// <returns></returns>
        //    public string this[string name]
        //    {
        //        get
        //        {
        //            var totalData = new AppConfigBll().GetTotalData();
        //            var result = totalData.FirstOrDefault(m => m.Key == name);
        //            if (result == null) return string.Empty;
        //            return result.Value;
        //        }
        //    }
        //}

        /// <summary>
        /// 配置表信息字段
        /// </summary>
        //public static DicAppConfig AppConfig = new DicAppConfig();

        /// <summary>
        /// 项目名称
        /// </summary>
        //public static string ProName
        //{
        //    get
        //    {
        //        return AppConfig["ProName"];
        //    }
        //}

        /// <summary>
        /// 公司名称
        /// </summary>
        //public static string CompanyName
        //{
        //    get
        //    {
        //        return AppConfig["CompanyName"];
        //    }
        //}

        /// <summary>
        /// 公司名称
        /// </summary>
        //public static string CompanyUrl
        //{
        //    get
        //    {
        //        return AppConfig["CompanyUrl"];
        //    }
        //}

        /// <summary>
        /// 是否加水印
        /// </summary>
        //public static bool IsAddWaterImage
        //{
        //    get
        //    {
        //        var val = AppConfig["IsAddWaterImage"];
        //        if (!string.IsNullOrEmpty(val))
        //        {
        //            return Convert.ToBoolean(val);
        //        }
        //        return false;
        //    }
        //}

        /// <summary>
        /// 水印透明度(必须是0到1的值小数值)
        /// </summary>
        //public static float WaterImageAlpha
        //{
        //    get
        //    {
        //        var val = AppConfig["WaterImageAlpha"];
        //        if (val != null)
        //        {
        //            return (float)Convert.ToDouble(val);
        //        }
        //        return 0.4f;
        //    }
        //}

        public const int MasterTypeCount = 100;

        public const int TypeTotalCount = 1000;

        #endregion

        #region 分页数据变量

        /// <summary>
        /// 默认分页大小
        /// </summary>
        private const int TheDefaultPageSize = 20;

        /// <summary>
        /// 默认第几页
        /// </summary>
        private const int TheDefaultPageIndex = 1;

        private string _sortField;

        private bool _sortOrder;

        private int _pageSize = TheDefaultPageSize;
        private int _pageIndex = TheDefaultPageIndex;

        #endregion

        #region 排序的字段

        /// <summary>
        /// 总条数
        /// </summary>
        protected int TotalCount;

        /// <summary>
        /// 页索引
        /// </summary>
        protected int PageNumber
        {
            get
            {
                if (_pageIndex < 1) _pageIndex = TheDefaultPageIndex;
                return _pageIndex;
            }
            set { _pageIndex = value; }
        }

        /// <summary>
        /// 页面大小
        /// </summary>
        protected int PageSize
        {
            get
            {
                if (_pageSize < 1) _pageSize = TheDefaultPageSize;
                return _pageSize;
            }
            set { _pageSize = value; }
        }

        /// <summary>
        /// 排序字段
        /// </summary>
        protected string SortField
        {
            get
            {
                if (string.IsNullOrEmpty(_sortField))
                {
                    _sortField = "ID";
                }
                return _sortField;
            }
            set { _sortField = value; }
        }

        /// <summary>
        /// 正序倒序
        /// </summary>
        protected bool SortOrder
        {
            get { return _sortOrder; }
            set { _sortOrder = value; }
        }

        #endregion

        #region 报错的时候

        //protected static readonly ILog LogManager = log4net.LogManager.GetLogger("FilesLogger");

        /// <summary>
        /// 报错的时候
        /// </summary>
        /// <param name="filterContext"></param>
        //protected override void OnException(ExceptionContext filterContext)
        //{
        //    var errorMsg = filterContext.Exception.Message;
        //    DataLogBll bll = new DataLogBll();
        //    var currentUser = Session["SessionCurrentUserForYCHJJC"] as SysUser;
        //    bll.Add(new DataLog()
        //    {
        //        OpType = (byte)DataOpType.Error,
        //        BeforeData = "",
        //        OpData = errorMsg + "  " + filterContext.Exception.StackTrace,
        //        OpDatetime = DateTime.Now,
        //        OpTblName = "Error"
        //    });
        //    filterContext.Result = Content(false, errorMsg, ResultType.String);
        //    filterContext.ExceptionHandled = true;
        //    base.OnException(filterContext);
        //}

        #endregion

        #region 处理分页部分 page,rows,sidx,sord

        /// <summary>
        /// Action之后
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var totalPage = (int)(TotalCount / PageSize) + ((TotalCount % PageSize == 0) ? 0 : 1);
            if (PageNumber > totalPage) PageNumber = totalPage;
            filterContext.Controller.ViewData["totalPage"] = totalPage;
            filterContext.Controller.ViewData["currentRows"] = PageSize;
            //filterContext.Controller.ViewData["page"] = PageNumber;
            filterContext.Controller.ViewData["totalRows"] = TotalCount;
            ////排序字段
             base.OnActionExecuted(filterContext);
        }

        /// <summary>
        /// Action之前
        /// page,rows,sidx,sord
        /// </summary>
        /// <param name="filterContext"></param>
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var request = filterContext.HttpContext.Request;
            if (request["pageIndex"] != null)
            {
                int.TryParse(request["pageIndex"], out _pageIndex);
            }
            if (request["pageSize"] != null)
            {
                int.TryParse(request["pageSize"], out _pageSize);
            }
            _sortField = request["sort"];
            _sortOrder = request["order"] == "asc";
            base.OnActionExecuting(filterContext);
        }

        #endregion

        #region 常用方法

        /// <summary>
        /// 创建一个空内容结果对象
        /// </summary>
        /// <returns></returns>
        public ActionResult Content()
        {
            return Content(string.Empty);
        }

        /// <summary>
        /// 创建一个ContentInfo类型的内容结果对象
        /// </summary>
        /// <returns></returns>
        public ActionResult Content(bool isSuccess, string message, ResultType type)
        {
            return Content(ContentInfo.Get(isSuccess, message, type));
        }

        /// <summary>
        /// 创建一个ContentInfo类型的列表内容结果对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="s"></param>
        /// <param name="list">带总数的返回方法</param>
        /// <param name="t"></param>
        /// <returns></returns>
        public ActionResult Content<T>(bool isSuccess, List<T> list, ResultType type)
        {
            var totalPages = ((int)(TotalCount / (double)PageSize)) + ((TotalCount % PageSize == 0) ? 0 : 1);
            var result = new ResultPageInfo<T>()
            {
                dataRows = list,
                page = PageNumber.ToString(),
                rows = totalPages.ToString(),
                total = TotalCount.ToString()
            }.ToJsonString();
            //var result = "{\"dataRows\":" + list.ToJsonString() + ",\"page\":" + PageNumber + ",\"rows\":" + totalPages + ",\"total\":" + TotalCount + "}";
            return Content(ContentInfo.Get(isSuccess, result, type));
        }

        public ActionResult Content<T>(bool isSuccess, List<T> list, ResultType type,string message)
        {
            var totalPages = ((int)(TotalCount / (double)PageSize)) + ((TotalCount % PageSize == 0) ? 0 : 1);
            var result = new ResultPageInfo<T>()
            {
                dataRows = list,
                page = PageNumber.ToString(),
                rows = totalPages.ToString(),
                total = TotalCount.ToString(),
                message = message
            }.ToJsonString();
            //var result = "{\"dataRows\":" + list.ToJsonString() + ",\"page\":" + PageNumber + ",\"rows\":" + totalPages + ",\"total\":" + TotalCount + "}";
            return Content(ContentInfo.Get(isSuccess, result, type));
        }

        /// <summary>
        /// 分页列表数据返回值类型
        /// </summary>
        public class ResultPageInfo<T>
        {
            public List<T> dataRows { get; set; }

            public string page { get; set; }

            public string rows { get; set; }

            public string total { get; set; }

            public string message { get; set; }

            public override string ToString()
            {
                return this.ToJsonString();
            }
        }

        /// <summary>
        /// 创建一个ContentInfo类型的内容结果对象
        /// </summary>
        /// <returns></returns>
        public ActionResult Content(ContentInfo ri)
        {
            if (Request != null)
            {
                if (ri.Success == false && Request.IsAjaxRequest() == false && Request.IsGet())
                {
                    ViewData.Model = ri;
                    return View("GetError");
                }
            }
            return Content(ri.ToJsonString());
        }

        /// <summary>
        /// 替换提示字符串单引号为双引号
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        private static string ReplaceMsg(string msg)
        {
            if (string.IsNullOrEmpty(msg)) return string.Empty;
            return msg.Replace('"', '\'');
        }

        #endregion

        /// <summary>
        /// 返回的字符串信息
        /// </summary>
        public class ContentInfo
        {
            private ResultType _type;

            public ContentInfo(bool isSuccess, string message, ResultType type)
            {
                Success = isSuccess;
                Msg = message;
                _type = type;
            }

            public static ContentInfo Get(bool isSuccess, string message, ResultType type)
            {
                var model = new ContentInfo(isSuccess, message, type);
                return model;
            }

            public bool Success { get; set; }

            public string Type
            {
                get { return _type.ToString(); }
            }

            public ResultType EnumType
            {
                set { _type = value; }
            }

            public string Msg { get; set; }
        }

    }
}
