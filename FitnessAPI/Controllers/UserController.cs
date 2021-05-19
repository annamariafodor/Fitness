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
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly IInMemUserRepository repository;
        public UserController(IInMemUserRepository repository)
        {
            this.repository = repository;
        }

        // Get/Users
        [EnableCors("mySpecificOrigins")]
        [HttpGet]
        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
            var user = (await repository.GetUsersAsync()).Select(user => user.UserMapToDto());
            return user;
        }

        // Get/User/{id}
        [EnableCors("mySpecificOrigins")]
        [HttpGet("GetUserAsync/{id}")]
        public async Task<ActionResult<UserDto>> GetUserAsync(Guid id)
        {
            var user = await repository.GetUserAsync(id);
            if (user is null)
            {
                return NotFound();
            }
            return user.UserMapToDto();
        }

        // Get/User/{email}
        [EnableCors("mySpecificOrigins")]
        [HttpGet("GetUserByEmailAsync/{email}")]
        public async Task<ActionResult<UserDto>> GetUserByEmailAsync(string email)
        {
            var user = await repository.GetUserByEmailAsync(email);
            if (user is null)
            {
                return NotFound();
            }
            return user.UserMapToDto();
        }

        // Post/User
        [EnableCors("mySpecificOrigins")]
        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUserAsync(CreateUserDto userDto)
        {
            User user = new()
            {
                Id = Guid.NewGuid(),
                Email = userDto.Email,
                Password = userDto.Password,
                Role = "client"
            };
            await repository.CreateUserAsync(user);
            return CreatedAtAction(nameof(CreateUserAsync), new { id = user.Id }, user.UserMapToDto());
        }

        // Put/User/{id}
        [EnableCors("mySpecificOrigins")]
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> UpdateUserAsync(Guid id, UpdateUserDto userDto)
        {
            var existingItem = await repository.GetUserAsync(id);
            if (existingItem is null)
            {
                return NotFound();
            }

            User updateItem = existingItem with
            {
                Email = userDto.Email,
                Password = userDto.Password
            };
            await repository.UpdateUserAsync(updateItem);
            return NoContent();
        }
    }
}