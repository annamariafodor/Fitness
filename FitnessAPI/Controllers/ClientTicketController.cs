using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessAPI.Dtos;
using FitnessAPI.Entities;
using FitnessAPI.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace FitnessAPI.Controllers
{
    [ApiController]
    [Route("clienttickets")]
    public class ClientTicketsController : ControllerBase
    {
        private readonly IInMemClientTicketRepository repository;

        public ClientTicketsController(IInMemClientTicketRepository repository)
        {
            this.repository = repository;
        }

        // Get/ClientTickets
        [EnableCors("mySpecificOrigins")]
        [HttpGet]
        public async Task<IEnumerable<ClientTicketDto>> GetClientTicketsAsync()
        {
            var clientTickets = (await repository.GetClientTicketsAsync()).Select(clientTickets => clientTickets.ClientTicketMapToDto());
            return clientTickets;
        }

        // Get/ClientTicket/{id}
        [EnableCors("mySpecificOrigins")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientTicketDto>> GetClientTicketAsync(Guid id)
        {
            var clientTicket = await repository.GetClientTicketAsync(id);
            if (clientTicket is null)
            {
                return NotFound();
            }
            return clientTicket.ClientTicketMapToDto();
        }

        private readonly Random random = new Random();
        // Post/ClientTicket
        [EnableCors("mySpecificOrigins")]
        [HttpPost]
        public async Task<ActionResult<ClientTicketDto>> CreateClientTicketAsync(CreateClientTicketDto clientTicketDto)
        {
            ClientTicket clientTicket = new()
            {
                Id = Guid.NewGuid(),
                ClientId = clientTicketDto.ClientId,
                TicketTypeId = clientTicketDto.TicketTypeId,
                BuyingDate = DateTimeOffset.UtcNow,
                Barcode = clientTicketDto.Barcode,
                EntryCount = 0,
                BuyingPrice = clientTicketDto.BuyingPrice,
                AvalabileDate = clientTicketDto.AvalabileDate,
                FirstUsageDate = clientTicketDto.FirstUsageDate,
                RoomId = clientTicketDto.RoomId

            };
            await repository.CreateClientTicketAsync(clientTicket);
            return CreatedAtAction(nameof(CreateClientTicketAsync), new { id = clientTicket.Id }, clientTicket.ClientTicketMapToDto());
        }

        // PUT/ClientTicket/{id}
        [EnableCors("mySpecificOrigins")]
        [HttpPut("{id}")]
        public async Task<ActionResult<ClientTicketDto>> UpdateClientTicketAsync(Guid id, UpdateClientTicketDto clientTicketDto)
        {
            var existingItem = await repository.GetClientTicketAsync(id);

            if (existingItem is null)
            {
                return NotFound();
            }

            ClientTicket updateItem = existingItem with
            {
                ClientId = clientTicketDto.ClientId,
                TicketTypeId = clientTicketDto.TicketTypeId,
                BuyingDate = clientTicketDto.BuyingDate,
                Barcode = clientTicketDto.Barcode,
                EntryCount = clientTicketDto.EntryCount,
                BuyingPrice = clientTicketDto.BuyingPrice,
                AvalabileDate = clientTicketDto.AvalabileDate,
                FirstUsageDate = clientTicketDto.FirstUsageDate,
                RoomId = clientTicketDto.RoomId
            };

            await repository.UpdateClientTicketAsync(updateItem);

            return NoContent();
        }
    }
}