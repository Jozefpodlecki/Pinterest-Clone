using DAL.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pinterest_Clone.Services
{
    public interface IImageService
    {
        Task<IEnumerable<Image>> GetImages(string value, int page, int pageSize);
        Task<List<Comment>> GetComments(int imageId, int page, int pageSize);
        Task<Image> GetImage(int id);
        Task<int> AddImage(
            int? imageId,
            int categoryId,
            string title,
            string description,
            string fileName,
            string contentType,
            int offset,
            byte[] data
        );
        Task AddImageToCollection(int imageId, int categoryId);
        Task UpdateImage(object data);
        Task<List<Category>> GetCategories(string value, int page, int pageSize);
        Task<List<IGrouping<Category, UserImage>>> GetUserImages();
        Task RemoveImage(int imageId);
        Task AddComment(int imageId, string text);
        Task RemoveComment(int commentId);
    }
}
