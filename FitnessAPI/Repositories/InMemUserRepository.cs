
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public class InMemUserRepository : IInMemUserRepository
    {
        private readonly List<User> users = new()
        {
            new User
            {
                Id = Guid.NewGuid(),
                Email = "bela@gmail.com",
                Password = "password",
                Role = "client"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Email = "kata@gmail.com",
                Password = "password",
                Role = "client"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Email = "sandor@gmail.com",
                Password = "password",
                Role = "client"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Email = "admin@gmail.com",
                Password = "admin",
                Role = "admin"
            },
        };

        public async Task CreateUserAsync(User user)
        {
            users.Add(user);
            await Task.CompletedTask;
        }

        public async Task<User> GetUserAsync(Guid id)
        {
            var user = users.Where(user => user.Id == id).SingleOrDefault();
            return await Task.FromResult(user);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var user = users.Where(user => user.Email == email).SingleOrDefault();
            return await Task.FromResult(user);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await Task.FromResult(users);
        }

        public async Task UpdateUserAsync(User user)
        {
            var index = users.FindIndex(existingItem => existingItem.Id == user.Id);
            users[index] = user;
            await Task.CompletedTask;
        }
    }
}