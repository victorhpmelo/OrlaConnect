using System.ComponentModel.DataAnnotations;

namespace orla_conecta_backend.DTOs.Contact
{
    public class BusinessRegistrationDTO
    {
        [Required(ErrorMessage = "Nome do negócio é obrigatório.")]
        [StringLength(100, ErrorMessage = "Nome do negócio não pode exceder 100 caracteres.")]
        public string Nome { get; set; } = null!;

        [Required(ErrorMessage = "Categoria é obrigatória.")]
        public string Categoria { get; set; } = null!;

        [Required(ErrorMessage = "Cidade é obrigatória.")]
        public string Cidade { get; set; } = null!;

        [Required(ErrorMessage = "Endereço é obrigatório.")]
        [StringLength(300, ErrorMessage = "Endereço não pode exceder 300 caracteres.")]
        public string Endereco { get; set; } = null!;

        [Required(ErrorMessage = "Telefone é obrigatório.")]
        [Phone(ErrorMessage = "Formato de telefone inválido.")]
        public string Telefone { get; set; } = null!;

        [Required(ErrorMessage = "Email é obrigatório.")]
        [EmailAddress(ErrorMessage = "Formato de email inválido.")]
        public string Email { get; set; } = null!;

        [Url(ErrorMessage = "Formato de URL inválido.")]
        public string? Website { get; set; }

        [Required(ErrorMessage = "Descrição é obrigatória.")]
        [StringLength(2000, ErrorMessage = "Descrição não pode exceder 2000 caracteres.")]
        public string Descricao { get; set; } = null!;
    }
}
