using orla_conecta_backend.DTOs.Reserves;
using orla_conecta_backend.Models.Reserves;
using orla_conecta_backend.Models.Users;

namespace orla_conecta_backend.Repositories.ReserveRepository
{
    public interface IReserveRepository 
    {
        Task<Reserve?> GetByIdAsync(int id);
        Task<IEnumerable<Reserve>> GetByHotelIdAsync(int hotelId);
        Task<Reserve> CreateReserveAsync(Reserve reserve);
        Task<Reserve> UpdateAsync(Reserve reserve);
        Task<IEnumerable<Reserve>> GetReserveByUser(int userId);
        Task<IEnumerable<Reserve>> GetByUserIdAsync(int userId);
    }
}
