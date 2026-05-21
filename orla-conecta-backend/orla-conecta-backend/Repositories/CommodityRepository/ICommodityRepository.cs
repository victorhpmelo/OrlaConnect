using System.Linq.Expressions;
using orla_conecta_backend.Models.Commodities;
using orla_conecta_backend.Models.CustomCommodities;

namespace orla_conecta_backend.Repositories.CommodityRepository
{
    public interface ICommodityRepository : IRepository<Commodity>
    {
        Task<IEnumerable<Commodity>> GetAllAsync();
        Task<Commodity?> GetByIdAsync(int id);
        Task<Commodity?> GetByHotelIdAsync(int hotelId);
        Task<Commodity?> GetByHotelNameAsync(string hotelName);
        Task<Commodity> AddAsync(Commodity entity);
        Task<Commodity> UpdateAsync(Commodity entity);
        Task<bool> SoftDeleteAsync(int id);
        Task<bool> DeleteAsync(int id);
        Task<Commodity?> GetByIdWithIncludesAsync(int id, params Expression<Func<Commodity, object>>[] includes);


    }
}