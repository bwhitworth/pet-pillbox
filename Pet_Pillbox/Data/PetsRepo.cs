﻿using Pet_Pillbox.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Pet_Pillbox.Data
{
    public class PetsRepository
    {
        readonly string _connectionString;

        public PetsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Pet_Pillbox");
        }

        public List<Pet> GetAllPets()
        {
            using var db = new SqlConnection(_connectionString);

            var pets = db.Query<Pet>("select * from Pets");

            return pets.ToList();
        }
    }
}