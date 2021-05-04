using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public class InMemRoomRepository : IInMemRoomRepository
    {
        private readonly List<Room> rooms = new()
        {
            new Room { Id = Guid.NewGuid(), Name = "Elso Terem", IsDeleted = false },
            new Room { Id = Guid.NewGuid(), Name = "Masodik Terem", IsDeleted = false },
            new Room { Id = Guid.NewGuid(), Name = "Harmadik Terem", IsDeleted = false },
            new Room { Id = Guid.NewGuid(), Name = "Negyedik Terem", IsDeleted = true },
            new Room { Id = Guid.NewGuid(), Name = "Otodik Terem", IsDeleted = false },
            new Room { Id = Guid.NewGuid(), Name = "Hatodik Terem", IsDeleted = true }
        };

        public async Task<Room> GetRoomAsync(Guid id)
        {
            var room = rooms.Where(room => room.Id == id).SingleOrDefault();
            return await Task.FromResult(room);
        }

        public async Task<IEnumerable<Room>> GetRoomsAsync()
        {
            return await Task.FromResult(rooms);

        }
    }
}