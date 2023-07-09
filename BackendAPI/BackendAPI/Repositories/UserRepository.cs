using AutoMapper;
using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IProjectRepository _projectRepository;

        public UserRepository(DataContext context, IProjectRepository projectRepository)
        {
            _context = context;
            _projectRepository = projectRepository;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                var projects = await _projectRepository.GetProjectsByUserIdAync(id);
                user.Projects = projects;
            }
            return user;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
            if (user != null)
            {
                var projects = await _projectRepository.GetProjectsByUserIdAync(user.Id);
                user.Projects = projects;
            }
            return user;
        }

        public async Task<ICollection<User>> GetUsersAsync()
        {
            var users = await _context.Users
                .Include(u => u.Projects)
                    .ThenInclude(p => p.Stages)
                        .ThenInclude(s => s.TimeEntries)
                .ToListAsync();

            return users;
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

    }
}
