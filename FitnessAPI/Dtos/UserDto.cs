using System;

namespace FitnessAPI.Dtos
{
    public record UserDto
    {
        public Guid Id { get; init; }
        public string Email { get; init; }
        public string Password { get; init; }
        public string Role { get; init; }
    }
}