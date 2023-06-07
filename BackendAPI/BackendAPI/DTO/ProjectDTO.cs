using BackendAPI.Models;

namespace BackendAPI.DTO
{
    public class ProjectDTO
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public ICollection<StageDTO> Stages { get; set; }
    }
}
