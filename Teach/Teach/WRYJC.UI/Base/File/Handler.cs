using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using Newtonsoft.Json;

namespace UEditor
{
    /// <summary>
    /// Handler 的摘要说明
    /// </summary>
    public abstract class Handler
    {
        public Handler(HttpContextBase context)
        {
            this.Request = context.Request;
            this.Response = context.Response;
            this.Context = context;
            this.Server = context.Server;
            this.Session = context.Session;

            //this.OrgCode = getOrgCode(context);
        }

        public abstract string Process();

        protected string WriteJson(object response)
        {
            string jsonpCallback = Request["callback"],
                   json = JsonConvert.SerializeObject(response);
            if (String.IsNullOrWhiteSpace(jsonpCallback))
            {
                return json;
            }
            else
            {
                return String.Format("{0}({1});", jsonpCallback, json);
            }
        }

        //private string getOrgCode(HttpContextBase context)
        //{
        //    var orgCode = "Admin";
        //    var dept = context.Session["SessionCurrentOrgForYCHJJC"] as Department;
        //    if (!dept.DepartmentType.AllDataEnabled.GetValueOrDefault())
        //    {
        //        orgCode = dept.RelationCode;
        //    }

        //    return orgCode;
        //}

        public HttpSessionStateBase Session { get; private set; }
        public HttpRequestBase Request { get; private set; }
        public HttpResponseBase Response { get; private set; }
        public HttpContextBase Context { get; private set; }
        public HttpServerUtilityBase Server { get; private set; }
        public string OrgCode { get; private set; }
    }
}