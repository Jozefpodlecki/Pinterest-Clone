using DAL.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Pinterest_Clone.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;
        private readonly Encoding _encoding;
        private readonly TimeService _timeService;

        public AuthService(
            IConfiguration configuration,
            Encoding encoding,
            TimeService timeService)
        {
            _configuration = configuration;
            _encoding = encoding;
            _timeService = timeService;
        }

        public string GenerateJwt(User user)
        {
            var key = _configuration["Jwt:Key"];
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var securityKey = new SymmetricSecurityKey(keyBytes);
            var securityAlgorithm = SecurityAlgorithms.HmacSha256;
            var credentials = new SigningCredentials(securityKey, securityAlgorithm);

            var claims = new []
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
                //new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
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
