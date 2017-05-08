using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UEditor
{
    public class ListDbFileHandler : Handler
    {
        public UploadConfig UploadConfig { get; private set; }
        public UploadResult Result { get; private set; }

        public ListDbFileHandler(HttpContextBase context, UploadConfig config)
            : base(context)
        {
            this.UploadConfig = config;
            this.Result = new UploadResult() { State = UploadState.Unknown };
        }

        public override string Process()
        {
            throw new NotImplementedException();
        }
    }
}