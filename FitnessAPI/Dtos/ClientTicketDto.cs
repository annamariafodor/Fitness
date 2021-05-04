using System;

namespace FitnessAPI.Dtos
{
    public record ClientTicketDto
    {
        public Guid Id { get; init; }
        public string ClientId { get; init; }
        public string TicketTypeId { get; init; }
        public DateTimeOffset BuyingDate { get; init; }
        public int Barcode { get; init; }
        public int EntryCount { get; init; }
        public double BuyingPrice { get; init; }
        public DateTimeOffset AvalabileDate { get; init; }
        public DateTimeOffset FirstUsageDate { get; init; }
        public string RoomId { get; init; }
    }
}