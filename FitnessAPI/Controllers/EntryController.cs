using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessAPI.Dtos;
using FitnessAPI.Entities;
using FitnessAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FitnessAPI.Controllers
{
    [ApiController]
    [Route("entries")]
    public class EntryController : ControllerBase
    {
        private readonly IInMemEntryRepository repository;

        public EntryController(IInMemEntryRepository repository)
        {
            this.repository = repository;
        }

        // Get/Entries
        [HttpGet]
        public async Task<IEnumerable<EntryDto>> GetEntriesAsync()
        {
            var entries = (await repository.GetEntriesAsync()).Select(entry => entry.EntryMapToDto());
            return entries;
        }

        // Get/Entry/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<EntryDto>> GetEntryAsync(Guid id)
        {
            var entry = await repository.GetEntryAsync(id);
            if (entry is null)
            {
                return NotFound();
            }
            return entry.EntryMapToDto();
        }

        // Post/Entry
        [HttpPost]
        public async Task<ActionResult<EntryDto>> CreateEnrtyAsync(CreateEntryDto entryDto)
        {
            Entry entry = new()
            {
                Id = Guid.NewGuid(),
                ClientId = entryDto.ClientId,
                TicketId = entryDto.TicketId,
                Date = DateTimeOffset.UtcNow,
                InsertedById = entryDto.InsertedById,
                Barcode = entryDto.Barcode,
                RoomId = entryDto.RoomId
            };
            await repository.CreateEntryAsync(entry);
            return CreatedAtAction(nameof(CreateEnrtyAsync), new { id = entry.Id }, entry.EntryMapToDto());
        }
    }
}