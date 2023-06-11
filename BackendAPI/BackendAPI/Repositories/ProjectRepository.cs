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
        private StageRepository _stageRepository;

        public ProjectRepository(DataContext dataContext)
        {
            _context = dataContext;
            _stageRepository = new StageRepository(dataContext);
        }

        public async Task<Project> CreateProjectAsync(Project projectDTO)
        {
            if (await ProjectExists(projectDTO.Name))
                return null;

            var project = new Project
            {
                UserId = projectDTO.UserId,
                Name = projectDTO.Name,
                Description = projectDTO.Description,
                Status = projectDTO.Status,
                Stages = projectDTO.Stages
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
            //return new ProjectDTO
            //{
            //    UserId = projectDTO.UserId,
            //    Name = project.Name,
            //    Description = project.Description,
            //    Status = project.Status,
            //    Stages = project.Stages
            //};
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
            var project = await _context.Projects.SingleOrDefaultAsync(p => p.Name == name);
            if(project != null)
            {
                var stages = await _context.Stages.Where(s => s.ProjectId == project.Id).ToListAsync();
                project.Stages = stages;
            }

            return project;
        }

        public async Task<ICollection<Project>> GetProjectsByUserIdAync(int userId)
        {
            var projectsQuery = await (from user in _context.Users
                                       join project in _context.Projects
                                       on user.Id equals project.UserId
                                       where user.Id == userId
                                       select new Project
                                       {
                                           Id = project.Id,
                                           UserId = project.UserId,
                                           Name = project.Name,
                                           Description = project.Description,
                                           Status = project.Status,
                                           Stages = project.Stages
                                       }).ToListAsync();

            return projectsQuery;
        }

        public async Task<ICollection<Project>> GetProjectsAsync()
        {
            var projects = await _context.Projects.ToListAsync();
            var projectsQuery = new List<Project>();
            foreach (var project in projects)
            {
                projectsQuery.Add(GetProjectByIdAsync(project.Id).Result);
            }

            return projectsQuery;
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
