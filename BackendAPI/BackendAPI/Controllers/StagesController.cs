using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;
using BackendAPI.Data;
using Microsoft.AspNetCore.Authorization;
using BackendAPI.Interfaces;

namespace BackendAPI.Controllers
{
    [Authorize]
    public class StagesController : BaseControllerApi
    {
        private readonly IStageRepository _stageRepository;

        public StagesController(IStageRepository stageRepository)
        {
            _stageRepository = stageRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Stage>> GetAllStages()
        {
            return await _stageRepository.GetStagesAsync();
        }

        [HttpGet("id/{id}")]
        public async Task<Stage> GetStageById(int id)
        {
            return await _stageRepository.GetStageByIdAsync(id);
        }

        [HttpGet("name/{name}")]
        public async Task<Stage> GetStageByName(string name)
        {
            return await _stageRepository.GetStageByNameAsync(name);
        }


        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Stage>>> GetStages()
        //{
        //    return await _context.Stages.ToListAsync();
        //}

        //[HttpGet("{id}")]
        //public async Task<ActionResult<Stage>> GetStage(int id)
        //{
        //    var stage = await _context.Stages.FindAsync(id);

        //    if (stage == null)
        //    {
        //        return NotFound();
        //    }

        //    var timeEntries = _context.TimeEntries.Where(t => t.StageId.Equals(id)).ToList();
        //    stage.TimeEntries = timeEntries;

        //    return stage;
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutStage(int id, Stage stage)
        //{
        //    if (id != stage.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(stage).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!StageExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //[HttpPost]
        //public async Task<ActionResult<Stage>> PostStage(Stage stage)
        //{
        //    _context.Stages.Add(stage);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetStage", new { id = stage.Id }, stage);
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteStage(int id)
        //{
        //    var stage = await _context.Stages.FindAsync(id);
        //    if (stage == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Stages.Remove(stage);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool StageExists(int id)
        //{
        //    return _context.Stages.Any(e => e.Id == id);
        //}
    }
}
