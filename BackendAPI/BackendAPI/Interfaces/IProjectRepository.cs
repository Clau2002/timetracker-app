using BackendAPI.DTO;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Interfaces
{
    public interface IProjectRepository
    {
        Task<Project> GetProjectByIdAsync(Guid id);
        Task<Project> GetProjectByNameAsync(string name);
        Task<ICollection<Project>> GetProjectsAsync();
        Task<ProjectDTO> CreateProjectAsync(ProjectDTO projectDTO);
        Task<ICollection<Project>> GetProjectsByUserIdAync(Guid userId);
        void Update(Project project);
        Task<bool> SaveAll();
    }
}
