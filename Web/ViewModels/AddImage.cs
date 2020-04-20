using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pinterest_Clone.ViewModels
{
    public class AddImage
    {
        public IFormFile File { get; set; }

        public int CategoryId { get; set; }
    }
}
