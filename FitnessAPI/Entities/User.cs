using System;

namespace FitnessAPI.Entities
{
    public record User
    {
        public Guid Id { get; init; }
        public string Email { get; init; }
        public string Password { get; init; }
        public string Role { get; init; }
    }
}