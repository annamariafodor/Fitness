using System.ComponentModel.DataAnnotations;

namespace FitnessAPI.Dtos
{
    public record CreateEntryDto
    {
        [Required]
        public string ClientId { get; init; }
        [Required]
        public string TicketId { get; init; }
        [Required]
        public string InsertedById { get; init; }
        [Required]
        public int Barcode { get; init; }
        [Required]
        public int RoomId { get; init; }
    }
}