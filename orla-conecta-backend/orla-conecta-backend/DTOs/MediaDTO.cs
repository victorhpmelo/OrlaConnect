using System.ComponentModel.DataAnnotations;

namespace orla_conecta_backend.DTOs
{
    public class MediaDTO
    {
        public int MediaId { get; set; }

        [Required]
        public string MediaUrl { get; set; } = null!;

        [Required]
        public string MediaType { get; set; } = null!;
    }
}