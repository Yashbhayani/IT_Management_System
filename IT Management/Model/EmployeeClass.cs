namespace IT_Management.Model
{
    public class EmployeeClass
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public string Email { get; set; }   
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Employee_Role { get; set; }
        public string DepartmentName { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Branch { get; set; }
        public DateTime JoiningDate { get; set; }
        public int Salary { get; set; }
    }
}
