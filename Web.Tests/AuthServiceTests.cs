using DAL.Entity;
using Microsoft.Extensions.Configuration;
using Moq;
using Pinterest_Clone.Services;
using System;
using System.Text;
using Xunit;

namespace Web.Tests
{
    public class AuthServiceTests
    {
        private readonly Mock<IConfiguration> _configuration;
        private readonly Encoding _encoding;
        private readonly Mock<ITimeService> _timeService;
        private readonly IAuthService _authService;
        public AuthServiceTests()
        {
            _configuration = new Mock<IConfiguration>();
            _encoding = Encoding.UTF8;
            _timeService = new Mock<ITimeService>();

            _authService = new AuthService(
                _configuration.Object,
                _encoding,
                _timeService.Object
            );
        }

        [Fact]
        public void It_Should_GenerateToken()
        {
            _configuration
                .SetupGet(pr => pr[It.IsAny<string>()])
                .Returns("test");

            var user = new User()
            {
                Id = 1,
                DisplayName = "test",
                Email = "test@test.com"
            };

            var token = _authService.GenerateJwt(user);

            Assert.NotNull(token);
        }
    }
}
