namespace IT_Management.Model
{
    public class LoginStatusCodeMessageClass
    {
        public bool Success { get; set; }
        public int StatusCode { get; set; }
        public string Token { get; set; }
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
