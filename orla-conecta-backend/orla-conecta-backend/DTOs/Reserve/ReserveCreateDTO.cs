using orla_conecta_backend.Models.Users;
using orla_conecta_backend.DTOs.Reserves;

namespace orla_conecta_backend.DTOs.Reserves
{
    public class ReserveCreateDTO
    {
        public int UserId { get; set; }
        public int? PackageId { get; set; }
        public int HotelId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public int TotalPrice { get; set; }
        public int NumberOfGuests { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;

        public List<ReserveRoomCreateDTO> ReserveRooms { get; set; }

    }
}