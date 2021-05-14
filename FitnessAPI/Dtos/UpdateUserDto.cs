using System;

namespace FitnessAPI.Dtos
{
    public record UpdateUserDto
    {
        public string Email { get; init; }
        public string Password { get; init; }
    }
}