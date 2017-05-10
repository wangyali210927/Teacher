using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using WRYJC.DAL;
using WRYJC.Domain;
using Moq;

namespace DALTest
{
    [TestClass]
    public class GasDataTest
    {
        [TestMethod]
        public void TestRangedData()
        {
            IGasDayDataDAL target = new GasDayDataDALImpl();
            DateTime fromDate = Convert.ToDateTime("05/01/1993");
            DateTime toDate = Convert.ToDateTime("05/01/2017");

            Response<GasDayData> res = target.GetDayDataByDateRange(fromDate, toDate);

            Assert.IsTrue( res.isSuccess,"failed");
            Assert.AreEqual(1,res.list.Count);
        }
    }
}
