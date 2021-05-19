using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public interface IInMemClientRepository
    {
        Task<Client> GetClientAsync(Guid id);
        Task<Client> GetClientByEmailAsync(string email);
        Task<IEnumerable<Client>> GetClientsAsync();
        Task CreateClientAsync(Client client);
        Task UpdateClientAsync(Client client);
        Task DeleteClientAsync(Guid id);
    }
} 