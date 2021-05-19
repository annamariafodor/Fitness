using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public interface IInMemRoomRepository
    {
        Task<Room> GetRoomAsync(Guid id);
        Task<IEnumerable<Room>> GetRoomsAsync();
    }
}