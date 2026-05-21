using Microsoft.EntityFrameworkCore;
using orla_conecta_backend.Data;
using orla_conecta_backend.Models;

namespace orla_conecta_backend.Repositories
{
    public class ComplaintRepository : IComplaintRepository
    {
        private readonly AppDbContext _context;

        public ComplaintRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Complaint> CreateComplaintAsync(Complaint complaint)
        {
            _context.Complaints.Add(complaint);
            await _context.SaveChangesAsync();
            return complaint;
        }

        public async Task<List<Complaint>> GetComplaintsByHotelIdAsync(int hotelId)
        {
            return await _context.Complaints
                .Where(c => c.HotelId == hotelId && c.IsActive)
                .Include(c => c.User)
                .ToListAsync();
        }

        public async Task<List<Complaint>> GetAllComplaintsAsync()
        {
            return await _context.Complaints
                .Where(c => c.IsActive)
                .Include(c => c.User)
                .ToListAsync();
        }
    }
}
