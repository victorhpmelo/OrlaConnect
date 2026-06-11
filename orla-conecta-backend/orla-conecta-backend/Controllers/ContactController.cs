using Microsoft.AspNetCore.Mvc;
using orla_conecta_backend.DTOs;
using orla_conecta_backend.DTOs.Contact;
using orla_conecta_backend.Services.Email;

namespace orla_conecta_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly ILogger<ContactController> _logger;

        public ContactController(IEmailService emailService, ILogger<ContactController> logger)
        {
            _emailService = emailService;
            _logger = logger;
        }

        /// <summary>Envia mensagem de contato para a equipe Orla Conecta.</summary>
        [HttpPost("message")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendContactMessage([FromBody] ContactMessageDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<object>(false, "Dados inválidos.", null,
                    ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)));

            try
            {
                await _emailService.SendContactMessageAsync(dto);
                _logger.LogInformation("Mensagem de contato enviada por {Email}", dto.Email);
                return Ok(new ApiResponse<object>(true, "Mensagem enviada com sucesso. Entraremos em contato em breve!"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao processar mensagem de contato de {Email}", dto.Email);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new ApiResponse<object>(false, "Erro interno ao enviar mensagem. Tente novamente mais tarde."));
            }
        }

        /// <summary>Registra interesse de cadastro de negócio no litoral.</summary>
        [HttpPost("business-registration")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RegisterBusiness([FromBody] BusinessRegistrationDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<object>(false, "Dados inválidos.", null,
                    ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)));

            try
            {
                await _emailService.SendBusinessRegistrationAsync(dto);
                _logger.LogInformation("Cadastro de negócio recebido de {Email} ({Nome})", dto.Email, dto.Nome);
                return Ok(new ApiResponse<object>(true, "Cadastro enviado com sucesso! Nossa equipe entrará em contato em breve."));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao processar cadastro de negócio de {Email}", dto.Email);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new ApiResponse<object>(false, "Erro interno ao enviar cadastro. Tente novamente mais tarde."));
            }
        }
    }
}
