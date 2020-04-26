using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AspNet.Security.OAuth.GitHub;
using DAL;
using DAL.Entity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Pinterest_Clone.Configuration;
using Pinterest_Clone.Services;

namespace Pinterest_Clone
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IHostEnvironment HostingEnvironment { get; }

        public Startup(IConfiguration configuration, IHostEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            HostingEnvironment = hostingEnvironment;
        }

        private static Func<OAuthCreatingTicketContext, Task> OnCreatingGitHubTicket()
        {
            return async context =>
            {
                await Task.FromResult(true);
            };
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllersWithViews();
            
            var connectionString = Configuration.GetConnectionString(Constants.DefaultConnection);
            
            if(HostingEnvironment.EnvironmentName == "Test")
            {
                services.AddEntityFrameworkSqlServer()
                    .AddDbContext<AppDBContext>((options) =>
                        options.UseInMemoryDatabase(databaseName: nameof(AppDBContext))
                    );
            }
            else
            {
                services.AddEntityFrameworkSqlServer()
                    .AddDbContext<AppDBContext>((options) =>
                        options.UseSqlServer(connectionString)
                    );
            }
            
            services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequireLowercase = false;
                options.Password.RequiredLength = 0;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<AppDBContext>()
                .AddDefaultTokenProviders();

            services.Configure<JwtConfiguration>(Configuration.GetSection(Constants.JwtConfiguration));
            services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<ImageService, ImageService>();
            services.AddTransient<StorageService>();
            services.AddTransient<ITimeService, TimeService>();
            services.AddTransient<IUserContext, UserContext>();
            services.AddSingleton<ICacheService, CacheService>();
            services.AddTransient<DataSeeder>();
            
            services.AddTransient<IFileProvider>((service) =>
            {
                var hostingEnviroment = service.GetService(typeof(IWebHostEnvironment));
                var root = Directory.GetCurrentDirectory();
                return new PhysicalFileProvider(root);
            });
            
            services.AddSingleton(Encoding.UTF8);

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "dist";
            });

            var key = Configuration["Jwt:Key"];
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var securityKey = new SymmetricSecurityKey(keyBytes);
            var jwtAppSettingOptions = Configuration.GetSection("Jwt");

            _ = services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {

                    var tokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = jwtAppSettingOptions[nameof(JwtConfiguration.Issuer)],

                        ValidateAudience = true,
                        ValidAudience = jwtAppSettingOptions[nameof(JwtConfiguration.Audience)],

                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = securityKey,

                        RequireExpirationTime = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };

                    options.TokenValidationParameters = tokenValidationParameters;
                })
                .AddGitHub(options =>
                {
                    options.ClientId = Configuration["GitHub:ClientId"];
                    options.ClientSecret = Configuration["GitHub:ClientSecret"];
                    options.Scope.Add("user:email");
                    //options.Scope.Add("urn:github:avatar");
                    options.Scope.Add("user:avatar");
                    options.Scope.Add("urn:github:avatar");
                    options.Scope.Add("github:avatar");

                    options.Events = new OAuthEvents
                    {
                        
                        OnCreatingTicket = OnCreatingGitHubTicket()
                    };
                });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });

            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<AppDBContext>();
                context.Database.EnsureCreated();

                var dataSeeder = serviceScope.ServiceProvider.GetRequiredService<DataSeeder>();
                dataSeeder.InitializeAsync().GetAwaiter().GetResult();
            }

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "src";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(120);
                }
            });
        }
    }
}
