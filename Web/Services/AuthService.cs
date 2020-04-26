using DAL.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Pinterest_Clone.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly Encoding _encoding;
        private readonly ITimeService _timeService;

        public AuthService(
            IConfiguration configuration,
            Encoding encoding,
            ITimeService timeService)
        {
            _configuration = configuration;
            _encoding = encoding;
            _timeService = timeService;
        }

        public string GenerateJwt(User user)
        {
            var key = _configuration["Jwt:Key"];
            var keyBytes = _encoding.GetBytes(key);
            var securityKey = new SymmetricSecurityKey(keyBytes);
            var securityAlgorithm = SecurityAlgorithms.HmacSha256;
            var credentials = new SigningCredentials(securityKey, securityAlgorithm);

            var claims = new []
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var currentDate = _timeService.Now;
            var expires = currentDate.AddMinutes(30);
            var notBefore = currentDate;

            var jwtHeader = new JwtHeader(credentials);
            var jwtPayload = new JwtPayload(issuer, audience, claims, notBefore, expires);

            var token = new JwtSecurityToken(
                jwtHeader,
                jwtPayload
            );

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return encodedToken;
        }
    }
}
