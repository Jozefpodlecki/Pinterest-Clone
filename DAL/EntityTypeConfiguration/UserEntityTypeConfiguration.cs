using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.EntityTypeConfiguration
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .ToTable("User");

            builder.Property(pr => pr.UserName)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(pr => pr.DisplayName)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(pr => pr.Avatar)
                .HasMaxLength(255);

            builder.Property(pr => pr.PasswordHash)
                .HasMaxLength(512);

            builder.Property(pr => pr.SecurityStamp)
                .HasMaxLength(512);

            builder.Property(pr => pr.ConcurrencyStamp)
                .HasMaxLength(512);

            builder.Property(pr => pr.PhoneNumber)
                .HasMaxLength(512);

            builder.Property(pr => pr.Email)
                .HasMaxLength(50)
                .IsRequired();
        }
    }
}
