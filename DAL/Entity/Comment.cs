using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public User Author { get; set; }
        public int AuthorId { get; set; }
        public Image Image { get; set; }
        public int ImageId { get; set; }
    }
}
