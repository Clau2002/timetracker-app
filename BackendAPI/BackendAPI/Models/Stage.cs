using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAPI.Models
{
    //public enum Status
    //{
    //    Active,
    //    Inactive,
    //    Canceled
    //}

    public class Stage
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public Guid Id { get; set; }

        public Guid ProjectId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(150)]
        public string Description { get; set; }

        [Required]
        [MaxLength(30)]
        public string Status { get; set; }

        [Required]
        public DateTime Deadline { get; set; }

        public ICollection<TimeEntry> TimeEntries { get; set; }
    }
}
