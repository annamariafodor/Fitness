using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public class InMemEntryRepository : IInMemEntryRepository
    {
        private readonly List<Entry> entries = new() { };

        public async Task<Entry> GetEntryAsync(Guid id)
        {
            var entry = entries.Where(entry => entry.Id == id).SingleOrDefault();
            return await Task.FromResult(entry);
        }


        public async Task<IEnumerable<Entry>> GetEntriesAsync()
        {
            return await Task.FromResult(entries);
        }

        public async Task CreateEntryAsync(Entry entry)
        {
            entries.Add(entry);
            await Task.CompletedTask;
        }

    }
}