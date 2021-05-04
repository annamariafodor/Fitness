using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public class InMemClientTicketRepository : IInMemClientTicketRepository
    {
        private readonly List<ClientTicket> clientTickets = new() { };

        public async Task<ClientTicket> GetClientTicketAsync(Guid id)
        {
            var clientTicket = clientTickets.Where(clientTicket => clientTicket.Id == id).SingleOrDefault();
            return await Task.FromResult(clientTicket);
        }

        public async Task<IEnumerable<ClientTicket>> GetClientTicketsAsync()
        {
            return await Task.FromResult(clientTickets);
        }
        public async Task CreateClientTicketAsync(ClientTicket clientTicket)
        {
            clientTickets.Add(clientTicket);
            await Task.CompletedTask;
        }

        public async Task UpdateClientTicketAsync(ClientTicket clientTicket)
        {
            var index = clientTickets.FindIndex(existingItem => existingItem.Id == clientTicket.Id);
            clientTickets[index] = clientTicket;
            await Task.CompletedTask;
        }
    }
}