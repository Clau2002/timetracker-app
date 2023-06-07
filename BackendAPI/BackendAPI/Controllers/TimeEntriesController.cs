using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;
using BackendAPI.Data;


namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeEntriesController : BaseControllerApi
    {
        private readonly DataContext _context;

        public TimeEntriesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TimeEntry>>> GetTimeEntries()
        {
            return await _context.TimeEntries.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TimeEntry>> GetTimeEntry(Guid id)
        {
            var timeEntry = await _context.TimeEntries.FindAsync(id);

            if (timeEntry == null)
            {
                return NotFound();
            }

            return timeEntry;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimeEntry(Guid id, TimeEntry timeEntry)
        {
            if (id != timeEntry.Id)
            {
                return BadRequest();
            }

            _context.Entry(timeEntry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimeEntryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<TimeEntry>> PostTimeEntry(TimeEntry timeEntry)
        {
            _context.TimeEntries.Add(timeEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTimeEntry", new { id = timeEntry.Id }, timeEntry);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimeEntry(int id)
        {
            var timeEntry = await _context.TimeEntries.FindAsync(id);
            if (timeEntry == null)
            {
                return NotFound();
            }

            _context.TimeEntries.Remove(timeEntry);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TimeEntryExists(Guid id)
        {
            return _context.TimeEntries.Any(e => e.Id == id);
        }
    }
}
