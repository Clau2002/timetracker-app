using BackendAPI.Data;
using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Repositories
{
    public class TimeEntryRepository : ITimeEntryRepository
    {
        private readonly DataContext _context;

        public TimeEntryRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ICollection<TimeEntry>> GetAllTimeEntriesAsync()
        {
            return await _context.TimeEntries.ToListAsync();
        }

        public async Task<TimeEntry> CreateTimeEntryAsync(TimeEntry timeEntry)
        {
            if (await TimeEntryExists(timeEntry))
            {
                return null;
            }

            _context.TimeEntries.Add(timeEntry);
            await _context.SaveChangesAsync();
            return timeEntry;
        }

        public async Task<ICollection<TimeEntry>> GetAllTimeEntriesByUserIdAsync(int userId)
        {
            var timeEntriesQuery = await (from user in _context.Users
                                          join project in _context.Projects on user.Id equals project.UserId
                                          join stage in _context.Stages on project.Id equals stage.ProjectId
                                          join timeEntry in _context.TimeEntries on stage.Id equals timeEntry.StageId
                                          where user.Id == userId
                                          select timeEntry).ToListAsync();

            return timeEntriesQuery;
        }


        public async Task<ICollection<TimeEntry>> GetAllTimeEntriesByStageIdAsync(int stageId)
        {
            var timeEntriesQuery = await (from stage in _context.Stages
                                          join timeEntry in _context.TimeEntries
                                          on stage.Id equals timeEntry.StageId
                                          where stage.Id == stageId
                                          select new TimeEntry
                                          {
                                              Id = timeEntry.Id,
                                              StageId = timeEntry.StageId,
                                              StartTime = timeEntry.StartTime,
                                              EndTime = timeEntry.EndTime
                                          }).ToListAsync();
            return timeEntriesQuery;
        }

        public async Task<TimeEntry> GetTimeEntryByIdAsync(int id)
        {
            return await _context.TimeEntries.FindAsync(id);
        }

        public async Task UpdateTimeEntryAsync(TimeEntry timeEntry)
        {
            _context.TimeEntries.Update(timeEntry);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> TimeEntryExists(TimeEntry timeEntry)
        {
            return await _context.TimeEntries.AnyAsync(t => t.StartTime.Equals(timeEntry.StartTime) && t.EndTime.Equals(timeEntry.EndTime));
        }
    }
}
