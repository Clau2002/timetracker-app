namespace BackendAPI.DTO
{
    public class StageDTO
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Status { get; set; }

        public DateTime Deadline { get; set; }

        public ICollection<TimeEntryDTO> TimeEntries { get; set; }
    }
}
