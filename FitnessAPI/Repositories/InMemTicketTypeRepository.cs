
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public class InMemTicketTypeRepository : IInMemTicketTypeRepository
    {
        private readonly List<TicketType> tickets = new()
        {
            new TicketType
            {
                Id = Guid.NewGuid(),
                Name = "Basic ticket",
                Price = 50,
                DayLimit = 30,
                EntryLimit = 30,
                IsDeleted = false,
                RoomId = 1,
                HoursFrom = "9:00",
                HoursTo = "21:00",
                DailyUsages = 1
            },
            new TicketType
            {
                Id = Guid.NewGuid(),
                Name = "Pro ticket",
                Price = 80,
                DayLimit = 30,
                EntryLimit = 60,
                IsDeleted = false,
                RoomId = 2,
                HoursFrom = "7:00",
                HoursTo = "20:00",
                DailyUsages = 1
            },
            new TicketType
            {
                Id = Guid.NewGuid(),
                Name = "Premium ticket",
                Price = 100,
                DayLimit = 50,
                EntryLimit = 80,
                IsDeleted = false,
                RoomId = 3,
                HoursFrom = "6:00",
                HoursTo = "23:00",
                DailyUsages = 2
            }
        };

        public async Task<TicketType> GetTicketTypeAsync(Guid id)
        {
            var ticket = tickets.Where(ticket => ticket.Id == id).SingleOrDefault();
            return await Task.FromResult(ticket);
        }

        public async Task<IEnumerable<TicketType>> GetTicketTypesAsync()
        {
            return await Task.FromResult(tickets);
        }
    }
}