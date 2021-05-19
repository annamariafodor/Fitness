using System;

namespace FitnessAPI.Entities
{
    public record Client
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public int Telephone { get; init; }
        public string Email { get; init; }
        public bool IsDeleted { get; init; }
        public string Photo { get; init; }
        public DateTimeOffset InsertedDate { get; init; }
        public int CNP { get; init; }
        public string Adress { get; init; }
        public int Barcode { get; init; }
        public string Comment { get; init; }

        public ClientTicket ClientTicket { get; init; }
    }

}