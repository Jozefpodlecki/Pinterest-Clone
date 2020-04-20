using ImageScraper.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using System;
using System.IO;
using System.Reflection;

namespace ImageScraper
{
    class Program
    {
        private static IConfigurationRoot Configuration;

        static void Main(string[] args)
        {
            var devEnvironmentVariable = Environment.GetEnvironmentVariable("NETCORE_ENVIRONMENT");

            var isDevelopment = string.IsNullOrEmpty(devEnvironmentVariable) || devEnvironmentVariable.ToLower() == "development";

            var configurationBuilder = new ConfigurationBuilder();
            
            var serviceCollection = (IServiceCollection)new ServiceCollection();

            configurationBuilder
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            Configuration = configurationBuilder.Build();

            serviceCollection
                .Configure<Credentials>(Configuration.GetSection(nameof(Credentials)))
                .AddOptions()
                .AddSingleton<FileManager>()
                .AddSingleton<ScraperService>()
                .AddSingleton<HttpService>()
                .AddSingleton<Process>()
                .AddSingleton(RemoteWebDriverFactory)
                .BuildServiceProvider();

            var serviceProvider = serviceCollection.BuildServiceProvider();

            serviceProvider.GetService<>();
        }

        private static RemoteWebDriver RemoteWebDriverFactory(IServiceProvider arg)
        {
            var location = Assembly.GetExecutingAssembly().Location;
            var path = Path.GetDirectoryName(location);
            var driverOption = Configuration["Driver"];

            if(driverOption == nameof(ChromeDriver))
            {
                return new ChromeDriver(path);
            }

            throw new Exception($"Driver not found: {driverOption}");
        }
    }
}
