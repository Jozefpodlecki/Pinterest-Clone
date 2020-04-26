using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.EntityTypeConfiguration
{
    public class UserLoginEntityTypeConfiguration : IEntityTypeConfiguration<UserLogin>
    {
        public void Configure(EntityTypeBuilder<UserLogin> builder)
        {
            builder
                .ToTable("UserLogin");

            builder.Property(pr => pr.ProviderKey)
                .HasMaxLength(255)
                .IsRequired();

            builder.Property(pr => pr.LoginProvider)
                .HasMaxLength(255)
                .IsRequired();

            builder.Property(pr => pr.ProviderDisplayName)
                .HasMaxLength(255)
                .IsRequired();
        }
    }
}
