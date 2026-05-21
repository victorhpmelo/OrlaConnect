using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using orla_conecta_backend.Models.Hotels;

namespace orla_conecta_backend.Models.Reserves
{
    public class ReserveRoom
    {
        [Key]
        public int Id { get; set; }

        public int ReserveId { get; set; }
        [ForeignKey("ReserveId")]
        public virtual Reserve Reserve { get; set; } = null!;

        public int RoomTypeId { get; set; }
        [ForeignKey("RoomTypeId")]
        public virtual HotelRoomType RoomType { get; set; } = null!;

        public int Quantity { get; set; }
    }

}
