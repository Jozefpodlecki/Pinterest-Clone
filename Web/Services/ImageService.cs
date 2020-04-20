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

        public ImageService(
            AppDBContext dbContext,
            UserContext userContext)
        {
            _dbContext = dbContext;
            _userContext = userContext;
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

        public async Task AddImage(int categoryId, string link, Stream stream)
        {
            var userId = _userContext.GetUserId();

            var image = new Image
            {
                Link = link,
                AuthorId = userId,
            };

            await _dbContext.Images.AddAsync(image);
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
