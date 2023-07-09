using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;
using BackendAPI.Data;
using Microsoft.AspNetCore.Authorization;
using BackendAPI.Interfaces;
using AutoMapper;
using BackendAPI.DTO;
using System.Security.Cryptography;
using System.Text;

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
            userToReturn.Token = _tokenService.CreateToken(user);
            return userToReturn;
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateUser(UserDTO updatedUserDTO)
        {
            var existingUser = await _userRepository.GetUserByIdAsync(updatedUserDTO.Id);

            if (existingUser == null)
            {
                return NotFound();
            }

            _mapper.Map(updatedUserDTO, existingUser);

            await _userRepository.UpdateUserAsync(existingUser);

            return NoContent();
        }

        [HttpPut("updatePassword")]
        public async Task<ActionResult> UpdateUserPassword(UpdatedUserDTO updatedUserDTO)
        {
            var existingUser = await _userRepository.GetUserByIdAsync(updatedUserDTO.Id);

            if (existingUser == null)
            {
                return NotFound();
            }

            // Update the user properties
            //existingUser.FirstName = updatedUserDTO.FirstName;
            //existingUser.LastName = updatedUserDTO.LastName;
            //existingUser.Email = updatedUserDTO.Email;

            // Check if the password is being updated
            if (!string.IsNullOrEmpty(updatedUserDTO.NewPassword))
            {
                // Generate a new salt
                using var hmac = new HMACSHA512();

                existingUser.PasswordSalt = hmac.Key;
                existingUser.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(updatedUserDTO.NewPassword));
            }

            await _userRepository.UpdateUserAsync(existingUser);

            return NoContent();
        }

        [HttpDelete("delete/id/{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            await _userRepository.DeleteUserAsync(user);

            return NoContent();
        }

    }
}
