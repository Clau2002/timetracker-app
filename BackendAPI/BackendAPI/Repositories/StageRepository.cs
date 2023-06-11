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
    }
}
