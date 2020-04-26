using Microsoft.AspNetCore.Http;

namespace Pinterest_Clone.ViewModels
{
    public class AddImage
    {
        public int Offset { get; set; }
        public byte[] Data { get; set; }
        public int CategoryId { get; set; }
        public int? ImageId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
    }
}
