using orla_conecta_backend.DTOs.Reserves;
using orla_conecta_backend.Models.Hotels;
using orla_conecta_backend.Models.Reserves;
using orla_conecta_backend.Models.Users;

namespace orla_conecta_backend.Services.Reserves
{
    public interface IReservesService
    {
        Task<List<ReserveDTO>> GetAllAsync();
        Task<ReserveDTO?> GetByIdAsync(int id);
        Task<ReserveDTO> CreateAsync(ReserveCreateDTO dto);
        Task<ReserveDTO> UpdateAsync(int id, ReserveUpdateDTO dto);
        Task<bool> SoftDeleteAsync(int id);
        Task<IEnumerable<ReserveDTO>> GetByUserIdAsync(int userId);

    }
}
