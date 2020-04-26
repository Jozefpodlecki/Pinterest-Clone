using DAL.Entity;

namespace Pinterest_Clone.Services
{
    public interface ICacheService
    {
        void SetImage(Image image);
        Image GetImage(int imageId);
    }
}
