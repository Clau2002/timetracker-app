using BackendAPI.DTO;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Interfaces
{
    public interface IProjectRepository
    {
        Task<Project> GetProjectByIdAsync(int id);
        Task<Project> GetProjectByNameAsync(string name);
        Task<ICollection<Project>> GetProjectsAsync();
        Task<Project> CreateProjectAsync(Project projectDTO);
        Task<ICollection<Project>> GetProjectsByUserIdAync(int userId);
        void Update(Project project);
        Task<bool> SaveAll();
    }
}
