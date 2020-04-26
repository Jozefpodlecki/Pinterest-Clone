using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.EntityTypeConfiguration
{
    public class UserClaimEntityTypeConfiguration : IEntityTypeConfiguration<UserClaim>
    {
        public void Configure(EntityTypeBuilder<UserClaim> builder)
        {
            builder
                .ToTable("UserClaim");

            builder.Property(pr => pr.ClaimType)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(pr => pr.ClaimValue)
                .HasMaxLength(50)
                .IsRequired();
        }
    }
}
