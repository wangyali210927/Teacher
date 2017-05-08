using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UEditor;

namespace WRYJC.UI.Controllers
{
    public class SystemController : Controller
    {
        // GET: /System/

        public ActionResult Index()
        {
            return View();
        }

        [NonAction]
        public static string GetMenuUrl(UrlHelper url, string menuUrl)
        {
            if (string.IsNullOrEmpty(menuUrl)) return string.Empty;
            var arr = menuUrl.Split(',');
            if (arr.Length != 2)
            {
                return menuUrl;
            }
            return url.Action(arr[1], arr[0]);
        }

        #region 文件管理
        public ActionResult FileUpload()
        {
            Handler action = null;
            if (Session["UserName"] != null)
            {
                switch (Request["saveto"])
                {
                    case "fs":
                        action = new UploadHandler(this.HttpContext, new UploadConfig()
                        {
                            AllowExtensions = Config.GetStringList("imageAllowFiles"),
                            PathFormat = Config.GetString("imagePathFormat"),
                            SizeLimit = Config.GetInt("imageMaxSize"),
                            UploadFieldName = Config.GetString("imageFieldName")
                        });
                        break;

                    case "db":
                        action = new FileToDbHandler(this.HttpContext, new UploadConfig()
                        {
                            //AllowExtensions = Config.GetStringList("imageAllowFiles"),
                            PathFormat = Config.GetString("imagePathFormat"),
                            SizeLimit = Config.GetInt("imageMaxSize"),
                            UploadFieldName = Config.GetString("imageFieldName")
                        });
                        break;

                    default:
                        action = new NotSupportedHandler(this.HttpContext);
                        break;
                }
            }
            else
            {
                action = new NeedLoginedHandler(this.HttpContext);
            }

            var result = action.Process();
            var jsonpCallBack = Request["callback"];
            if (string.IsNullOrWhiteSpace(jsonpCallBack))
            {
                return Content(result, "text/plain");
            }
            else
            {
                return Content(result, "application/javascript");
            }
        }

        public ActionResult EditorFile()
        {
            Handler action = null;

            //string orgCode = this.GetRelationCode();
            if (Session["UserName"] != null)
            {
                switch (Request["action"])
                {
                    case "config":
                        action = new ConfigHandler(this.HttpContext);
                        break;
                    case "uploadimage":
                        action = new UploadHandler(this.HttpContext, new UploadConfig()
                        {
                            AllowExtensions = Config.GetStringList("imageAllowFiles"),
                            PathFormat = Config.GetString("imagePathFormat"),
                            SizeLimit = Config.GetInt("imageMaxSize"),
                            UploadFieldName = Config.GetString("imageFieldName")
                        });
                        break;
                    case "uploadscrawl":
                        action = new UploadHandler(this.HttpContext, new UploadConfig()
                        {
                            AllowExtensions = new string[] { ".png" },
                            PathFormat = Config.GetString("scrawlPathFormat"),
                            SizeLimit = Config.GetInt("scrawlMaxSize"),
                            UploadFieldName = Config.GetString("scrawlFieldName"),
                            Base64 = true,
                            Base64Filename = "scrawl.png"
                        });
                        break;
                    case "uploadvideo":
                        action = new UploadHandler(this.HttpContext, new UploadConfig()
                        {
                            AllowExtensions = Config.GetStringList("videoAllowFiles"),
                            PathFormat = Config.GetString("videoPathFormat"),
                            SizeLimit = Config.GetInt("videoMaxSize"),
                            UploadFieldName = Config.GetString("videoFieldName")
                        });
                        break;
                    case "uploadfile":
                        action = new UploadHandler(this.HttpContext, new UploadConfig()
                        {
                            AllowExtensions = Config.GetStringList("fileAllowFiles"),
                            PathFormat = Config.GetString("filePathFormat"),
                            SizeLimit = Config.GetInt("fileMaxSize"),
                            UploadFieldName = Config.GetString("fileFieldName")
                        });
                        break;
                    case "listimage":
                        {
                            //action = new ListFileManager(this.HttpContext, !string.IsNullOrEmpty(orgCode)
                            //    ? Config.GetString("imageManagerListPath").Replace("{orgcode}", orgCode)
                            //    : Config.GetString("imageManagerListPath").Replace("{orgcode}", orgCode),
                            //                             Config.GetStringList("imageManagerAllowFiles"));
                        }
                        break;
                    case "listfile":
                        //action = new ListFileManager(this.HttpContext, !string.IsNullOrEmpty(orgCode)
                        //        ? Config.GetString("imageManagerListPath").Replace("{orgcode}", orgCode)
                        //        : Config.GetString("imageManagerListPath").Replace("{orgcode}", orgCode),
                        //                             Config.GetStringList("fileManagerAllowFiles"));
                        break;
                    case "catchimage":
                        action = new CrawlerHandler(this.HttpContext);
                        break;
                    default:
                        action = new NotSupportedHandler(this.HttpContext);
                        break;
                }
            }
            else
            {
                action = new NeedLoginedHandler(this.HttpContext);
            }

            var result = action.Process();
            var jsonpCallBack = Request["callback"];
            if (string.IsNullOrWhiteSpace(jsonpCallBack))
            {
                return Content(result, "text/plain");
            }
            else
            {
                return Content(result, "application/javascript");
            }
        }

        public ActionResult DbFileList(FormCollection form)
        {
            return null;
        }
        #endregion
    }
}
