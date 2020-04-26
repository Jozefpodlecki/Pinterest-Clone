using DAL.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace DAL.EntityTypeConfiguration
{
    public class UserTokenEntityTypeConfiguration : IEntityTypeConfiguration<UserToken>
    {
        public void Configure(EntityTypeBuilder<UserToken> builder)
        {
            builder
                .ToTable("UserToken");

            builder.Property(pr => pr.Name)
                .HasMaxLength(255)
                .IsRequired();

            builder.Property(pr => pr.LoginProvider)
               .HasMaxLength(255)
               .IsRequired();

            builder.Property(pr => pr.Value)
               .HasMaxLength(255)
               .IsRequired();
        }
    }
}
