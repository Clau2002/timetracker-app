using BackendAPI.Models;

namespace BackendAPI.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
