using System;

namespace FitnessAPI.Dtos
{
    public record RoomDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public bool IsDeleted { get; init; }
    }
}