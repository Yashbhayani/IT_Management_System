using System;
using System.Collections.Generic;

namespace IT_Management.Models
{
    public partial class BranchTable
    {
        public int Id { get; set; }
        public string State { get; set; } = null!;
        public string City { get; set; } = null!;
        public string Branch { get; set; } = null!;
    }
}
