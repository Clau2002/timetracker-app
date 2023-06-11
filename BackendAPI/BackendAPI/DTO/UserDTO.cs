namespace BackendAPI.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public ICollection<ProjectDTO> Projects { get; set; }
        public string Token { get; set; }
    }
}
