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

        public static EntryDto EntryMapToDto(this Entry entry)
        {
            return new EntryDto
            {
                Id = entry.Id,
                ClientId = entry.ClientId,
                TicketId = entry.TicketId,
                Date = entry.Date,
                InsertedById = entry.InsertedById,
                Barcode = entry.Barcode,
                RoomId = entry.RoomId
            };
        }

        public static ClientTicketDto ClientTicketMapToDto(this ClientTicket clientTicket)
        {
            return new ClientTicketDto
            {
                Id = clientTicket.Id,
                ClientId = clientTicket.ClientId,
                TicketTypeId = clientTicket.TicketTypeId,
                BuyingDate = clientTicket.BuyingDate,
                Barcode = clientTicket.Barcode,
                EntryCount = clientTicket.EntryCount,
                BuyingPrice = clientTicket.BuyingPrice,
                AvalabileDate = clientTicket.AvalabileDate,
                FirstUsageDate = clientTicket.FirstUsageDate,
                RoomId = clientTicket.RoomId
            };
        }

        public static RoomDto RoomMapToDto(this Room room)
        {
            return new RoomDto
            {
                Id = room.Id,
                Name = room.Name,
                IsDeleted = room.IsDeleted
            };
        }

        public static UserDto UserMapToDto(this User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Password = user.Password,
                Role = user.Role
            };
        }
    }
}