using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using orla_conecta_backend.Models.Commodities;
using orla_conecta_backend.Models.Hotels;
using orla_conecta_backend.Repositories;

namespace orla_conecta_backend.Models.CustomCommodities
{
    public class CustomCommodity : ISoftDeletable
    {
        [Key]
        public int CustomCommodityId { get; set; }

        [Required(ErrorMessage = "Service name is required")]
        [StringLength(100, ErrorMessage = "The service name cannot exceed 100 characters")]
        public string Name { get; set; } = null!;

        public bool IsPaid { get; set; }
        public decimal Price { get; set; } // Added

        [StringLength(250, ErrorMessage = "The description cannot exceed 250 characters")]
        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;

        public int CommodityId { get; set; }

        [ForeignKey("CommodityId")]
        public Commodity Commodity { get; set; } = null!;

        public int HotelId { get; set; }

        [ForeignKey("HotelId")]
        public Hotel? Hotel { get; set; } = null!;
    }
}
