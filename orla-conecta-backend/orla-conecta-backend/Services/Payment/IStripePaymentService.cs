using Stripe;
using Stripe.Checkout;
using System.Threading.Tasks;
using orla_conecta_backend.DTOs.Hotel;
using orla_conecta_backend.DTOs.Reserves;

namespace orla_conecta_backend.Services.Payment
{
    public interface IStripePaymentService
    {
        /// <summary>
        /// Cria um Payment Intent no Stripe para processar o pagamento
        /// </summary>
        Task<Session> CreatePaymentIntentAsync(ReserveCreateDTO createResevation);
        Task<Balance> GetBalanceAsync();
        Task<List<HotelBalanceDTO>> GetBalanceByHotelAsync();
        Task HandleStripeWebhookAsync(HttpRequest request);
    }
}
