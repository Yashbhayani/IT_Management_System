namespace IT_Management.Model
{
    public class UserClass
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Role { get; set; }
        public string Department { get; set; }
        public string Branch { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public DateTime JoiningDate { get; set; }
        public int Salary { get; set; }
    }
}
