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
        private readonly IStageRepository _stageRepository;

        public ProjectRepository(DataContext dataContext, IStageRepository stageRepository)
        {
            _context = dataContext;
            _stageRepository = stageRepository;
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
            //var stages = _context.Stages.Where(s => s.ProjectId == id).ToList();
            var stages = await _stageRepository.GetStagesByProjectIdAsync(id);
            project.Stages = stages;
            return project;
        }

        public async Task<Project> GetProjectByNameAsync(string name)
        {
            var project = await _context.Projects.SingleOrDefaultAsync(p => p.Name == name);
            if (project != null)
            {
                var stages = await _stageRepository.GetStagesByProjectIdAsync(project.Id);
                //var stages = await _context.Stages.Where(s => s.ProjectId == project.Id).ToListAsync();
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

            ICollection<Stage> stages = null;
            foreach (var project in projectsQuery)
            {
                stages = await _stageRepository.GetStagesByProjectIdAsync(project.Id);
                project.Stages = stages;
            }

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

        public async Task UpdateProjectAsync(Project project)
        {
            _context.Projects.Update(project);
            await _context.SaveChangesAsync();
        }

        public async Task<string> GetTotalTimeSpentAsync(int projectId)
        {
            var project = await _context.Projects
                .Include(p => p.Stages)
                    .ThenInclude(s => s.TimeEntries)
                .FirstOrDefaultAsync(p => p.Id == projectId);

            TimeSpan totalTime = TimeSpan.Zero;

            foreach (var stage in project.Stages)
            {
                foreach (var timeEntry in stage.TimeEntries)
                {
                    totalTime += timeEntry.EndTime - timeEntry.StartTime;
                }
            }

            var totalHours = (int)totalTime.TotalHours;
            var totalMinutes = totalTime.Minutes;
            var totalSeconds = totalTime.Seconds;

            return $"{totalHours:D2}{totalMinutes:D2}{totalSeconds:D2}";
        }

        public async Task<string> GetTotalTimeSpentAsStringAsync(int projectId)
        {
            var project = await _context.Projects
                .Include(p => p.Stages)
                    .ThenInclude(s => s.TimeEntries)
                .FirstOrDefaultAsync(p => p.Id == projectId);

            TimeSpan totalTime = TimeSpan.Zero;

            foreach (var stage in project.Stages)
            {
                foreach (var timeEntry in stage.TimeEntries)
                {
                    totalTime += timeEntry.EndTime - timeEntry.StartTime;
                }
            }

            var totalHours = (int)totalTime.TotalHours;
            var totalMinutes = totalTime.Minutes;
            var totalSeconds = totalTime.Seconds;

            return $"{totalHours:D2}:{totalMinutes:D2}:{totalSeconds:D2}";
        }

        public async Task<string> GetTotalTimeSpentWhitoutDaysAsync(int projectId)
        {
            var project = await _context.Projects
        .Include(p => p.Stages)
            .ThenInclude(s => s.TimeEntries)
        .FirstOrDefaultAsync(p => p.Id == projectId);

            TimeSpan totalTime = TimeSpan.Zero;

            foreach (var stage in project.Stages)
            {
                foreach (var timeEntry in stage.TimeEntries)
                {
                    totalTime += timeEntry.EndTime - timeEntry.StartTime;
                }
            }

            return totalTime.ToString("hh\\:mm\\:ss");
        }


        public async Task<int> GetProjectProgressAsync(string projectName)
        {
            var project = await _context.Projects
                .Include(p => p.Stages)
                .FirstOrDefaultAsync(p => p.Name == projectName);

            if (project == null)
            {

                return 0;
            }

            double completedStages = 2;
            double totalStages = 4;
            foreach (var stage in project.Stages)
            {
                if (stage.Status == "Completed")
                {
                    completedStages++;
                }
                totalStages++;
            }

            if (totalStages == 0)
            {
                return 0;
            }

            int progress = (int)((completedStages / (double)totalStages) * 100);
            return progress;
        }

        public async Task DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project != null)
            {
                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();
            }
        }

        private async Task<bool> ProjectExists(string name)
        {
            return await _context.Projects.AnyAsync(p => p.Name == name);
        }
    }
}
