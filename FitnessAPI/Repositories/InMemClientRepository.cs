
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public class InMemClientRepository : IInMemClientRepository
    {
        private readonly List<Client> clients = new()
        {
            new Client
            {
                Id = Guid.NewGuid(),
                Name = "Nagy Bela",
                Telephone = 0712345678,
                Email = "bela@gmail.com",
                IsDeleted = false,
                Photo = "",
                InsertedDate = DateTimeOffset.UtcNow,
                CNP = 1789542103,
                Adress = "Mucsarocsoge 96",
                Barcode = 6597948,
                Comment = ""
            },
            new Client
            {
                Id = Guid.NewGuid(),
                Name = "Kis Kata",
                Telephone = 0787654321,
                Email = "kata@gmail.com",
                IsDeleted = false,
                Photo = "",
                InsertedDate = DateTimeOffset.UtcNow,
                CNP = 1984653,
                Adress = "Mucsarocsoge 55",
                Barcode = 65465,
                Comment = ""
            },
            new Client
            {
                Id = Guid.NewGuid(),
                Name = "Kovacs Sandor",
                Telephone = 078523147,
                Email = "sandor@gmail.com",
                IsDeleted = false,
                Photo = "",
                InsertedDate = DateTimeOffset.UtcNow,
                CNP = 149465313,
                Adress = "Mucsarocsoge 1",
                Barcode = 897468541,
                Comment = ""
            },
            new Client
            {
                Id = Guid.NewGuid(),
                Name = "Nagy Katalin",
                Telephone = 0796325874,
                Email = "katalin@gmail.com",
                IsDeleted = true,
                Photo = "",
                InsertedDate = DateTimeOffset.UtcNow,
                CNP = 26749641,
                Adress = "Mucsarocsoge 99",
                Barcode = 1687413,
                Comment = ""
            },
            new Client
            {
                Id = Guid.NewGuid(),
                Name = "Szabo Janos",
                Telephone = 0798541648,
                Email = "janos@gmail.com",
                IsDeleted = false,
                Photo = "",
                InsertedDate = DateTimeOffset.UtcNow,
                CNP = 19645469,
                Adress = "Mucsarocsoge 77",
                Barcode = 24417895,
                Comment = ""
            },
            new Client
            {
                Id = Guid.NewGuid(),
                Name = "Balog Ferenc",
                Telephone = 074894631,
                Email = "ferenc@gmail.com",
                IsDeleted = false,
                Photo = "",
                InsertedDate = DateTimeOffset.UtcNow,
                CNP = 1974656,
                Adress = "Mucsarocsoge 44",
                Barcode = 77454649,
                Comment = ""
            },
            new Client
            {
                Id = Guid.NewGuid(),
                Name = "Fodor Annamaria",
                Telephone = 0712345879,
                Email = "admin@gmail.com",
                IsDeleted = false,
                Photo = "",
                InsertedDate = DateTimeOffset.UtcNow,
                CNP = 1789542103,
                Adress = "Mucsarocsoge 96",
                Barcode = 65973698,
                Comment = ""
            },
        };

        public async Task<IEnumerable<Client>> GetClientsAsync()
        {
            return await Task.FromResult(clients);
        }

        public async Task<Client> GetClientAsync(Guid id)
        {
            var client = clients.Where(client => client.Id == id).SingleOrDefault();
            return await Task.FromResult(client);
        }

        public async Task CreateClientAsync(Client client)
        {
            clients.Add(client);
            await Task.CompletedTask;
        }

        public async Task UpdateClientAsync(Client client)
        {
            var index = clients.FindIndex(existingItem => existingItem.Id == client.Id);
            clients[index] = client;
            await Task.CompletedTask;
        }

        public async Task DeleteClientAsync(Guid id)
        {
            var index = clients.FindIndex(existingItem => existingItem.Id == id);
            clients.RemoveAt(index);
            await Task.CompletedTask;
        }

        public async Task<Client> GetClientByEmailAsync(string email)
        {
            var client = clients.Where(client => client.Email == email).SingleOrDefault();
            return await Task.FromResult(client);
        }
    }
}
