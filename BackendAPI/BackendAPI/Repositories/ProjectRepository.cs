using BackendAPI.DTO;
using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Data
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;

        public ProjectRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<ProjectDTO> CreateProjectAsync(ProjectDTO projectDTO)
        {
            if (await ProjectExists(projectDTO.Name))
                return null;

            var project = new Project
            {
                UserId = projectDTO.UserId,
                Name = projectDTO.Name,
                Description = projectDTO.Description,
                ProjectStatus = projectDTO.ProjectStatus,
                Stages = projectDTO.Stages
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return new ProjectDTO
            {
                UserId = projectDTO.UserId,
                Name = project.Name,
                Description = project.Description,
                ProjectStatus = project.ProjectStatus,
                Stages = project.Stages
            };
        }

        public async Task<Project> GetProjectByIdAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            var stages = _context.Stages.Where(s => s.ProjectId == id).ToList();
            project.Stages = stages;
            return project;
        }

        public async Task<Project> GetProjectByNameAsync(string name)
        {
            return await _context.Projects.SingleOrDefaultAsync(p => p.Name == name);
        }

        public async Task<IEnumerable<Project>> GetProjectsAsync()
        {
            return await _context.Projects.ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Project project)
        {
            _context.Entry(project).State = EntityState.Modified;
        }

        private async Task<bool> ProjectExists(string name)
        {
            return await _context.Projects.AnyAsync(p => p.Name == name);
        }
    }
}
