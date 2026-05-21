using orla_conecta_backend.Models.Reviews;

namespace orla_conecta_backend.Repositories
{
    public interface IReviewRepository
    {
        Task<Review> CreateReviewAsync(Review review);
        Task<IEnumerable<Review>> GetReviewsByHotelIdAsync(int hotelId);
        Task<Review?> GetReviewByIdAsync(int reviewId);
        Task<bool> UpdateReviewAsync(Review review);
        Task<bool> SoftDeleteReviewAsync(int reviewId);
        Task<double> CalculateHotelAverageRatingAsync(int hotelId);
    }
}