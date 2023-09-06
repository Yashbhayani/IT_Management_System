using System;
using System.Collections.Generic;

namespace IT_Management.EntityModels
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public int Role { get; set; }
        public int Department { get; set; }
        public int Branch { get; set; }
        public DateTime JoiningDate { get; set; }
        public int Salary { get; set; }
    }
}
