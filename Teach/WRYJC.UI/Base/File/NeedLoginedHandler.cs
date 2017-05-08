using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UEditor
{
    public class NeedLoginedHandler : Handler
    {
        public NeedLoginedHandler(HttpContextBase context)
            : base(context)
        {
        }

        public override string Process()
        {
            return WriteJson(new
            {
                state = "当前会话信息已过期，登陆后才能保存文件。"
            });
        }
    }
}