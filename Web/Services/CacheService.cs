using DAL.Entity;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pinterest_Clone.Services
{
    public class CacheService
    {
        private IMemoryCache _memoryCache;

        public CacheService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public void SetImage(Image image)
        {
            _memoryCache.Set(image.Id, image);
        }

        public Image GetImage(int imageId)
        {
            return _memoryCache.Get<Image>(imageId);
        }
    }
}
