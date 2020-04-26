using AspNet.Security.OAuth.GitHub;
using DAL.Entity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Pinterest_Clone.Services;
using Pinterest_Clone.ViewModels;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Pinterest_Clone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IAuthService _authService;

        public AccountController(
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IAuthService authService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _authService = authService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("user/{id:int?}")]
        public async Task<IActionResult> GetProfile(int? userId = null)
        {
            if (!userId.HasValue)
            {
                userId = int.Parse(_userManager.GetUserId(HttpContext.User));
            }

            var user = await _userManager.FindByIdAsync(userId.Value.ToString());

            if(user == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                DisplayName = user.DisplayName,
                Avatar =  user.Avatar
            });
        }

        [HttpGet]
        [Route("/sign-out")]
        public async Task<IActionResult> SignOut()
        {
            await _signInManager.SignOutAsync();
            return Redirect("/");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var user = await _userManager.FindByNameAsync(model.UsernameOrEmail);
                
            if(user == null)
            {
                user = await _userManager.FindByEmailAsync(model.UsernameOrEmail);
            }

            if (user == null)
            {
                return NotFound();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if(result.Succeeded)
            {
                var token = _authService.GenerateJwt(user);

                return Ok(token);
            }

            if(result.IsLockedOut)
            {
                return Ok(new
                {
                    Error = "User is locked out"
                });
            }

            return Ok(new
            {
                Error = "User is not allowed to sign in"
            });
        }


        [HttpGet]
        [Route("/github")]
        public async Task<IActionResult> GithubLogin(string returnUrl)
        {
            if (!string.IsNullOrEmpty(returnUrl))
            {
                return Ok();
            }

            var authenticationProperties = new AuthenticationProperties()
            {
                Items =
                {
                    new KeyValuePair<string, string>("LoginProvider", "GitHub")
                },
                RedirectUri = "/github-callback"
            };

            return Challenge(authenticationProperties, "GitHub");
        }

        [HttpGet]
        [Route("/github-callback")]
        public async Task<IActionResult> GithubCallback()
        {
            var externalLoginInfo = await _signInManager.GetExternalLoginInfoAsync();

            if(externalLoginInfo == null)
            {
                return Ok();
            }

            var principal = externalLoginInfo.Principal;
            var username = principal.FindFirst(ClaimTypes.Name).Value;
            var displayName = principal.FindFirst("urn:github:name").Value;
            var avatar = principal.FindFirst("urn:github:avatar").Value;
            var email = principal.FindFirst(ClaimTypes.Email).Value;
            var user = await _userManager.FindByEmailAsync(email);
            string token = null;

            if(user != null)
            {
                token = _authService.GenerateJwt(user);
                return Redirect($"/?token=${token}");
            }

            user = new User
            {
                UserName = username,
                DisplayName = displayName,
                Email = email,
                Avatar = avatar
            };

            var result = await _userManager.CreateAsync(user);

            if(!result.Succeeded)
            {
                return Redirect($"/error");
            }

            var result1 = await _userManager.AddLoginAsync(user, externalLoginInfo);

            if(!result1.Succeeded)
            {
                return Redirect("/error");
            }

            token = _authService.GenerateJwt(user);

            return Redirect($"/?token=${token}");
        }
    }
}
