using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface IUserRepository
    {
        void Update(User user);
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByUsernameAsync(string username);
    }
}
