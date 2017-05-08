using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WRYJC.Domain
{
    /*
    * author：戴清
    * 2017-05-07 16:59:20
    * 封装向上层传递的数据信息
    */
    public class Response<T>
    {
        public List<T> list;
        public bool isSuccess;
        public string message;
    }
}
