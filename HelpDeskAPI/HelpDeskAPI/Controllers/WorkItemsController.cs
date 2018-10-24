using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using HelpDeskAPI.Models;

namespace HelpDeskAPI.Controllers
{
    public class WorkItemsController : ApiController
    {
        private HelpDeskSystemEntities db = new HelpDeskSystemEntities();

        // GET: api/WorkItems
        public IQueryable<object> GetWorkItems()
        {

            return db.WorkItems.OrderByDescending(x=>x.Id);
        }

        // GET: api/WorkItems/5
        [ResponseType(typeof(WorkItem))]
        public IHttpActionResult GetWorkItem(int id)
        {
            WorkItem workItem = db.WorkItems.Find(id);
            if (workItem == null)
            {
                return NotFound();
            }

            return Ok(workItem);
        }


        [ResponseType(typeof(WorkItem))]
        public async Task<IHttpActionResult> PostWorkItem(WorkItem workItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.WorkItems.Add(workItem);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = workItem.Id }, workItem);
        }

        // DELETE: api/WorkItems/5
        [ResponseType(typeof(WorkItem))]
        public IHttpActionResult DeleteWorkItem(int id)
        {
            WorkItem workItem = db.WorkItems.Find(id);
            if (workItem == null)
            {
                return NotFound();
            }

            db.WorkItems.Remove(workItem);
            db.SaveChanges();

            return Ok(workItem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WorkItemExists(int id)
        {
            return db.WorkItems.Count(e => e.Id == id) > 0;
        }
    }
}