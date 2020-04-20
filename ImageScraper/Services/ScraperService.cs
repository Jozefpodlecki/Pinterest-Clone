using ImageScraper.Models;
using Microsoft.Extensions.Options;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ImageScraper.Services
{
    public class ScraperService
    {
        private readonly IWebDriver _driver;
        private readonly IJavaScriptExecutor _javascriptExecutor;
        private readonly Credentials _credentials;
        private readonly MainOptions _options;
        private readonly TimeSpan _defaultTimeSpan;

        public ScraperService(
            RemoteWebDriver remoteWebDriver,
            IOptions<Credentials> credentials,
            IOptions<MainOptions> options
            )
        {
            _credentials = credentials.Value ?? throw new ArgumentNullException(nameof(IOptions<Credentials>));
            _driver = remoteWebDriver;
            _options = options.Value;
            _driver.Url = _options.Url;
            
            if (_options.MaximizeWindow)
            {
                _driver.Manage().Window.Maximize();
            }

            _defaultTimeSpan = TimeSpan.FromSeconds(_options.InteractionTimeout);

            _javascriptExecutor = remoteWebDriver;
        }

        private void ScrollDown(int times)
        {
            for (int i = 1; i <= times; i++)
            {
                _javascriptExecutor.ExecuteScript("window.scrollBy(0, arguments[0] * window.innerHeight)", i);
                SetTimeout(TimeSpan.FromSeconds(_options.ScrollTimeout));
            }
        }

        public void Close()
        {
            _driver.Quit();
        }

        public void ClickSignInButton()
        {
            var signInButton = _driver.FindElement(By.XPath(@"//*[contains(text(), 'Log in')]"));

            signInButton.Click();
        }

        public void ClickGoogleSignInButton()
        {
            var googleSignInButton = _driver.FindElement(By.XPath(@"//*[contains(text(), 'Continue with Google')]"));

            googleSignInButton.Click();
        }

        public void ClickGoogleNextButton()
        {
            var nextButton = _driver.FindElement(By.XPath(@"//*[contains(text(), 'Next')]/parent::span/preceding-sibling::div"));
            _javascriptExecutor.ExecuteScript("arguments[0].click();", nextButton);
        }

        public void SwitchToPopupWindow()
        {
            var windowHandles = _driver.WindowHandles;
            _driver.SwitchTo().Window(windowHandles.Last());
        }

        public void SwitchToMainWindow()
        {
            var windowHandles = _driver.WindowHandles;
            _driver.SwitchTo().Window(windowHandles.First());
        }

        public void TypeInEmail()
        {
            var emailInput = _driver.FindElement(By.XPath(@"//*[@type='email']"));
            emailInput.SendKeys(_credentials.Email);
        }

        public void TypeInPassword()
        {
            var passwordInput = _driver.FindElement(By.XPath(@"//*[@type='password']"));
            passwordInput.SendKeys(_credentials.Password);
        }

        public void SetTimeout(TimeSpan value)
        {
            Thread.Sleep((int)value.TotalMilliseconds);
        }

        public async Task<List<Image>> GetImages()
        {
            ClickSignInButton();
            ClickGoogleSignInButton();

            SetTimeout(TimeSpan.FromSeconds(_options.SwitchWindowTimeout));
            SwitchToPopupWindow();

            TypeInEmail();
            ClickGoogleNextButton();

            SetTimeout(_defaultTimeSpan);

            TypeInPassword();
            ClickGoogleNextButton();

            SetTimeout(TimeSpan.FromSeconds(_options.SwitchWindowTimeout));
            SwitchToMainWindow();

            ScrollDown(10);

            SetTimeout(TimeSpan.FromSeconds(4));

            var list = _driver
                .FindElements(By.XPath(@"//img"))
                .Select(image =>
                {
                    var alt = image.GetAttribute("alt");
                    var src = image.GetAttribute("src");
                    var uri = new Uri(src);
                    var fileName = Path.GetFileName(uri.LocalPath);

                    return new Image
                    {
                        Title = alt,
                        Link = src,
                        FileName = fileName
                    };
                })
                .ToList();

            return list;
        }
    }
}
