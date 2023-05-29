using BackendAPI.Models;

namespace BackendAPI.DTO
{
    public class ProjectDTO
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Status ProjectStatus { get; set; }
        public ICollection<Stage> Stages { get; set; }
    }
}
