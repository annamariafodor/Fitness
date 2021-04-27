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
        public async Task<IEnumerable<ClientDto>> GetClientsAsync(){
            var client = (await repository.GetClientsAsync()).Select(client => client.MapToDto());
            return client;
        }

        // Get/Client/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientDto>> GetClientAsync(Guid id){
            var client = await repository.GetClientAsync(id);
            if(client is null){
                return NotFound();
            }
            return client.MapToDto();
        }

    }
} 