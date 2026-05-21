using System.ComponentModel.DataAnnotations;

namespace orla_conecta_backend.DTOs.Auth
{
    public class ValidateTokenRequestDTO
    {
        [Required(ErrorMessage = "Token é obrigatório")]
        [StringLength(6, MinimumLength = 6, ErrorMessage = "Token deve ter exatamente 6 dígitos")]
        [RegularExpression(@"^\d{6}$", ErrorMessage = "Token deve conter apenas números")]
        public string Token { get; set; } = null!;
    }
}
