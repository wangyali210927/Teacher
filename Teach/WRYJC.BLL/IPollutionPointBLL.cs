using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WRYJC.Domain;
using WRYJC.DAL;

namespace WRYJC.BLL
{
    public interface IPollutionPointBLL
    {
        Response<PollutionPoint> GetAllPollutionPoints();
        Response<PollutionPoint> GetPollutionPointsByEnterpriseId(decimal id);
    }
}
