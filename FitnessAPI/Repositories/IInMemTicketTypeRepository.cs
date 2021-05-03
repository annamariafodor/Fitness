using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public interface IInMemTicketTypeRepository
    {
        Task<TicketType> GetTicketTypeAsync(Guid id);
        Task<IEnumerable<TicketType>> GetTicketTypesAsync();
    }
}