using System;

namespace FitnessAPI.Dtos
{
    public record CreateUserDto
    {
        public string Email { get; init; }
        public string Password { get; init; }
    }
}