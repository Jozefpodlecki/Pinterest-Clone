using DAL;
using Microsoft.EntityFrameworkCore;
using Moq;
using Pinterest_Clone.Services;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Web.Tests
{
    public class ImageServiceTests
    {
        private readonly AppDBContext _dbContext;
        private readonly Mock<IUserContext> _userContext;
        private readonly Mock<ICacheService> _cacheService;
        private readonly ImageService _imageService;

        public ImageServiceTests()
        {
            var options = new DbContextOptionsBuilder<AppDBContext>()
               .UseInMemoryDatabase(databaseName: nameof(AppDBContext))
               .Options;

            _dbContext = new AppDBContext(options);
            _userContext = new Mock<IUserContext>();
            _cacheService = new Mock<ICacheService>();

            _imageService = new ImageService(
                _dbContext,
                _userContext.Object,
                _cacheService.Object
            );
        }

        [Fact]
        public async Task It_Should_AddComment()
        {
            await _imageService.AddComment(1, "test");
        }

        [Fact]
        public async Task It_Should_RemoveComment()
        {
            await _imageService.RemoveComment(1);
        }

        [Fact]
        public void It_Should_ReportComment()
        {
            //await _imageService.ReportComment(1);
        }

        //[Fact]
        //public void It_Should_UpdateProfile()
        //{
        //    await _imageService.UpdateProfile(1);
        //}

        [Fact]
        public void It_Should_GetProfile()
        {

        }

        [Fact]
        public async Task It_Should_Add_ImageToCollection()
        {
            await _imageService.AddImageToCollection(1, 1);
        }

        [Fact]
        public async Task It_Should_Add_Image()
        {
            var imageId = 1;
            var categoryId = 1;
            var title = "title";
            var description = "description";
            var fileName = "image.jpg";
            var contentType = "";
            var offset = 0;
            var data = new byte[] { 1, 2, 3 };

            await _imageService.AddImage(
                imageId,
                categoryId,
                title,
                description,
                fileName,
                contentType,
                offset,
                data
            );
        }

        [Fact]
        public async Task It_Should_Get_Image()
        {
            await _imageService.GetImage(1);
        }
    }
}
