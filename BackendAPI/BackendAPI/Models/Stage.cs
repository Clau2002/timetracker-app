using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAPI.Models
{
    public enum Status
    {
        Active,
        Inactive,
        Canceled
    }

    public class Stage
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }

        public int ProjectId { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Name { get; set; }

        //[Required] ??
        [MaxLength(150)]
        public string? Description { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public Status StageStatus { get; set; }

        [Required]
        public DateTime Deadline { get; set; }

        public ICollection<TimeEntry> TimeEntries { get; set; } = new List<TimeEntry>();
    }
}
