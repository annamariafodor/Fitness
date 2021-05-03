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
    [Route("clients")]
    public class ClientController : ControllerBase
    {
        private readonly IInMemClientRepository repository;
        public ClientController(IInMemClientRepository repository)
        {
            this.repository = repository;
        }

        // Get/Clients
        [HttpGet]
        public async Task<IEnumerable<ClientDto>> GetClientsAsync()
        {
            var client = (await repository.GetClientsAsync()).Select(client => client.MapToDto());
            return client;
        }

        // Get/Client/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDto>> GetClientAsync(Guid id)
        {
            var client = await repository.GetClientAsync(id);
            if (client is null)
            {
                return NotFound();
            }
            return client.MapToDto();
        }

        //Post/Client
        [HttpPost]
        public async Task<ActionResult<ClientDto>> CreateClientAsync(CreateClientDto clientDto)
        {
            Client client = new()
            {
                Id = Guid.NewGuid(),
                Name = clientDto.Name,
                Telephone = clientDto.Telephone,
                Email = clientDto.Email,
                IsDeleted = clientDto.IsDeleted,
                Photo = clientDto.Photo,
                InsertedDate = DateTimeOffset.UtcNow,
                CNP = clientDto.CNP,
                Adress = clientDto.Adress,
                Barcode = clientDto.Barcode,
                Comment = clientDto.Comment
            };
            await repository.CreateClientAsync(client);
            return CreatedAtAction(nameof(CreateClientAsync), new { id = client.Id }, client.MapToDto());
        }

        //PUT/Client/{id}
        [HttpPut("id")]
        public async Task<ActionResult<ClientDto>> UpdateClientAsync(Guid id, UpdateClientDto clientDto)
        {
            var existingItem = await repository.GetClientAsync(id);
            if (existingItem is null)
            {
                return NotFound();
            }

            Client updateItem = existingItem with
            {
                Name = clientDto.Name,
                Telephone = clientDto.Telephone,
                Email = clientDto.Email,
                IsDeleted = clientDto.IsDeleted,
                Photo = clientDto.Photo,
                CNP = clientDto.CNP,
                Adress = clientDto.Adress,
                Barcode = clientDto.Barcode,
                Comment = clientDto.Comment
            };
            await repository.UpdateClientAsync(updateItem);
            return NoContent();
        }

        //Delete/Client{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClientAsync(Guid id)
        {
            var existingItem = await repository.GetClientAsync(id);
            if (existingItem is null)
            {
                return NotFound();
            }
            await repository.DeleteClientAsync(id);

            return NoContent();
        }
    }
}