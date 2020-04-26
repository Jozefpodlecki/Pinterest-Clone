using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Pinterest_Clone.Services;
using Pinterest_Clone.ViewModels;

namespace Pinterest_Clone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(
            IImageService imageService)
        {
            _imageService = imageService;
        }


        [HttpGet("{imageId:int}/comment")]
        public async Task<IActionResult> GetComments(CommentSearchCriteria criteria)
        {
            await _imageService.GetComments(criteria.ImageId, criteria.Page, criteria.PageSize);

            return Ok();
        }

        [HttpPost("comment")]
        public async Task<IActionResult> AddComment([FromBody]AddComment comment)
        {
            await _imageService.AddComment(comment.ImageId, comment.Text);

            return Ok();
        }

        [HttpPost("collection")]
        public async Task<IActionResult> AddImageToCollection([FromBody]AddImageToCollection image)
        {
            await _imageService.AddImageToCollection(image.CategoryId, image.ImageId);

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddImage([FromBody]AddImage model)
        {
            var imageId = await _imageService.AddImage(
                model.ImageId,
                model.CategoryId,
                model.Title,
                model.Description,
                model.FileName,
                model.ContentType,
                model.Offset,
                model.Data
            );

            return Ok(new
            {
                ImageId = imageId
            });
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetImages([FromBody]ImageSearchCriteria criteria)
        {
            var images = await _imageService.GetImages(criteria.Value, criteria.Page, criteria.PageSize);

            return Ok(images);
        }

        [HttpPost("category")]
        public async Task<IActionResult> GetCategories([FromBody]ImageSearchCriteria criteria)
        {
            var categories = await _imageService.GetCategories(criteria.Value, criteria.Page, criteria.PageSize);

            return Ok(categories);
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserImages()
        {
            var images = await _imageService.GetUserImages();

            return Ok(images);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var result = await _imageService.GetImage(id);

            return Ok(result);
        }

        //[HttpGet("image")]
        //public async Task<IActionResult> GetImage(string fileName)
        //{
        //    var stream = await _storageService.GetFile(fileName);

        //    if(stream == null)
        //    {
        //        return NotFound();
        //    }

        //    var contentType = "";
        //    var provider = new FileExtensionContentTypeProvider();
            
        //    if (!provider.TryGetContentType(fileName, out contentType))
        //    {
        //        contentType = "application/octet-stream";
        //    }

        //    return File(stream, contentType);
        //}
    }
}