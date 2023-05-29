using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface IStageRepository
    {
        Task<Stage> GetStageByIdAsync(int id);
        Task<Stage> GetStageByNameAsync(string name);
        Task<IEnumerable<Stage>> GetStagesAsync();
        void Update(Stage stage);
        Task<bool> SaveAll();
    }
}
