using DAL;
using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Pinterest_Clone.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Pinterest_Clone.Services
{
    public class ImageService
    {
        private readonly AppDBContext _dbContext;
        private readonly UserContext _userContext;
        private readonly CacheService _cacheService;

        public ImageService(
            AppDBContext dbContext,
            UserContext userContext,
            CacheService cacheService
            )
        {
            _dbContext = dbContext;
            _userContext = userContext;
            _cacheService = cacheService;
        }

        public async Task<IEnumerable<Image>> GetImages(string value, int page, int pageSize)
        {
            var query = _dbContext.Images.AsQueryable();

            if(!string.IsNullOrEmpty(value))
            {
                query = query.Where(image => image.Title.Contains(value) || image.Description.Contains(value));
            }

            query = query
                .Skip(page * pageSize)
                .Take(pageSize);

            return await query.ToListAsync();
        }

        public async Task<List<Comment>> GetComments(int imageId, int page, int pageSize)
        {
            var query = _dbContext.Comments.AsQueryable();

            query = query
                .Where(comment => comment.ImageId == imageId)
                .Skip(page * pageSize)
                .Take(pageSize);

            return await query.ToListAsync();
        }

        public async Task<Image> GetImage(int id)
        {
            return await _dbContext.Images.FindAsync(id);
        }

        public async Task AddImage(int categoryId, string title, string description, string link, Stream stream)
        {
            var userId = _userContext.GetUserId();

            var image = new Image
            {
                Link = link,
                AuthorId = userId,
            };

            await _dbContext.Images.AddAsync(image);
        }

        public string CreateId()
        {
            return Guid.NewGuid().ToString().Replace("-", "").ToLower();
        }
        public async Task<int> AddImage(int? imageId, int categoryId, string title, string description, string fileName, string contentType, int offset, byte[] data)
        {
            Image image = null;
            Stream stream = null;

            if(imageId.HasValue)
            {
                image = _cacheService.GetImage(imageId.Value);

                stream = File.OpenWrite(image.Link);
                stream.Seek(offset, SeekOrigin.Begin);
                stream.Write(data);
                stream.Close();

                return imageId.Value;
            }

            var userId = _userContext.GetUserId();

            var id = string.Empty;
            var extension = contentType;
            var cfileName = string.Empty;

            do
            {
                id = CreateId();
                cfileName = $"/images/{id}.{extension}";
            }
            while (File.Exists(cfileName));

            image = new Image
            {
                AuthorId = userId,
                Link = cfileName,
                Title = title,
                Description = description
            };

            _dbContext.Images.Add(image);

            await _dbContext.SaveChangesAsync();

            stream = File.OpenWrite(cfileName);
            stream.Write(data);
            stream.Close();

            _cacheService.SetImage(image);

            return image.Id;
        }

        public async Task AddImageToCollection(int imageId, int categoryId)
        {
            var userId = _userContext.GetUserId();

            var userImage = new UserImage
            {
                ImageId = imageId,
                CategoryId = categoryId,
                UserId = userId
            };

            var image = _dbContext.Images.Find(imageId);

            image.SavedToCollectionCount++;

            _dbContext.Images.Update(image);

            await _dbContext.SaveChangesAsync();

            await _dbContext.UserImages.AddAsync(userImage);

            await _dbContext.SaveChangesAsync();
        }
            

        public async Task UpdateImage(object data)
        {
            var image = new Image
            {

            };

            await _dbContext.Images.AddAsync(image);
        }

        public async Task<List<Category>> GetCategories(string value, int page, int pageSize)
        {
            var query = _dbContext.Categories.AsQueryable();

            if (!string.IsNullOrEmpty(value))
            {
                query = query.Where(category => category.Name.Contains(value));
            }

            query = query
                .Skip(page * pageSize)
                .Take(pageSize);

            return await query.ToListAsync();
        }

        public Task<List<IGrouping<Category, UserImage>>> GetUserImages()
        {
            var userId = _userContext.GetUserId();

            return _dbContext.UserImages
                .Include(pr => pr.Image)
                .Where(pr => pr.UserId == userId)
                .GroupBy(pr => pr.Category)
                .ToListAsync();
        }

        public async Task RemoveImage(int imageId)
        {
            var image = await _dbContext.Images.FindAsync(imageId);
            _dbContext.Images.Remove(image);
        }

        public async Task AddComment(int imageId, string text)
        {
            var userId = _userContext.GetUserId();

            var comment = new Comment
            {
                ImageId = imageId,
                Text = text,
                AuthorId = userId
            };

            await _dbContext.Comments.AddAsync(comment);
        }

        public async Task RemoveComment(int commentId)
        {
            var comment = await _dbContext.Comments.FindAsync(commentId);
            _dbContext.Comments.Remove(comment);
        }
    }
}
