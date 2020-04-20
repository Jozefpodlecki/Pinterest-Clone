using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.EntityTypeConfiguration
{
    public class ImageEntityTypeConfiguration : IEntityTypeConfiguration<Image>
    {
        public void Configure(EntityTypeBuilder<Image> builder)
        {
            builder.Property(pr => pr.Title)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(pr => pr.Description)
                .HasMaxLength(255);

            builder.Property(pr => pr.Link)
               .HasMaxLength(255)
               .IsRequired();

            builder
               .HasMany(pr => pr.Comments)
               .WithOne(pr => pr.Image);
        }
    }
}
