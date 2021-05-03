using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FitnessAPI.Entities;

namespace FitnessAPI.Repositories
{
    public interface IInMemEntryRepository
    {
        Task<Entry> GetEntryAsync(Guid id);
        Task<IEnumerable<Entry>> GetEntriesAsync();
        Task CreateEntryAsync(Entry entry);
    }
}