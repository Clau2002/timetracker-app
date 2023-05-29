using BackendAPI.DTO;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Interfaces
{
    public interface IProjectRepository
    {
        Task<Project> GetProjectByIdAsync(int id);
        Task<Project> GetProjectByNameAsync(string name);
        Task<IEnumerable<Project>> GetProjectsAsync();
        Task<ProjectDTO> CreateProjectAsync(ProjectDTO projectDTO);
        void Update(Project project);
        Task<bool> SaveAll();
    }
}
