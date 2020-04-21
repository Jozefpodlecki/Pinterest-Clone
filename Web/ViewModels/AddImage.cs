using Microsoft.AspNetCore.Http;

namespace Pinterest_Clone.ViewModels
{
    public class AddImage
    {
        public IFormFile File { get; set; }
        public int Offset { get; set; }
        public byte[] Data { get; set; }
        public int CategoryId { get; set; }
        public int? ImageId { get; set; }
    }
}
