
namespace orla_conecta_backend.DTOs.Hotel
{
    public class CreateHotelWithRoomTypesDTO : CreateHotelDTO
    {
        public List<CreateHotelRoomTypeDTO> RoomTypes { get; set; }
    }

}