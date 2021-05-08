using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessAPI.Dtos;
using FitnessAPI.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace FitnessAPI.Controllers
{
    [ApiController]
    [Route("tickettypes")]
    public class TicketTypesController : ControllerBase
    {
        private readonly IInMemTicketTypeRepository repository;

        public TicketTypesController(IInMemTicketTypeRepository repository)
        {
            this.repository = repository;
        }

        // Get/TicketTypes
        [EnableCors("mySpecificOrigins")]
        [HttpGet]
        public async Task<IEnumerable<TicketTypeDto>> GetTicketTypesAsync()
        {
            var tickets = (await repository.GetTicketTypesAsync()).Select(ticket => ticket.TicketTypeMapToDto());
            return tickets;
        }

        // Get/TicketType/{id}
        [EnableCors("mySpecificOrigins")]
        [HttpGet("{id}")]
        public async Task<ActionResult<TicketTypeDto>> GetTicketTypeAsync(Guid id)
        {
            var ticket = await repository.GetTicketTypeAsync(id);
            if (ticket is null)
            {
                return NotFound();
            }
            return ticket.TicketTypeMapToDto();
        }

    }
}