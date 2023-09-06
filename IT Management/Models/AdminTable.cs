using System;
using System.Collections.Generic;

namespace IT_Management.Models
{
    public partial class AdminTable
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
