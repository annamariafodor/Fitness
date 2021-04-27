using FitnessAPI.Dtos;
using FitnessAPI.Entities;

namespace FitnessAPI
{
    public static class Helper
    {
        public static ClientDto MapToDto(this Client client)
        {
            return new ClientDto
            {
                Id = client.Id,
                Name = client.Name,
                Telephone = client.Telephone,
                Email = client.Email,
                IsDeleted = client.IsDeleted,
                Photo = client.Photo,
                InsertedDate = client.InsertedDate,
                CNP = client.CNP,
                Adress = client.Adress,
                Barcode = client.Barcode,
                Comment = client.Comment
            };
        }
    }
} 