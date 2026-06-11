using orla_conecta_backend.DTOs.Contact;
using orla_conecta_backend.DTOs.Reserves;
using orla_conecta_backend.Models.Reserves;

namespace orla_conecta_backend.Services.Email
{
    public interface IEmailService
    {
        Task SendPasswordResetEmailAsync(string email, string userName, string token);
        Task SendWelcomeEmailAsync(string email, string userName);
        Task<string> GetPasswordResetEmailTemplateAsync(string userName, string token, string validateTokenLink);
        Task SendApprovedReserve(Reserve reserve);
        Task SendContactMessageAsync(ContactMessageDTO dto);
        Task SendBusinessRegistrationAsync(BusinessRegistrationDTO dto);
    }
}
