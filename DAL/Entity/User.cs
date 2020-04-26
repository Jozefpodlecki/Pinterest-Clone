using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class User : IdentityUser<int>
    {
        public string Background { get; set; }

        public string DisplayName { get; set; }

        public string Avatar { get; set; }        

        public ICollection<UserImage> UserImages { get; set; }
    }
}
