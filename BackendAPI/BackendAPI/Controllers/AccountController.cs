using AutoMapper;
using BackendAPI.Data;
using BackendAPI.DTO;
using BackendAPI.Interfaces;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace BackendAPI.Controllers
{
    public class AccountController : BaseControllerApi
    {
        private readonly ITokenService _tokenService;
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _tokenService = tokenService;
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Username))
                return BadRequest("Username not available, choose another one");

            using var hmac = new HMACSHA512();
            var user = new User
            {
                UserName = registerDTO.Username.ToLower(),
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password.ToLower())),
                PasswordSalt = hmac.Key,
                Email = registerDTO.Email.ToLower()
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var newUserDTO = _mapper.Map<UserDTO>(user);
            newUserDTO.Token = _tokenService.CreateToken(user);
            return newUserDTO;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == loginDTO.Username);
            if (user == null)
                return Unauthorized("invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("invalid password");
            }

            var newUserDTO = _mapper.Map<UserDTO>(user);
            newUserDTO.Token = _tokenService.CreateToken(user);
            return newUserDTO;
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.UserName == username.ToLower());
        }
    }
}
