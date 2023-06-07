using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface IStageRepository
    {
        Task<Stage> GetStageByIdAsync(Guid id);
        Task<Stage> GetStageByNameAsync(string name);
        Task<ICollection<Stage>> GetStagesAsync();
        Task<ICollection<Stage>> GetStagesByProjectIdAsync();
        void Update(Stage stage);
        Task<bool> SaveAll();
    }
}
