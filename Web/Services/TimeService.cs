using System;

namespace Pinterest_Clone.Services
{
    public class TimeService : ITimeService
    {
        public DateTime Now => DateTime.Now;
        public DateTime UtcNow => DateTime.UtcNow;
    }
}
