using System;

namespace Pinterest_Clone.Services
{
    public interface ITimeService
    {
        DateTime Now { get; }
        DateTime UtcNow { get; }
    }
}
