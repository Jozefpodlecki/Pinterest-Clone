using DAL.Entity;

namespace Pinterest_Clone.Services
{
    public interface IAuthService
    {
        string GenerateJwt(User user);
    }
}
