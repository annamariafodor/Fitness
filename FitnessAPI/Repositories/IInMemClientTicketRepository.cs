using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public interface IInMemClientTicketRepository
    {
        Task<ClientTicket> GetClientTicketAsync(Guid id);
        Task<IEnumerable<ClientTicket>> GetClientTicketsAsync();
        Task CreateClientTicketAsync(ClientTicket clientTicket);
        Task UpdateClientTicketAsync(ClientTicket clientTicket);
    }
}