using BackendAPI.Interfaces;
using BackendAPI.Models;
using BackendAPI.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Data
{
    public class StageRepository : IStageRepository
    {
        private readonly DataContext _context;
        private readonly ITimeEntryRepository _timeEntryRepository;

        public StageRepository(DataContext dataContext, ITimeEntryRepository timeEntryRepository)
        {
            _context = dataContext;
            _timeEntryRepository = timeEntryRepository;
        }

        public async Task<Stage> CreateStageAsync(Stage stage)
        {
            if (await StageExists(stage.Name))
                return null;

            var _stage = new Stage
            {
                ProjectId = stage.ProjectId,
                Name = stage.Name,
                Description = stage.Description,
                Status = stage.Status,
                Deadline = stage.Deadline
            };

            _context.Stages.Add(_stage);
            await _context.SaveChangesAsync();
            return _stage;
        }

        public async Task<Stage> GetStageByIdAsync(int id)
        {
            var stage = await _context.Stages.FindAsync(id);

            if (stage != null)
            {
                var timeentries = await _timeEntryRepository.GetAllTimeEntriesByStageIdAsync(id);
                stage.TimeEntries = timeentries;
            }

            return stage;
        }

        public async Task<Stage> GetStageByNameAsync(string name)
        {
            //return await _context.Stages.SingleOrDefaultAsync(s => s.Name == name);
            var stage = await _context.Stages.SingleOrDefaultAsync(s => s.Name == name);
            if (stage != null)
            {
                var timeEntries = await _context.TimeEntries.Where(s => s.StageId == stage.Id).ToListAsync();
                stage.TimeEntries = timeEntries;
            }

            return stage;
        }

        public async Task<ICollection<Stage>> GetStagesAsync()
        {
            var stages = await _context.Stages.ToListAsync();
            var stagesQuery = new List<Stage>();
            foreach (var stage in stages)
            {
                stagesQuery.Add(GetStageByIdAsync(stage.Id).Result);
            }

            return stagesQuery;
        }

        public async Task<ICollection<Stage>> GetStagesByProjectIdAsync(int projectId)
        {
            var stages = await _context.Stages
                .Include(s => s.TimeEntries)
                .Where(s => s.ProjectId == projectId)
                .ToListAsync();

            return stages;
        }

        public async Task UpdateStageAsync(Stage stage)
        {
            //_context.Entry(stage).State = EntityState.Modified;
            _context.Stages.Update(stage);
            await _context.SaveChangesAsync();
        }

        public async Task<TimeSpan> GetStageTotalTimeSpentAsync(int stageId)
        {
            var stage = await _context.Stages
                .Include(s => s.TimeEntries)
                .FirstOrDefaultAsync(s => s.Id == stageId);

            TimeSpan totalTime = TimeSpan.Zero;

            foreach (var timeEntry in stage.TimeEntries)
            {
                totalTime += timeEntry.EndTime - timeEntry.StartTime;
            }

            return totalTime;
        }

        private async Task<bool> StageExists(string name)
        {
            return await _context.Stages.AnyAsync(p => p.Name == name);
        }
    }
}
