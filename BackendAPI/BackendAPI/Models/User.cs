using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAPI.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }

        //[Required]
        [MaxLength(50)]
        public string UserName { get; set; }

        //[Required]
        //[MaxLength (50)]
        //public string? Password { get; set; }

        public byte[] PasswordHash { get; set; }
        
        public byte[] PasswordSalt { get; set; }

        [MaxLength (100)]
        public string Email { get; set; }

        public ICollection<Project> Projects { get; set; } = new List<Project> ();
    }
}
