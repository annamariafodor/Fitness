using System;
using System.ComponentModel.DataAnnotations;

namespace FitnessAPI.Dtos
{
    public record UpdateClientTicketDto
    {
        [Required]
        public string ClientId { get; init; }
        [Required]
        public string TicketTypeId { get; init; }
        [Required]
        public DateTimeOffset BuyingDate { get; init; }
        [Required]
        public int Barcode { get; init; }
        [Required]
        public int EntryCount { get; init; }
        [Required]
        public double BuyingPrice { get; init; }
        [Required]
        public DateTimeOffset AvalabileDate { get; init; }
        [Required]
        public DateTimeOffset FirstUsageDate { get; init; }
        [Required]
        public string RoomId { get; init; }
    }
}