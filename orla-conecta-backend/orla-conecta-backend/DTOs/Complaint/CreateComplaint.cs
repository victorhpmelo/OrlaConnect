namespace orla_conecta_backend.DTOs.Complaint
{
    public class CreateComplaintDTO
    {
        public int UserId { get; set; }
        public int HotelId { get; set; }
        public string Comment { get; set; }
    }
}
