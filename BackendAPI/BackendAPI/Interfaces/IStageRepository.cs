using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface IStageRepository
    {
        Task<Stage> GetStageByIdAsync(int id);
        Task<Stage> GetStageByNameAsync(string name);
        Task<ICollection<Stage>> GetStagesAsync();
        Task<ICollection<Stage>> GetStagesByProjectIdAsync(int projectId);
        Task<Stage> CreateStageAsync(Stage stage);
        Task UpdateStageAsync(Stage stage);
        Task<TimeSpan> GetStageTotalTimeSpentAsync(int stageId);
    }
}
