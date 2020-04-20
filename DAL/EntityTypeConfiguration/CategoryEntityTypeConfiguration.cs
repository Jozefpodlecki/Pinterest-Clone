using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.EntityTypeConfiguration
{
    public class CategoryEntityTypeConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.Property(pr => pr.Name)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(pr => pr.Link)
                .HasMaxLength(100)
                .IsRequired();
        }
    }
}
