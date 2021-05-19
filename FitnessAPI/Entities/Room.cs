using System;

namespace FitnessAPI.Entities
{
    public record Room
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public bool IsDeleted { get; init; }
    }
}