﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pet_Pillbox.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Pet_Pillbox.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UsersRepository _repo;

        public UsersController(UsersRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _repo.GetAllUsers();

            return Ok(allUsers);
        }
    }
}