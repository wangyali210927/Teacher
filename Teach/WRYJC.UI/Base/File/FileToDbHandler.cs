
using Base.Common;
using Base.Common.Utilities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using WRYJC.BLL;
using WRYJC.DAL;

namespace UEditor
{
    public class FileToDbHandler : Handler
    {
        public UploadConfig UploadConfig { get; private set; }
        public UploadResult Result { get; private set; }

        public FileToDbHandler(HttpContextBase context, UploadConfig config)
            : base(context)
        {
            this.UploadConfig = config;
            this.Result = new UploadResult() { State = UploadState.Unknown };
        }

        public override string Process()
        {
        //    byte[] uploadFileBytes = null;
        //    string uploadFileName = null;

        //    if (UploadConfig.Base64)
        //    {
        //        uploadFileName = UploadConfig.Base64Filename;
        //        uploadFileBytes = Convert.FromBase64String(Request[UploadConfig.UploadFieldName]);
        //    }
        //    else
        //    {
        //        var file = Request.Files[Request["key"] ?? UploadConfig.UploadFieldName];
        //        uploadFileName = file.FileName;

        //        //if (!CheckFileType(uploadFileName))
        //        //{
        //        //    Result.State = UploadState.TypeNotAllow;
        //        //    return WriteResult();
        //        //}
        //        if (!CheckFileSize(file.ContentLength))
        //        {
        //            Result.State = UploadState.SizeLimitExceed;
        //            return WriteResult();
        //        }

        //        uploadFileBytes = new byte[file.ContentLength];
        //        try
        //        {
        //            file.InputStream.Read(uploadFileBytes, 0, file.ContentLength);
        //        }
        //        catch (Exception)
        //        {
        //            Result.State = UploadState.NetworkError;
        //            return WriteResult();
        //        }
        //    }

        //    Result.OriginFileName = uploadFileName;

        //    try
        //    {
        //        SysFile model = new SysFile()
        //        {
        //            FileName = uploadFileName,
        //            //BizCode = Tools.getGuid(),
        //            //RelationCode = this.OrgCode,
        //            //Ext = Path.GetExtension(uploadFileName),
        //            Size = uploadFileBytes.Length,
        //            FStream =  uploadFileBytes,
        //            //FStream = new BinaryWriter(new MemoryStream(uploadFileBytes)),
        //            Status = 0,
        //            InsertTime=DateTime.Now
        //        };
        //        var msg = string.Empty;
        //        var user = Session["currentUser"] as SysUser;
        //        bool isSuccess = new SysFileBll().Add(model, user.ID);
        //        if (isSuccess)
        //        {
        //            Result.State = UploadState.Success;
        //            Result.Url = model.ID.ToString();
        //        }
        //        else
        //        {
        //            Result.State = UploadState.Unknown;
        //            Result.ErrorMessage = msg;
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        Result.State = UploadState.FileAccessError;
        //        Result.ErrorMessage = e.Message;
        //    }
        //    finally
        //    {
        //    }


        //    return WriteResult();
            return "";
        }

        private string WriteResult()
        {
            return this.WriteJson(new
            {
                state = GetStateMessage(Result.State),
                url = Result.Url,
                title = Result.Url,
                saveTo = "DB",
                original = Result.Url,
                error = Result.ErrorMessage
            });
        }

        private string GetStateMessage(UploadState state)
        {
            switch (state)
            {
                case UploadState.Success:
                    return "SUCCESS";
                case UploadState.FileAccessError:
                    return "文件访问出错，请检查写入权限";
                case UploadState.SizeLimitExceed:
                    return "文件大小超出服务器限制";
                case UploadState.TypeNotAllow:
                    return "不允许的文件格式";
                case UploadState.NetworkError:
                    return "网络错误";
            }
            return "未知错误";
        }

        private bool CheckFileType(string filename)
        {
            var fileExtension = Path.GetExtension(filename).ToLower();
            return UploadConfig.AllowExtensions.Select(x => x.ToLower()).Contains(fileExtension);
        }

        private bool CheckFileSize(int size)
        {
            return size < UploadConfig.SizeLimit;
        }
    }
}