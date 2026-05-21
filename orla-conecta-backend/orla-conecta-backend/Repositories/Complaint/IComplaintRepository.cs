using orla_conecta_backend.Models;

namespace orla_conecta_backend.Repositories
{
    public interface IComplaintRepository
    {
        Task<Complaint> CreateComplaintAsync(Complaint complaint);
        Task<List<Complaint>> GetComplaintsByHotelIdAsync(int hotelId);
        Task<List<Complaint>> GetAllComplaintsAsync();
    }
}
