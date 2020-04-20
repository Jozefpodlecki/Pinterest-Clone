using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace DAL.EntityTypeConfiguration
{
    public class RoleClaimEntityTypeConfiguration : IEntityTypeConfiguration<RoleClaim>
    {
        public void Configure(EntityTypeBuilder<RoleClaim> builder)
        {
            builder
                .ToTable("RoleClaim");

            builder.Property(pr => pr.ClaimType)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(pr => pr.ClaimValue)
                .HasMaxLength(50)
                .IsRequired();
        }
    }
}
