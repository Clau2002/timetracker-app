namespace BackendAPI.DTO
{
    public class TimeEntryDTO
    {
        public int Id { get; set; }

        public int StageId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
    }
}
