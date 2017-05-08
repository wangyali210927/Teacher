using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UEditor
{
    /// <summary>
    /// Config 的摘要说明
    /// </summary>
    public class ConfigHandler : Handler
    {
        public ConfigHandler(HttpContextBase context)
            : base(context)
        {
        }

        public override string Process()
        {
            return WriteJson(Config.Items);
        }
    }
}