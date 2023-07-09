using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface ITimeEntryRepository
    {
        Task<ICollection<TimeEntry>> GetAllTimeEntriesAsync();
        Task<ICollection<TimeEntry>> GetAllTimeEntriesByUserIdAsync(int userId);
        Task<TimeEntry> GetTimeEntryByIdAsync(int id);
        Task<ICollection<TimeEntry>> GetAllTimeEntriesByStageIdAsync(int stageId);
        Task<TimeEntry> CreateTimeEntryAsync(TimeEntry timeEntry);
        Task UpdateTimeEntryAsync(TimeEntry timeEntry);
    }
}
