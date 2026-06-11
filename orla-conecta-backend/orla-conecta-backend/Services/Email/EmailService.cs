using System.Net.Mail;
using orla_conecta_backend.DTOs.Contact;
using orla_conecta_backend.Models.Reserves;
using System.Net;
using orla_conecta_backend.Repositories;
using orla_conecta_backend.Models.Hotels;

namespace orla_conecta_backend.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly IRepository<Hotel> repository;
        private readonly ILogger<EmailService> _logger;
        private readonly IWebHostEnvironment _environment;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger, IWebHostEnvironment environment, IRepository<Hotel> hotelRepository)
        {
            _environment = environment;
            repository = hotelRepository;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<string> getBeWelcomeOrlaConecta(string userName)
        {
            // Caminho para o template
            var templatePath = Path.Combine(_environment.ContentRootPath, "templates", "BeWelcomeTamplete.html");

            // Verificar se o arquivo existe
            if (!File.Exists(templatePath))
            {
                throw new FileNotFoundException($"Template de email n�o encontrado: {templatePath}");
            }

            // Ler o conte�do do template
            var templateContent = await File.ReadAllTextAsync(templatePath);

            // Substituir os placeholders pelos valores reais
            var htmlContent = templateContent.Replace("{{UserName}}", userName);

            return htmlContent;
        }

        public async Task SendWelcomeEmailAsync(string email, string userName)
        {
            var smtpClient = new SmtpClient(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"]))
            {
                Credentials = new NetworkCredential(
                    _configuration["Smtp:Username"],
                    _configuration["Smtp:Password"]),
                EnableSsl = true
            };

            var from = new MailAddress(
                _configuration["Smtp:FromEmail"],
                _configuration["Smtp:FromName"]);
            var to = new MailAddress(email);
            var subject = "Bem-vindo ao OrlaConecta!";

            // Obter o conte�do HTML do template
            var htmlContent = await getBeWelcomeOrlaConecta(userName);

            var mailMessage = new MailMessage(from, to)
            {
                Subject = subject,
                Body = htmlContent,
                IsBodyHtml = true
            };

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
                _logger.LogInformation("Email de boas-vindas enviado para {Email} (usu�rio: {UserName})", email, userName);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Falha ao enviar email de boas-vindas para {Email}", email);
                throw new Exception("Falha ao enviar o e-mail de boas-vindas.");
            }
        }

            public async Task SendPasswordResetEmailAsync(string email, string userName, string token)
            {
                var smtpClient = new SmtpClient(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"]))
                {
                    Credentials = new NetworkCredential(
                        _configuration["Smtp:Username"],
                        _configuration["Smtp:Password"]),
                    EnableSsl = true
                };

                var from = new MailAddress(
                    _configuration["Smtp:FromEmail"],
                    _configuration["Smtp:FromName"]);
                var to = new MailAddress(email);
                var subject = "Redefini��o de Senha - OrlaConecta";

                // Link para validar token
                var validateTokenLink = $"http://localhost:5173/validate-token?token={token}";

                // Obter o conte�do HTML do template
                var htmlContent = await GetPasswordResetEmailTemplateAsync(userName, token, validateTokenLink);

                var mailMessage = new MailMessage(from, to)
                {
                    Subject = subject,
                    Body = htmlContent,
                    IsBodyHtml = true
                };

                try
                {
                    await smtpClient.SendMailAsync(mailMessage);
                    _logger.LogInformation("Email de reset de senha enviado para {Email} (usu�rio: {UserName})", email, userName);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Falha ao enviar email de reset para {Email}", email);
                    throw new Exception("Falha ao enviar o e-mail de redefini��o de senha.");
                }
            }

            // m�todo para constru��o do envio para recuperar senha
            public async Task<string> GetPasswordResetEmailTemplateAsync(string userName, string token, string validateTokenLink)
            {
                // Caminho para o template
                var templatePath = Path.Combine(_environment.ContentRootPath, "templates", "PasswordResetEmailTemplate.html");

                // Verificar se o arquivo existe
                if (!File.Exists(templatePath))
                {
                    throw new FileNotFoundException($"Template de email n�o encontrado: {templatePath}");
                }

                // Ler o conte�do do template
                var templateContent = await File.ReadAllTextAsync(templatePath);

                // Substituir os placeholders pelos valores reais
                var htmlContent = templateContent
                    .Replace("{{UserName}}", userName)
                    .Replace("{{Token}}", token)
                    .Replace("{{ValidateTokenLink}}", validateTokenLink);

                return htmlContent;
            }

        public async Task SendApprovedReserve(Reserve reserve)
        {
            // Verifica��o de integridade do objeto antes de enviar o e-mail
            if (reserve.User == null)
            {
                _logger.LogError("Tentativa de envio de e-mail de aprova��o falhou: 'User' da reserva est� nulo.");
                throw new ArgumentNullException(nameof(reserve.User), "Usu�rio da reserva n�o pode ser nulo.");
            }

            if (string.IsNullOrWhiteSpace(reserve.User.Email))
            {
                _logger.LogError("Tentativa de envio de e-mail de aprova��o falhou: 'Email' do usu�rio est� vazio ou nulo.");
                throw new ArgumentException("Email do usu�rio da reserva est� vazio ou nulo.");
            }

            var smtpClient = new SmtpClient(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"]))
            {
                Credentials = new NetworkCredential(
                    _configuration["Smtp:Username"],
                    _configuration["Smtp:Password"]),
                EnableSsl = true
            };

            var from = new MailAddress(
                _configuration["Smtp:FromEmail"],
                _configuration["Smtp:FromName"]);
            var to = new MailAddress(reserve.User.Email);
            _logger.LogInformation("{to}", to);
            var subject = "Reserva Aprovada - OrlaConecta";

            // Obter o conte�do HTML do template
            var htmlContent = await GetApprovedReserve(reserve);

            var mailMessage = new MailMessage(from, to)
            {
                Subject = subject,
                Body = htmlContent,
                IsBodyHtml = true
            };

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
                _logger.LogInformation("Email de aprova��o de reserva enviado para {Email} (usu�rio: {UserName})", reserve.User.Email, reserve.User.Name);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Falha ao enviar e-mail de aprova��o para {Email}", reserve.User.Email);
                throw new Exception($"Falha ao enviar o e-mail de aprova��o para {reserve.User.Email}: {ex.Message}", ex);
            }
        }



        public async Task<string> GetApprovedReserve(Reserve reserve)
        {
            var templatePath = Path.Combine(_environment.ContentRootPath, "templates", "ApprovedReserve.html");
            if (!File.Exists(templatePath))
            {
                throw new FileNotFoundException("Template HTML n�o encontrado.");
            }

            var hotel = await repository.GetByIdAsync(Convert.ToInt32(reserve.HotelId));
            _logger.LogInformation("{hotel}", hotel);
            var templateContent = await File.ReadAllTextAsync(templatePath);

            var htmlContent = templateContent
                .Replace("{{UserName}}", reserve.User.Name)
                .Replace("{{NomeHotel}}", hotel.Name)
                .Replace("{{ReservaId}}", reserve.ReserveId.ToString())
                .Replace("{{CheckInDate}}", reserve.CheckInDate.ToString("dd/MM/yyyy"))
                .Replace("{{CheckOutDate}}", reserve.CheckOutDate.ToString("dd/MM/yyyy"))
                .Replace("{{CheckInTime}}", hotel.CheckInTime.ToString())
                .Replace("{{CheckOutTime}}", hotel.CheckOutTime.ToString())
                .Replace("{{HotelEmail}}", hotel.ContactEmail)
                .Replace("{{HotelPhone}}", hotel.ContactPhone);
            return htmlContent;
        }

        public async Task SendContactMessageAsync(ContactMessageDTO dto)
        {
            var adminEmail = _configuration["Smtp:AdminEmail"] ?? _configuration["Smtp:FromEmail"]!;

            var smtpClient = new SmtpClient(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"]!))
            {
                Credentials = new NetworkCredential(
                    _configuration["Smtp:Username"],
                    _configuration["Smtp:Password"]),
                EnableSsl = true
            };

            var from = new MailAddress(_configuration["Smtp:FromEmail"]!, _configuration["Smtp:FromName"]);
            var to = new MailAddress(adminEmail);
            var subject = $"[Orla Conecta] Contato: {dto.Assunto}";

            var body = $@"<h2>Nova mensagem de contato</h2>
<p><strong>Nome:</strong> {dto.Nome}</p>
<p><strong>Email:</strong> {dto.Email}</p>
<p><strong>Telefone:</strong> {dto.Telefone ?? "N\u00e3o informado"}</p>
<p><strong>Assunto:</strong> {dto.Assunto}</p>
<hr />
<p><strong>Mensagem:</strong></p>
<p>{System.Web.HttpUtility.HtmlEncode(dto.Mensagem).Replace("\n", "<br/>")}</p>";

            var mailMessage = new MailMessage(from, to)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
                ReplyToList = { new MailAddress(dto.Email, dto.Nome) }
            };

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
                _logger.LogInformation("Email de contato recebido de {Email} com assunto '{Assunto}'", dto.Email, dto.Assunto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Falha ao enviar email de contato de {Email}", dto.Email);
                throw new Exception("Falha ao processar mensagem de contato.", ex);
            }
        }

        public async Task SendBusinessRegistrationAsync(BusinessRegistrationDTO dto)
        {
            var adminEmail = _configuration["Smtp:AdminEmail"] ?? _configuration["Smtp:FromEmail"]!;

            var smtpClient = new SmtpClient(_configuration["Smtp:Host"], int.Parse(_configuration["Smtp:Port"]!))
            {
                Credentials = new NetworkCredential(
                    _configuration["Smtp:Username"],
                    _configuration["Smtp:Password"]),
                EnableSsl = true
            };

            var from = new MailAddress(_configuration["Smtp:FromEmail"]!, _configuration["Smtp:FromName"]);
            var to = new MailAddress(adminEmail);
            var subject = $"[Orla Conecta] Novo Cadastro de Neg\u00f3cio: {dto.Nome}";

            var body = $@"<h2>Novo cadastro de neg\u00f3cio</h2>
<p><strong>Nome do Neg\u00f3cio:</strong> {dto.Nome}</p>
<p><strong>Categoria:</strong> {dto.Categoria}</p>
<p><strong>Cidade:</strong> {dto.Cidade}</p>
<p><strong>Endere\u00e7o:</strong> {dto.Endereco}</p>
<p><strong>Telefone:</strong> {dto.Telefone}</p>
<p><strong>Email:</strong> {dto.Email}</p>
<p><strong>Website:</strong> {dto.Website ?? "N\u00e3o informado"}</p>
<hr />
<p><strong>Descri\u00e7\u00e3o:</strong></p>
<p>{System.Web.HttpUtility.HtmlEncode(dto.Descricao).Replace("\n", "<br/>")}</p>";

            var mailMessage = new MailMessage(from, to)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
                ReplyToList = { new MailAddress(dto.Email, dto.Nome) }
            };

            try
            {
                await smtpClient.SendMailAsync(mailMessage);
                _logger.LogInformation("Cadastro de neg\u00f3cio recebido de {Email} ({Nome})", dto.Email, dto.Nome);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Falha ao enviar email de cadastro de neg\u00f3cio de {Email}", dto.Email);
                throw new Exception("Falha ao processar cadastro de neg\u00f3cio.", ex);
            }
        }
    }


}