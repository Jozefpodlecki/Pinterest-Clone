using System;
using System.IO;
using System.Threading.Tasks;

namespace ImageScraper.Services
{
    public class FileManager
    {
        public bool DirectoryExists(string name)
        {
            return Directory.Exists(name);
        }

        public void CreateDirectory(string name)
        {
            Directory.CreateDirectory(name);
        }

        public async Task SaveFile(string fileName, Stream inputStream)
        {
            var outputStream = File.OpenWrite(fileName);
            await inputStream.CopyToAsync(outputStream);
            outputStream.Close();
        }

        public Task SaveFile(string fileName, string json)
        {
            return File.WriteAllTextAsync(fileName, json);
        }

        public string Combine(params string[] paths)
        {
            return Path.Combine(paths);
        }
    }
}
