using DAL.Entity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Moq;
using Pinterest_Clone;
using Pinterest_Clone.Controllers;
using Pinterest_Clone.Services;
using Pinterest_Clone.ViewModels;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Web.Tests
{
    public class AccountControllerTests
    {
        private readonly Mock<FakeSignInManager> _signInManager;
        private readonly Mock<FakeUserManager> _userManager;
        private readonly Mock<IAuthService> _authService;
        private readonly AccountController _accountController;

        public AccountControllerTests()
        {
            _signInManager = new Mock<FakeSignInManager>();
            _userManager = new Mock<FakeUserManager>();
            _authService = new Mock<IAuthService>();

            _accountController = new AccountController(
                _signInManager.Object,
                _userManager.Object,
                _authService.Object
            );
        }

        [Fact]
        public async Task SignIn_ReturnsBadRequest_GivenInvalidModel()
        {
            var configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string>()
                {
                    { "Jwt:Key", "Test" }
                })
                .Build();

            var webHostBuilder = new WebHostBuilder()
                .UseConfiguration(configuration)
                .UseEnvironment("Test")
                .UseStartup<Startup>();
            var server = new TestServer(webHostBuilder);
            var client = server.CreateClient();

            var response = await client.PostAsJsonAsync("api/account/login", new {});
        }

        [Fact]
        public async Task SignIn_ReturnsToken()
        {

        }

        [Fact]
        public async Task SignInWithGithubCallback_CreatesNewUser()
        {

        }
    }
}
