
using orla_conecta_backend.Models.Commodities;
using orla_conecta_backend.Models.CustomCommodities;

namespace orla_conecta_backend.Repositories.CommodityRepository
{
    public interface ICustomCommodityRepository : IRepository<CustomCommodity>
    {
        Task<IEnumerable<CustomCommodity>> GetAllAsync();
        Task<CustomCommodity?> GetByIdAsync(int id);
        Task<IEnumerable<CustomCommodity>> GetByCommodityIdAsync(int commoditieId);
        Task<CustomCommodity> AddAsync(CustomCommodity entity);
        Task<CustomCommodity> UpdateAsync(CustomCommodity entity);
        Task<bool> SoftDeleteAsync(int id);

    }
}
