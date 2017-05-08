using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;

namespace WRYJC.DAL
{
    public interface ISysPowerDAL
    {
        Response<SysPower> GetAllPowers();
        
    }
}
