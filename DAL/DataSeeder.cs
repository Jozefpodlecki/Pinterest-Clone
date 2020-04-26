using DAL.Entity;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DataSeeder
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly AppDBContext _dbContext;
        private const string loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan nisl sit amet risus imperdiet sagittis. Sed consectetur dolor quis molestie imperdiet. Maecenas et nulla aliquet, tempus mauris quis, tempus erat. Cras ut mauris libero. Suspendisse et arcu ut sem vestibulum porttitor sed id nulla. Aenean eu sapien et orci feugiat vestibulum at in nibh. Vestibulum ante tellus, aliquam ac ante ac, laoreet feugiat ligula.";

        public DataSeeder(
            UserManager<User> userManager,
            RoleManager<Role> roleManager,
            AppDBContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;
        }

        public async Task<bool> IsInitialized()
        {
            var user = await _userManager.FindByNameAsync("admin");
            return user != null;
        }

        public async Task InitializeAsync()
        {
            if(await IsInitialized())
            {
                return;
            }

            var user = new User
            {
                UserName = "admin",
                DisplayName = "Admin",
                Email = "admin@admin.com",
                Avatar = "/images/admin.jpg"
            };
            
            var password = "admin";

            var result = await _userManager.CreateAsync(user, password);

            await LoadCategories();
            await LoadImages();
        }

        public class Image
        {
            public string Title { get; set; }
            public string Link { get; set; }
            public string FileName { get; set; }
        }

        public async Task<List<Image>> GetImageMetadataFromFile(string filePath)
        {
            var json = await File.ReadAllTextAsync(filePath);
            return JsonConvert.DeserializeObject<List<Image>>(json);
        }

        public async Task<List<Category>> GetCategoriesMetadataFromFile(string filePath)
        {
            var json = await File.ReadAllTextAsync(filePath);
            return JsonConvert.DeserializeObject<List<Category>>(json);
        }

        public async Task LoadCategories()
        {
            var categories = await GetCategoriesMetadataFromFile("categories.json");
            
            await _dbContext.Categories.AddRangeAsync(categories);

            await _dbContext.SaveChangesAsync();
        }

        public async Task LoadImages()
        {
            var imagesPath = @"C:\Users\Józef Podlecki\Documents\Pinterest-Clone\ImageScraper\bin\Debug\netcoreapp3.1\images";
            var metadataFileName = "metadata.json";
            var metaData = await GetImageMetadataFromFile(Path.Combine(imagesPath, metadataFileName));

            foreach (var image in metaData)
            {
                var imageEntity = new DAL.Entity.Image
                {
                    AuthorId = 1,
                    Title = image.Title.Substring(0, image.Title.Length > 50 ? 50 : image.Title.Length),
                    Description = loremIpsum.Substring(0, 250),
                    Link = $"/images/{image.FileName}",
                    SavedToCollectionCount = 0
                };

                _dbContext.Images.Add(imageEntity);
            }

            await _dbContext.SaveChangesAsync();
        }
    }
}
