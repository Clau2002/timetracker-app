using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAPI.Models
{
    public class Project
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }
        
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        //[Required] ??
        [MaxLength(150)]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public Status ProjectStatus { get; set; }

       
        public ICollection<Stage> Stages { get; set; } = new List<Stage>();
      

    }
}
