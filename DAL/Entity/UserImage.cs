namespace DAL.Entity
{
    public class UserImage
    {
        public int Id { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public Image Image { get; set; }

        public int ImageId { get; set; }

        public Category Category { get; set; }

        public int CategoryId { get; set; }
    }
}
