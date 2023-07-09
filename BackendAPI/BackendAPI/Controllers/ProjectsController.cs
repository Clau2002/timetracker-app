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
using AutoMapper;

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
        public async Task<Project> GetProjectById(int id)
        {
            return await _projectRepository.GetProjectByIdAsync(id);
        }

        [HttpGet("name/{name}")]
        public async Task<Project> GetProjectByName(string name)
        {
            return await _projectRepository.GetProjectByNameAsync(name);
        }

        [HttpPost("{createProject}")]
        public async Task<Project> CreateProject(Project projectDTO)
        {
            return await _projectRepository.CreateProjectAsync(projectDTO);
        }

        [HttpGet("userId/{userId}")]
        public async Task<IEnumerable<Project>> GetProjectsByUserId(int userId)
        {
            return await _projectRepository.GetProjectsByUserIdAync(userId);
        }

        [HttpPut("update")]
        public async Task UpdateProject(Project project)
        {
            await _projectRepository.UpdateProjectAsync(project);
        }

        [HttpGet("getTotalTime/{id}")]
        public async Task<string> GetTotalTime(int id)
        {
            return await _projectRepository.GetTotalTimeSpentAsync(id);
        }

        [HttpGet("getTotalTimeAsString/{id}")]
        public async Task<string> GetTotalTimeSpentAsString(int id)
        {
            return await _projectRepository.GetTotalTimeSpentAsStringAsync(id);
        }

        [HttpGet("getTotalTimeWithoutDays/{id}")]
        public async Task<string> GetTotalTimeWithoutDays(int id)
        {
            return await _projectRepository.GetTotalTimeSpentWhitoutDaysAsync(id);
        }

        [HttpGet("getProgress/{name}")]
        public async Task<int> GetProjectProgress(string projectName)
        {
            return await _projectRepository.GetProjectProgressAsync(projectName);
        }

        [HttpDelete("delete/{id}")]
        public async Task DeleteProject(int id)
        {
            await _projectRepository.DeleteProjectAsync(id);
            //return NoContent();
        }
    }
}
