using IT_Management.EntityModels;
using IT_Management.Model;
using Microsoft.AspNetCore.Mvc;

namespace IT_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        public IConfiguration _configuration;

        public LoginController(IConfiguration config)
        {
            _configuration = config;
        }

        [Route("/Login")]
        [HttpPost]
        public IActionResult Login([FromBody]LoginClass loginClass)
        {
            try
            {
                using (var db = new DBPOSAPIContext())
                {
                    if (db.AdminTables.Where(x => x.Email == loginClass.EmialId && x.Password == loginClass.password).FirstOrDefault() != null)
                    {
                        string Department = "Admin";
                        string Role = "Admin";
                        string token = TestController.GetToken(loginClass.EmialId, Department, Role, _configuration);
                        AdminStatusCodemessagClass adminStatusCodemessagClass = new AdminStatusCodemessagClass()
                        {
                            Success = true,
                            StatusCode = 200,
                            Token = token,
                            FirstName = "Admin",
                            Employee_Role = "Admin",
                            Email = loginClass.EmialId
                        };
                        
                        return Ok(adminStatusCodemessagClass);
                    }else if (db.Employees.Where(x => x.Email == loginClass.EmialId && x.Password == loginClass.password).FirstOrDefault() != null)
                    {
                        var UDATA = db.Employees.Where(x => x.Email == loginClass.EmialId && x.Password == loginClass.password).FirstOrDefault();
                        var DEPARTROL = db.DepartmentRoles.FirstOrDefault(x => x.Id == UDATA.Role);
                        var DEPART = db.Departments.FirstOrDefault(x => x.Id == UDATA.Department);
                        var token = TestController.GetToken(loginClass.EmialId, DEPART.DepartmentName ,DEPARTROL.EmployeeRole, _configuration);
                        var query = from employees in db.Employees
                                    join role in db.DepartmentRoles
                                    on employees.Role equals role.Id
                                    join department in db.Departments
                                    on employees.Department equals department.Id
                                    join branch in db.BranchTables
                                    on employees.Branch equals branch.Id
                                    where employees.Email == loginClass.EmialId
                                    select new LoginStatusCodeMessageClass()
                                    {
                                        Success = true,
                                        StatusCode = 200,
                                        Token = token,
                                        /*  FirstName = employees.FirstName,
                                          LastName = employees.LastName,*/
                                        Email = employees.Email,
                                      /*  Phone = employees.Phone,*/
                                        Employee_Role = role.EmployeeRole,
                                        DepartmentName = department.DepartmentName,
                                        /*  State = branch.State,
                                          City = branch.City,
                                          Branch = branch.Branch,
                                          JoiningDate = employees.JoiningDate,
                                          Salary = employees.Salary*/
                                    };
                        return Ok(query.FirstOrDefault());
                    }
                    else
                    {
                        StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                        {
                            Success = false,
                            Message = "User is Not valid!"
                        };
                        return Ok(value: falseStatusCodeMessageClass);
                    }

                }
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }
    }
}
