using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private ProjectRepository projectRepository;
        public UserRepository(DataContext context)
        {
            _context = context;
            projectRepository = new ProjectRepository(context);
        }

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                var projects = await projectRepository.GetProjectsByUserIdAync(id);
                user.Projects = projects;
            }
            return user;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
            if (user != null)
            {
                var projects = await projectRepository.GetProjectsByUserIdAync(user.Id);
                user.Projects = projects;
            }
            return user;
        }

        public async Task<ICollection<User>> GetUsersAsync()
        {
            var users = await _context.Users.ToListAsync();

            foreach (var user in users)
            {
                await GetUserByIdAsync(user.Id);
            }

            return users;
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

    }
}
