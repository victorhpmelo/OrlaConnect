using System.ComponentModel.DataAnnotations;
using orla_conecta_backend.Repositories;

namespace orla_conecta_backend.Models.Users
{
    public class Role : ISoftDeletable
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50, ErrorMessage = "Role name cannot exceed 50 characters.")]
        public string Name { get; set; } = null!;

        public bool IsActive { get; set; } = true;

        // Relationships
        public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}