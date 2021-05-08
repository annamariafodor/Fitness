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
    [Route("rooms")]
    public class RoomsController : ControllerBase
    {
        private readonly IInMemRoomRepository repository;

        public RoomsController(IInMemRoomRepository repository)
        {
            this.repository = repository;
        }

        // Get/Rooms
        [EnableCors("mySpecificOrigins")]
        [HttpGet]
        public async Task<IEnumerable<RoomDto>> GetItemsAsync()
        {
            var rooms = (await repository.GetRoomsAsync()).Select(room => room.RoomMapToDto());
            return rooms;
        }

        // Get/Room/{id}
        [EnableCors("mySpecificOrigins")]
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDto>> GetItemAsync(Guid id)
        {
            var room = await repository.GetRoomAsync(id);
            if (room is null)
            {
                return NotFound();
            }
            return room.RoomMapToDto();
        }

    }
}