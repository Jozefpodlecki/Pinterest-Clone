using Moq;
using Pinterest_Clone.Controllers;
using Pinterest_Clone.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Web.Tests
{
    public class ImageControllerTests
    {
        public ImageControllerTests()
        {
            var imageService = new Mock<IImageService>();
            new ImageController(
                imageService.Object
            );

        }

    }
}
