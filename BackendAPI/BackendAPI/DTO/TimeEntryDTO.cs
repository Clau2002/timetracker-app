namespace BackendAPI.DTO
{
    public class TimeEntryDTO
    {
        public Guid Id { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
    }
}
