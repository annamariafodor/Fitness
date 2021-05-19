using System;

namespace FitnessAPI.Dtos{
    public record TicketTypeDto{
        public Guid Id { get; init; }
        public string Name { get; init; }
        public double Price { get; init; }
        public int DayLimit { get; init; }
        public int EntryLimit { get; init; }
        public bool IsDeleted { get; init; }
        public int RoomId { get; init; }
        public String HoursFrom { get; init; }
        public String HoursTo { get; init; }
        public int DailyUsages { get; init; }
    }
}