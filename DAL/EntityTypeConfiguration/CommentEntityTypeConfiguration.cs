using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.EntityTypeConfiguration
{
    public class CommentEntityTypeConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.Property(pr => pr.Text)
                .HasMaxLength(255)
                .IsRequired();

            builder
                 .HasOne(pr => pr.Image)
                 .WithMany(pr => pr.Comments)
                 .HasForeignKey(pa => pa.ImageId)
                 .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
