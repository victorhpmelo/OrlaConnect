using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using orla_conecta_backend.Repositories;

namespace orla_conecta_backend.Models.Packages
{
    public class PackageDate : ISoftDeletable
    {
        [Key]
        public int PackageDateId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int PackageId { get; set; }

        [ForeignKey("PackageId")]
        public virtual Package? Package { get; set; }
        public bool IsActive { get; set; } = true;

    }
}