using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Data
{
    public class StageRepository : IStageRepository
    {
        private readonly DataContext _context;

        public StageRepository(DataContext dataContext)
        {
            _context = dataContext;
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
            return await _context.Stages.FindAsync(id);
        }

        public async Task<Stage> GetStageByNameAsync(string name)
        {
            return await _context.Stages.SingleOrDefaultAsync(s => s.Name == name);
        }

        public async Task<ICollection<Stage>> GetStagesAsync()
        {
            return await _context.Stages.ToListAsync();
        }

        public Task<ICollection<Stage>> GetStagesByProjectIdAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Stage stage)
        {
            _context.Entry(stage).State = EntityState.Modified;
        }

        private async Task<bool> StageExists(string name)
        {
            return await _context.Stages.AnyAsync(p => p.Name == name);
        }
    }
}
