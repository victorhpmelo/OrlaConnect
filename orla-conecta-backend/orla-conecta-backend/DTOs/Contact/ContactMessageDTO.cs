using System.ComponentModel.DataAnnotations;

namespace orla_conecta_backend.DTOs.Contact
{
    public class ContactMessageDTO
    {
        [Required(ErrorMessage = "Nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "Nome não pode exceder 100 caracteres.")]
        public string Nome { get; set; } = null!;

        [Required(ErrorMessage = "Email é obrigatório.")]
        [EmailAddress(ErrorMessage = "Formato de email inválido.")]
        public string Email { get; set; } = null!;

        [Phone(ErrorMessage = "Formato de telefone inválido.")]
        public string? Telefone { get; set; }

        [Required(ErrorMessage = "Assunto é obrigatório.")]
        [StringLength(200, ErrorMessage = "Assunto não pode exceder 200 caracteres.")]
        public string Assunto { get; set; } = null!;

        [Required(ErrorMessage = "Mensagem é obrigatória.")]
        [StringLength(2000, ErrorMessage = "Mensagem não pode exceder 2000 caracteres.")]
        public string Mensagem { get; set; } = null!;
    }
}
