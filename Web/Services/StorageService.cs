using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Pinterest_Clone.Services
{
    public class StorageService
    {
        private readonly IFileProvider _fileProvider;

        public StorageService(IFileProvider fileProvider)
        {
            _fileProvider = fileProvider;
        }

     
    }
}
