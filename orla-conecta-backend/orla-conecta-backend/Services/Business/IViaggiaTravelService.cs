using orla_conecta_backend.Models.Hotels;
using orla_conecta_backend.Models.Packages;

namespace orla_conecta_backend.Services.Business
{
    public interface IOrlaConectaTravelService
    {
        /// <summary>
        /// Confirma uma reserva após pagamento bem-sucedido
        /// </summary>
        Task<bool> ConfirmReservationAsync(string paymentIntentId);

        /// <summary>
        /// Cancela uma reserva e libera recursos
        /// </summary>
        Task<bool> CancelReservationAsync(string paymentIntentId, string reason);

        /// <summary>
        /// Processa reembolso com políticas de cancelamento
        /// </summary>
        Task<decimal> CalculateRefundAmountAsync(string paymentIntentId, DateTime cancellationDate);

        /// <summary>
        /// Notifica hotéis parceiros sobre mudanças na reserva
        /// </summary>
        Task NotifyHotelPartnersAsync(int hotelId, string action, object data);

        /// <summary>
        /// Envia voucher de confirmação por email
        /// </summary>
        Task SendConfirmationVoucherAsync(string paymentIntentId);

        /// <summary>
        /// Verifica disponibilidade e faz pré-reserva
        /// </summary>
        Task<bool> CreateTemporaryReservationAsync(int packageId, DateTime checkIn, DateTime checkOut, int guests);

        /// <summary>
        /// Libera pré-reservas expiradas
        /// </summary>
        Task ReleaseExpiredReservationsAsync();
    }
}
