using orla_conecta_backend.Models.Hotels;

namespace orla_conecta_backend.DTOs.Hotel
{
    public class HotelRoomTypeDTO
    {
        public int RoomTypeId { get; set; }
        public RoomTypeEnum Name { get; set; } 
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Capacity { get; set; }
        public string? BedType { get; set; }
        public int TotalRooms { get; set; }
        public int AvailableRooms { get; set; }
        public bool IsActive { get; set; }
    }
}
