using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Pinterest_Clone.Services
{
    public class UserContext : IUserContext
    {
        private readonly HttpContext _httpContext;

        public UserContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContext = httpContextAccessor.HttpContext;
        }

        public int GetUserId()
        {
            var claim = _httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            return int.Parse(claim.Value);
        }
    }
}
