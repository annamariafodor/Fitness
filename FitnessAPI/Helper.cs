using FitnessAPI.Dtos;
using FitnessAPI.Entities;

namespace FitnessAPI
{
    public static class Helper
    {
        public static ClientDto MapToDto(this Client client)
        {
            return new ClientDto
            {
                Id = client.Id,
                Name = client.Name,
                Telephone = client.Telephone,
                Email = client.Email,
                IsDeleted = client.IsDeleted,
                Photo = client.Photo,
                InsertedDate = client.InsertedDate,
                CNP = client.CNP,
                Adress = client.Adress,
                Barcode = client.Barcode,
                Comment = client.Comment
            };
        }

        public static TicketTypeDto TicketTypeMapToDto(this TicketType ticket)
        {
            return new TicketTypeDto
            {
                Id = ticket.Id,
                Name = ticket.Name,
                Price = ticket.Price,
                DayLimit = ticket.DayLimit,
                EntryLimit = ticket.EntryLimit,
                IsDeleted = ticket.IsDeleted,
                RoomId = ticket.RoomId,
                HoursFrom = ticket.HoursFrom,
                HoursTo = ticket.HoursTo,
                DailyUsages = ticket.DailyUsages
            };
        }
    }
}