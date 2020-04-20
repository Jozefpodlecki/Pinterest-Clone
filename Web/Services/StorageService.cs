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

        public async Task<Stream> GetFile(string fileName)
        {
            var fileInfo = _fileProvider.GetFileInfo(fileName);

            if(fileInfo.Exists)
            {
                return null;
            }

            return fileInfo.CreateReadStream();
        }

        public async Task UploadFile(Stream stream, string fileName)
        {
            var fileStream = File.OpenWrite(fileName);
            await stream.CopyToAsync(fileStream);
            fileStream.Close();
        }
    }
}
