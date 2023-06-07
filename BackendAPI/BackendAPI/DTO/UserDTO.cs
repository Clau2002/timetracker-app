namespace BackendAPI.DTO
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public ICollection<ProjectDTO> Projects { get; set; }
        public string Token { get; set; }
    }
}
