using orla_conecta_backend.DTOs.Auth;
using orla_conecta_backend.DTOs.User;
using orla_conecta_backend.DTOs.Users;
using orla_conecta_backend.Models.Users;

namespace orla_conecta_backend.Repositories.Users
{
    public interface IUserRepository : IRepository<User>
    {
        Task<bool> EmailExistsAsync(string email);
        Task<bool> CpfExistsAsync(string? cpf);
        Task<User> CreateWithRoleAsync(User user, string roleName);
        Task<UserDTO> CreateClientAsync(CreateClientDTO request);
        Task<UserDTO> CreateServiceProviderAsync(CreateServiceProviderDTO request);
        Task<UserDTO> CreateAttendantAsync(CreateAttendantDTO request);
        Task<UserDTO> CreateAdminAsync(CreateAdminDTO request);
        Task<User> CreateOrLoginOAuth(OAuthRequest dto);
        Task<UserDTO> GetByIdAsync(int id);
        Task<List<UserDTO>> GetAllAsync(); 
        Task<bool> ReactivateAsync(int id);
        Task<bool> SoftDeleteAsync(int id);
        Task<UserDTO> UpdateAsync(int id, UpdateUserDTO request);
    }
}