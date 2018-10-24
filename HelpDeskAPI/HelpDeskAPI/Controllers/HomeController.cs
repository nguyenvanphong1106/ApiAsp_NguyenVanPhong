using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HelpDeskAPI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult HelpDeskAgent()
        {
            ViewBag.Title = "Help Desk Agent";

            return View();
        }
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
