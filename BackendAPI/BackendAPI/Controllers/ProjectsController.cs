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
    public class ProjectsController : BaseControllerApi
    {
        private readonly DataContext _context;

        public ProjectsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetProjects()
        {
            var projectsQuery = await (from projects in _context.Projects
                                       join users in _context.Users
                                       on projects.UserId equals users.Id select new
                                       {
                                           id = projects.Id,
                                           userName = users.UserName,
                                           name = projects.Name,
                                           description = projects.Description,
                                           projectStatus = projects.ProjectStatus

                                       }).ToListAsync();

            return Ok(projectsQuery);
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult> GetProjectsByUserId(int id)
        {
            var projectsQuery = await (from user in _context.Users
                                       join projects in _context.Projects
                                       on user.Id equals projects.UserId
                                       where user.Id == id
                                       select new
                                       {
                                           id = projects.Id,
                                           name = projects.Name,
                                           description = projects.Description,
                                           projectStatus = projects.ProjectStatus
                                       }).ToListAsync();
            return Ok(projectsQuery);
        }

        [HttpGet("username/{username}")]
        public async Task<ActionResult> GetProjectsByUserName(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
            if (user == null)
            {
                return NotFound(); // or some other error response
            }
            var userId = user.Id;

            var projectsQuery = await (from projects in _context.Projects
                                       where projects.UserId == userId
                                       select new
                                       {
                                           id = projects.Id,
                                           name = projects.Name,
                                           description = projects.Description,
                                           projectStatus = projects.ProjectStatus
                                       }).ToListAsync();

            return Ok(projectsQuery);
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<Project>> GetProject(int id)
        //{
        //    var project = await _context.Projects.FindAsync(id);

        //    if (project == null)
        //    {
        //        return NotFound();
        //    }

        //    var stages = _context.Stages.Where(s => s.ProjectId.Equals(id)).ToList();
        //    project.Stages = stages;

        //    return project;
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }
    }
}
