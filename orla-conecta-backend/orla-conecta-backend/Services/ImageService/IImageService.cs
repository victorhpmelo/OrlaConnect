namespace orla_conecta_backend.Services.ImageService
{
    public interface IImageService
    {
        Task<string?> UploadImageAsync(IFormFile? file, string userId);
    }
}
