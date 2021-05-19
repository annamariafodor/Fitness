using System;

namespace FitnessAPI.Entities
{
    public record Entry
    {
        public Guid Id { get; init; }
        public string ClientId { get; init; }
        public string TicketId { get; init; }
        public DateTimeOffset Date { get; init; }
        public string InsertedById { get; init; }
        public int Barcode { get; init; }
        public string RoomId { get; init; }
    }
}