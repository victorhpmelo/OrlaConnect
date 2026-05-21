using orla_conecta_backend.DTOs.Auth;
using orla_conecta_backend.Models.Users;

namespace orla_conecta_backend.Repositories.Auth
{
    public interface IGoogleAccountRepository
    {
        // Cria um usuário via Gmail
        Task<User> CreateOrLoginOAuth(OAuthRequest dto);
    }
}
