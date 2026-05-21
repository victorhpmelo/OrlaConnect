using orla_conecta_backend.DTOs.Auth;
using orla_conecta_backend.Models.Users;

namespace orla_conecta_backend.Repositories.Auth
{
    public interface IAuthRepository
    {
        Task<string> LoginAsync(string email, string password);
        Task<User> GetUserByEmailAsync(string email);
        Task<string> GenerateJwtTokenAsync(User user);
        Task RevokeTokenAsync(string token);
        Task<bool> IsTokenRevokedAsync(string token);
        Task<string> GeneratePasswordResetTokenAsync(string email);
        Task<ValidateTokenResponseDTO> ValidatePasswordResetTokenAsync(string token);
        Task<bool> ResetPasswordAsync(string token, string newPassword);
    }

}
