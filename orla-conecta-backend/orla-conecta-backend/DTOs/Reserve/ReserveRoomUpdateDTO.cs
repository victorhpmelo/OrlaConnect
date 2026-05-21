using System.ComponentModel.DataAnnotations;

namespace orla_conecta_backend.DTOs.Reserve
{
    public class ReserveRoomUpdateDTO
    {
        [Required]
        public int RoomTypeId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; }
    }
}
