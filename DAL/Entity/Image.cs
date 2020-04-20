using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entity
{
    public class Image
    {
        public int Id { get; set; }

        public string Link { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public User Author { get; set; }

        public int AuthorId { get; set; }

        public int SavedToCollectionCount { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
