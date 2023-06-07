using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<ICollection<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(Guid id);
        Task<User> GetUserByUsernameAsync(string username);
        Task UpdateUserAsync(User user);
    }
}
