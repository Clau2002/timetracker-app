using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;
using BackendAPI.Data;
using Microsoft.AspNetCore.Authorization;
using BackendAPI.Interfaces;
using AutoMapper;
using BackendAPI.DTO;

namespace BackendAPI.Controllers
{
    [Authorize]
    public class UsersController : BaseControllerApi
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public UsersController(IUserRepository userRepository, IMapper mapper, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<ActionResult<ICollection<UserDTO>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();
            var usersToReturn = _mapper.Map<ICollection<UserDTO>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet("username/{username}")]
        public async Task<ActionResult<UserDTO>> GetUserByUsername(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            var userToReturn = _mapper.Map<UserDTO>(user);
            userToReturn.Token = _tokenService.CreateToken(user);
            return userToReturn;
        }


        [HttpGet("id/{id}")]
        public async Task<ActionResult<UserDTO>> GetUserById(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            var userToReturn = _mapper.Map<UserDTO>(user);
            return userToReturn;
        }

        //[HttpPut]
        //public async Task UpdateUser(User user)
        //{
        //    await _userRepository.UpdateUserAsync(user);
        //}

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutUser(int id, User user)
        //{
        //    if (id != user.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(user).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (await UserExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //[HttpPost]
        //public async Task<ActionResult<User>> PostUser(User user)
        //{
        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetUser", new { id = user.Id }, user);
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUser(int id)
        //{
        //    var user = await _context.Users.FindAsync(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Users.Remove(user);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private async Task<bool> UserExists(int id)
        //{
        //    return await _context.Users.AnyAsync(u => u.Id == id);
        //}
    }
}
