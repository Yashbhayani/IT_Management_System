using System;
using System.Collections.Generic;

namespace IT_Management.Models
{
    public partial class DepartmentRole
    {
        public int Id { get; set; }
        public int DepartmentId { get; set; }
        public string EmployeeRole { get; set; } = null!;
    }
}
