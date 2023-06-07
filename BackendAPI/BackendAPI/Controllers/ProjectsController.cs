using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;
using BackendAPI.Data;
using Microsoft.AspNetCore.Authorization;
using BackendAPI.Interfaces;
using BackendAPI.DTO;

namespace BackendAPI.Controllers
{
    [Authorize]
    public class ProjectsController : BaseControllerApi
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Project>> GetAllProjects()
        {
            return await _projectRepository.GetProjectsAsync();
        }

        [HttpGet("id/{id}")]
        public async Task<Project> GetProjectById(Guid id)
        {
            return await _projectRepository.GetProjectByIdAsync(id);
        }

        [HttpGet("name/{name}")]
        public async Task<Project> GetProjectByName(string name)
        {
            return await _projectRepository.GetProjectByNameAsync(name);
        }

        [HttpPost("{createProject}")]
        public async Task<ProjectDTO> CreateProject(ProjectDTO projectDTO)
        {
            //if (_projectRepository.CreateProjectAsync(projectDTO) == null)
            //    return BadRequest("Project already exists");
            return await _projectRepository.CreateProjectAsync(projectDTO);
        }

        [HttpGet("userId/{userId}")]
        public async Task<IEnumerable<Project>> GetProjectsByUserId(Guid userId)
        {
            return await _projectRepository.GetProjectsByUserIdAync(userId);
        }

        //[HttpGet]
        //public async Task<ActionResult> GetProjects()
        //{
        //    var projectsQuery = await (from projects in _context.Projects
        //                               join users in _context.Users
        //                               on projects.UserId equals users.Id select new
        //                               {
        //                                   id = projects.Id,
        //                                   userName = users.UserName,
        //                                   name = projects.Name,
        //                                   description = projects.Description,
        //                                   projectStatus = projects.ProjectStatus

        //                               }).ToListAsync();

        //    return Ok(projectsQuery);
        //}


        //[HttpGet("username/{username}")]
        //public async Task<ActionResult> GetProjectsByUserName(string username)
        //{
        //    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
        //    if (user == null)
        //    {
        //        return NotFound(); // or some other error response
        //    }
        //    var userId = user.Id;

        //    var projectsQuery = await (from projects in _context.Projects
        //                               where projects.UserId == userId
        //                               select new
        //                               {
        //                                   id = projects.Id,
        //                                   name = projects.Name,
        //                                   description = projects.Description,
        //                                   projectStatus = projects.ProjectStatus
        //                               }).ToListAsync();

        //    return Ok(projectsQuery);
        //}

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

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProject(int id, Project project)
        //{
        //    if (id != project.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(project).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProjectExists(id))
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
        //public async Task<ActionResult<Project>> PostProject(Project project)
        //{
        //    _context.Projects.Add(project);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetProject", new { id = project.Id }, project);
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProject(int id)
        //{
        //    var project = await _context.Projects.FindAsync(id);
        //    if (project == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Projects.Remove(project);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ProjectExists(int id)
        //{
        //    return _context.Projects.Any(e => e.Id == id);
        //}
    }
}
