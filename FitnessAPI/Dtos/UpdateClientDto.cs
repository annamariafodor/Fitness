using System.ComponentModel.DataAnnotations;

namespace FitnessAPI.Dtos{
    public record UpdateClientDto{
        [Required]
        public string Name { get; init; }
        [Required]
        public int Telephone { get; init; }
        [Required]
        public string Email { get; init; }
        [Required]
        public bool IsDeleted { get; init; }
        public string Photo { get; init; }
        [Required]
        public int CNP { get; init; }
        [Required]
        public string Adress { get; init; }
        public int Barcode { get; init; }
        [Required]
        public string Comment { get; init; }
    }
}