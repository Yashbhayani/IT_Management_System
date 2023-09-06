using IT_Management.EntityModels;
using IT_Management.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace IT_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagementController : Controller
    {
        [Route("/GetUserData")]
        [HttpGet]
        public IActionResult GetUserData([FromHeader] string jwtToken)
        {
            try
            {
                var data = TestController.GetEmailMethode(jwtToken);
                if (data.Email != null || data.Email != "")
                {
                    using (var db = new DBPOSAPIContext())
                    {
                        if (db.AdminTables.Where(x => x.Email == data.Email).Count() > 0)
                        {
                            var Udata = db.AdminTables.FirstOrDefault(x => x.Email == data.Email);
                            AdminStatusCodemessagClass adminStatusCodemessagClass = new AdminStatusCodemessagClass()
                            {
                                Success = true,
                                StatusCode = 200,
                                Token = jwtToken,
                                FirstName = "Admin",
                                Employee_Role = "Admin",
                                Email = Udata.Email,
                                Password = Udata.Password
                            };
                            return Ok(adminStatusCodemessagClass);

                        }
                        else if (db.Employees.Where(x => x.Email == data.Email).Count() > 0)
                        {
                            var Udata = from employees in db.Employees
                                        join role in db.DepartmentRoles
                                            on employees.Role equals role.Id
                                        join department in db.Departments
                                            on employees.Department equals department.Id
                                        join branch in db.BranchTables
                                            on employees.Branch equals branch.Id
                                        where employees.Email == data.Email
                                        select new LoginStatusCodeMessageClass()
                                        {
                                            Success = true,
                                            StatusCode = 200,
                                            Token = jwtToken,
                                            FirstName = employees.FirstName,
                                            LastName = employees.LastName,
                                            Email = employees.Email,
                                            Phone = employees.Phone,
                                            Password = employees.Password,
                                            Employee_Role = role.EmployeeRole,
                                            DepartmentName = department.DepartmentName,
                                            State = branch.State,
                                            City = branch.City,
                                            Branch = branch.Branch,
                                            JoiningDate = employees.JoiningDate,
                                            Salary = employees.Salary
                                        };
                            return Ok(Udata.FirstOrDefault());
                        }
                        else
                        {
                            StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                            {
                                Success = false,
                                Message = "User not Found!"
                            };
                            return Ok(value: falseStatusCodeMessageClass);
                        }
                    }
                }
                else
                {
                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                    {
                        Success = false,
                        Message = "User can not Authenticate!"
                    };
                    return Ok(value: falseStatusCodeMessageClass);
                }
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }

        [Route("/GetEmployeeData")]
        [HttpGet]
        public IActionResult GetEmployeeData([FromHeader] string jwtToken)
        {
            try
            {
                var data = TestController.GetEmailMethode(jwtToken);
                if (data.Email != null || data.Email != "")
                {
                    using (var db = new DBPOSAPIContext())
                    {
                        if (db.AdminTables.Where(x => x.Email == data.Email).Count() > 0)
                        {
                            var query = from employees in db.Employees
                                        join role in db.DepartmentRoles
                                            on employees.Role equals role.Id
                                        join department in db.Departments
                                            on employees.Department equals department.Id
                                        join branch in db.BranchTables
                                            on employees.Branch equals branch.Id
                                        select new EmployeeClass()
                                        {
                                            Id = employees.Id,
                                            FirstName = employees.FirstName,
                                            LastName = employees.LastName,
                                            Email = employees.Email,
                                            Phone = employees.Phone,
                                            Password = employees.Password,
                                            Employee_Role = role.EmployeeRole,
                                            DepartmentName = department.DepartmentName,
                                            State = branch.State,
                                            City = branch.City,
                                            Branch = branch.Branch,
                                            JoiningDate = employees.JoiningDate,
                                            Salary = employees.Salary
                                        };
                            return Ok(query.ToList());
                        }
                        else if (db.Employees.Where(x => x.Email == data.Email).Count() > 0)
                        {
                            var Udata = from employees in db.Employees
                                        join role in db.DepartmentRoles
                                        on employees.Role equals role.Id
                                        join department in db.Departments
                                        on employees.Department equals department.Id
                                        join branch in db.BranchTables
                                        on employees.Branch equals branch.Id
                                        where employees.Email == data.Email
                                        select new UserClass()
                                        {
                                            FirstName = employees.FirstName,
                                            LastName = employees.LastName,
                                            Email = employees.Email,
                                            Phone = employees.Phone,
                                            Role = role.EmployeeRole,
                                            Department = department.DepartmentName,
                                            State = branch.State,
                                            City = branch.City,
                                            Branch = branch.Branch,
                                            JoiningDate = employees.JoiningDate,
                                            Salary = employees.Salary
                                        };
                            var DF = Udata.FirstOrDefault();
                            if (data.Role == "Head" && DF.Role == "Head")
                            {
                                var query = from employees in db.Employees
                                            join role in db.DepartmentRoles
                                            on employees.Role equals role.Id
                                            join department in db.Departments
                                            on employees.Department equals department.Id
                                            join branch in db.BranchTables
                                            on employees.Branch equals branch.Id
                                            where department.DepartmentName == data.Department &&
                                            role.EmployeeRole != data.Role /*&& 
                                                branch.Branch == DF.Branch*/
                                            select new EmployeeClass()
                                            {
                                                Id = employees.Id,
                                                FirstName = employees.FirstName,
                                                LastName = employees.LastName,
                                                Email = employees.Email,
                                                Password = employees.Password,
                                                Phone = employees.Phone,
                                                Employee_Role = role.EmployeeRole,
                                                DepartmentName = department.DepartmentName,
                                                State = branch.State,
                                                City = branch.City,
                                                Branch = branch.Branch,
                                                JoiningDate = employees.JoiningDate,
                                                Salary = employees.Salary
                                            };


                                COMBClass cOMBClass = new COMBClass();
                                cOMBClass.EmployeeClass = new List<EmployeeClass>();
                                cOMBClass.EmployeeClass.AddRange(query.ToList());
                                cOMBClass.userClass = DF;
                                return Ok(query.ToList());
                                /*return Ok(cOMBClass);*/
                            }
                            else
                            {
                                StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                {
                                    Success = false,
                                    Message = "User can not Authenticate!"
                                };
                                return Ok(value: falseStatusCodeMessageClass);
                            }

                        }
                        else
                        {
                            StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                            {
                                Success = false,
                                Message = "User can not Authenticate!"
                            };
                            return Ok(value: falseStatusCodeMessageClass);
                        }
                    }
                }
                else
                {
                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                    {
                        Success = false,
                        Message = "User is Not Valid!"
                    };
                    return Ok(value: falseStatusCodeMessageClass);
                }

            }
            catch (Exception e)
            {
                return Ok(e);

            }
        }

        [Route("/PostEmployeeData")]
        [HttpPost]
        public async Task<IActionResult> PostEmployeeData([FromBody] Employee employee, [FromHeader] string jwtToken)
        {
            try
            {
                var AllData = TestController.GetEmailMethode(jwtToken);
                if (AllData != null)
                {
                    using (var db = new DBPOSAPIContext())
                    {

                        if (db.AdminTables.Where(x => x.Email == AllData.Email).Count() > 0)
                        {
                            if (employee.Id <= 0)
                            {
                                if (
                                    (employee.FirstName != "" && employee.FirstName != null) &&
                                    (employee.LastName != "" && employee.LastName != null) &&
                                    (employee.Email != "" && employee.Email != null) &&
                                    (employee.Password != "" && employee.Password != null) &&
                                    (employee.Phone != "" && employee.Phone != null) &&
                                    (employee.Role != 0 && employee.Role != null) &&
                                    (employee.Department != 0 && employee.Department != null) &&
                                    (employee.Branch != 0 && employee.Branch != null) &&
                                    (employee.Salary != 0 && employee.Salary != null) &&
                                    employee.JoiningDate != null)
                                {
                                    if (db.Employees.Where(x => x.Email == employee.Email).Count() > 0)
                                    {
                                        StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                        {
                                            Success = false,
                                            Message = "Email id Alredy Added!"
                                        };
                                        return Ok(value: falseStatusCodeMessageClass);
                                    }

                                    if (db.Employees.Where(x => x.Phone == employee.Phone).Count() > 0)
                                    {
                                        StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                        {
                                            Success = false,
                                            Message = "Phone Number Alredy Added!"
                                        };
                                        return Ok(value: falseStatusCodeMessageClass);
                                    }

                                    Employee employeenew = new Employee();
                                    employeenew.FirstName = employee.FirstName;
                                    employeenew.LastName = employee.LastName;
                                    employeenew.Email = employee.Email;
                                    employeenew.Password = employee.Password;
                                    employeenew.Phone = employee.Phone;
                                    employeenew.Role = employee.Role;
                                    employeenew.Department = employee.Department;
                                    employeenew.Branch = employee.Branch;
                                    employeenew.JoiningDate = employee.JoiningDate;
                                    employeenew.Salary = employee.Salary;
                                    db.Employees.Add(employeenew);
                                    await db.SaveChangesAsync();
                                    StatusCodeMessageClass trueStatusCodeMessageClass = new StatusCodeMessageClass
                                    {
                                        Success = true,
                                        Message = "Save Data!"
                                    };
                                    return Ok(value: trueStatusCodeMessageClass);
                                }
                                else
                                {
                                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                    {
                                        Success = false,
                                        Message = "Some Data is Missing!"
                                    };
                                    return Ok(value: falseStatusCodeMessageClass);
                                }
                            }
                            else
                            {
                                StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                {
                                    Success = false,
                                    Message = "Some Data is Not Valid!"
                                };
                                return Ok(value: falseStatusCodeMessageClass);
                            }

                        }

                        var CheckEmpDep = from e in db.Employees
                                          join dr in db.DepartmentRoles
                                          on e.Role equals dr.Id
                                          join d in db.Departments
                                          on e.Department equals d.Id
                                          where d.DepartmentName == AllData.Department &&
                                          dr.EmployeeRole == AllData.Role
                                          select new
                                          {
                                              e.Id,
                                              e.FirstName,
                                              e.LastName,
                                              e.Email,
                                              e.Password,
                                              e.Phone,
                                              e.Role,
                                              dr.EmployeeRole,
                                              e.Department,
                                              d.DepartmentName,
                                              e.JoiningDate,
                                              e.Salary
                                          }; ;
                        var DeL = CheckEmpDep.Count();
                        var DeD = CheckEmpDep.FirstOrDefault();
                        if (
                            DeL > 0 &&
                            DeD.DepartmentName == AllData.Department &&
                            DeD.EmployeeRole == "Head" &&
                            DeD.Department == employee.Department)
                        {
                            if (db.Employees.Where(x => x.Email == employee.Email).Count() > 0)
                            {
                                StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                {
                                    Success = false,
                                    Message = "Email id Alredy Added!"
                                };
                                return Ok(value: falseStatusCodeMessageClass);
                            }

                            if (db.Employees.Where(x => x.Phone == employee.Phone).Count() > 0)
                            {
                                StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                {
                                    Success = false,
                                    Message = "Phone Number Alredy Added!"
                                };
                                return Ok(value: falseStatusCodeMessageClass);
                            }

                            Employee employeenew = new Employee();
                            employeenew.FirstName = employee.FirstName;
                            employeenew.LastName = employee.LastName;
                            employeenew.Email = employee.Email;
                            employeenew.Password = employee.Password;
                            employeenew.Phone = employee.Phone;
                            employeenew.Role = employee.Role;
                            employeenew.Department = employee.Department;
                            employeenew.Branch = employee.Branch;
                            employeenew.JoiningDate = employee.JoiningDate;
                            employeenew.Salary = employee.Salary;
                            db.Employees.Add(employeenew);
                            await db.SaveChangesAsync();
                            StatusCodeMessageClass trueStatusCodeMessageClass = new StatusCodeMessageClass
                            {
                                Success = true,
                                Message = "Save Data!"
                            };
                            return Ok(value: trueStatusCodeMessageClass);
                        }
                        else
                        {
                            StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                            {
                                Success = false,
                                Message = "Not Valid!"
                            };
                            return Ok(value: falseStatusCodeMessageClass);
                        }
                    }
                }
                else
                {
                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                    {
                        Success = false,
                        Message = "User is Not Valid!"
                    };
                    return Ok(value: falseStatusCodeMessageClass);
                }
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }

        [Route("/PutEmployeeData")]
        [HttpPut]
        public async Task<IActionResult> PutEmployeeData([FromBody] Employee employee, [FromHeader] string jwtToken)
        {
            try
            {
                var AllData = TestController.GetEmailMethode(jwtToken);

                if (AllData != null)
                {
                    if (AllData.Role == "Head" || AllData.Role == "Admin")
                    {
                        using (var db = new DBPOSAPIContext())
                        {
                            if (db.AdminTables.Where(x => x.Email == AllData.Email).Count() > 0)
                            {
                                if (employee.Id > 0)
                                {
                                    if (
                                       (employee.FirstName != "" && employee.FirstName != null) &&
                                       (employee.LastName != "" && employee.LastName != null) &&
                                       (employee.Email != "" && employee.Email != null) &&
                                       (employee.Password != "" && employee.Password != null) &&
                                       (employee.Phone != "" && employee.Phone != null) &&
                                       (employee.Role != 0 && employee.Role != null) &&
                                       (employee.Department != 0 && employee.Department != null) &&
                                       (employee.Branch != 0 && employee.Branch != null) &&
                                       (employee.Salary != 0 && employee.Salary != null) &&
                                       employee.JoiningDate != null)
                                    {
                                        var UEdata = db.Employees.FirstOrDefault(x => x.Email == employee.Email);

                                        if (db.Employees.Where(x => x.Email == employee.Email).Count() > 0)
                                        {
                                            if (UEdata.Email != employee.Email)
                                            {
                                                StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                                {
                                                    Success = false,
                                                    Message = "Email Id is Alrewady Added!",
                                                };
                                                return Ok(value: falseStatusCodeMessageClass);
                                            }
                                        }

                                        if (db.Employees.Where(x => x.Phone == employee.Phone).Count() > 0)
                                        {
                                            if (UEdata.Phone != employee.Phone)
                                            {
                                                StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                                {
                                                    Success = false,
                                                    Message = "Phone Number is Alrewady Added!"
                                                };
                                                return Ok(value: falseStatusCodeMessageClass);
                                            }
                                        }

                                        UEdata.FirstName = employee.FirstName;
                                        UEdata.LastName = employee.LastName;
                                        UEdata.Email = employee.Email;
                                        UEdata.Phone = employee.Phone;
                                        UEdata.Password = employee.Password;
                                        UEdata.Role = employee.Role;
                                        UEdata.Department = employee.Department;
                                        UEdata.Branch = employee.Branch;
                                        UEdata.JoiningDate = employee.JoiningDate;
                                        UEdata.Salary = employee.Salary;
                                        await db.SaveChangesAsync();
                                        StatusCodeMessageClass trueStatusCodeMessageClass = new StatusCodeMessageClass
                                        {
                                            Success = true,
                                            Message = "Data Updated!"
                                        };
                                        return Ok(value: trueStatusCodeMessageClass);


                                    }
                                    else
                                    {
                                        StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                        {
                                            Success = false,
                                            Message = "Some Data is Missing!"
                                        };
                                        return Ok(value: falseStatusCodeMessageClass);
                                    }

                                }
                                else
                                {
                                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                    {
                                        Success = false,
                                        Message = "Id is Not Valid!"
                                    };
                                    return Ok(value: falseStatusCodeMessageClass);
                                }

                            }

                            if (db.Employees.Where(x => x.Email == AllData.Email).Count() > 0)
                            {
                                if (employee.Id > 0)
                                {
                                    if (
                                       (employee.FirstName != "" && employee.FirstName != null) &&
                                       (employee.LastName != "" && employee.LastName != null) &&
                                       (employee.Email != "" && employee.Email != null) &&
                                       (employee.Password != "" && employee.Password != null) &&
                                       (employee.Phone != "" && employee.Phone != null) &&
                                       (employee.Role != 0 && employee.Role != null) &&
                                       (employee.Department != 0 && employee.Department != null) &&
                                       (employee.Branch != 0 && employee.Branch != null) &&
                                       (employee.Salary != 0 && employee.Salary != null) &&
                                       employee.JoiningDate != null)
                                    {
                                        var FDepartment = db.Departments.FirstOrDefault(x => x.DepartmentName == AllData.Department);
                                        if (FDepartment != null)
                                        {
                                            var UEdata = db.Employees.FirstOrDefault(x => x.Email == AllData.Email && x.Department == FDepartment.Id);

                                            if (db.Employees.Where(x => x.Email == AllData.Email).Count() > 0)
                                            {
                                                if (UEdata.Email != employee.Email)
                                                {
                                                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                                    {
                                                        Success = false,
                                                        Message = "Email Id is Alrewady Added!",
                                                    };
                                                    return Ok(value: falseStatusCodeMessageClass);
                                                }
                                            }

                                            if (db.Employees.Where(x => x.Phone == employee.Phone).Count() > 0)
                                            {
                                                if (UEdata.Phone != employee.Phone)
                                                {
                                                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                                    {
                                                        Success = false,
                                                        Message = "Phone Number is Alrewady Added!"
                                                    };
                                                    return Ok(value: falseStatusCodeMessageClass);
                                                }
                                            }

                                            UEdata.FirstName = employee.FirstName;
                                            UEdata.LastName = employee.LastName;
                                            UEdata.Email = employee.Email;
                                            UEdata.Phone = employee.Phone;
                                            UEdata.Password = employee.Password;
                                            UEdata.Role = employee.Role;
                                            UEdata.Department = employee.Department;
                                            UEdata.Branch = employee.Branch;
                                            UEdata.JoiningDate = employee.JoiningDate;
                                            UEdata.Salary = employee.Salary;
                                            await db.SaveChangesAsync();
                                            StatusCodeMessageClass trueStatusCodeMessageClass = new StatusCodeMessageClass
                                            {
                                                Success = true,
                                                Message = "Data Updated!"
                                            };
                                            return Ok(value: trueStatusCodeMessageClass);



                                        }
                                        else
                                        {
                                            StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                            {
                                                Success = false,
                                                Message = "Department is Not Valid!"
                                            };
                                            return Ok(value: falseStatusCodeMessageClass);
                                        }
                                    }
                                    else
                                    {
                                        StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                        {
                                            Success = false,
                                            Message = "Some Data is Missing!"
                                        };
                                        return Ok(value: falseStatusCodeMessageClass);
                                    }

                                }
                                else
                                {
                                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                    {
                                        Success = false,
                                        Message = "Id is Not Valid!"
                                    };
                                    return Ok(value: falseStatusCodeMessageClass);
                                }

                            }
                            else
                            {
                                StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                {
                                    Success = false,
                                    Message = "Emial Id is Not Valid!!"
                                };
                                return Ok(value: falseStatusCodeMessageClass);

                            }
                        }

                    }
                    else
                    {
                        StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                        {
                            Success = false,
                            Message = "Not Valid!"
                        };
                        return Ok(value: falseStatusCodeMessageClass);
                    }

                }
                else
                {
                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                    {
                        Success = false,
                        Message = "User is Not Valid!"
                    };
                    return Ok(value: falseStatusCodeMessageClass);
                }
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }

        [Route("/DeleteEmployeeData")]
        [HttpDelete]
        public IActionResult DeleteEmployeeData(int id, [FromHeader] string jwtToken)
        {
            try
            {
                var AllData = TestController.GetEmailMethode(jwtToken);
                if (AllData != null)
                {
                    using (var db = new DBPOSAPIContext())
                    {
                        if (db.AdminTables.Where(x => x.Email == AllData.Email).Count() > 0)
                        {
                            var User = db.Employees.FirstOrDefault(x => x.Id == id);

                            if (User != null)
                            {
                                db.Employees.Remove(User);
                                db.SaveChangesAsync();
                                StatusCodeMessageClass trueStatusCodeMessageClass = new StatusCodeMessageClass
                                {
                                    Success = true,
                                    Message = "Data Deleted!"
                                };
                                return Ok(trueStatusCodeMessageClass);
                            }
                            else
                            {
                                StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                {
                                    Success = false,
                                    Message = "Id is Not Valid!"
                                };
                                return Ok(falseStatusCodeMessageClass);
                            }


                        }
                        else
                        {
                            StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                            {
                                Success = false,
                                Message = "Not Valid!"
                            };
                            return Ok(falseStatusCodeMessageClass);
                        }
                    }
                }
                else
                {
                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                    {
                        Success = false,
                        Message = "Data is Valid!"
                    };
                    return Ok(falseStatusCodeMessageClass);
                }


            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }

        [Route("/PatchEmployeeData")]
        [HttpPatch]
        public IActionResult SearchEmployeeData([FromBody] SearchDataClass searchDataClass,[FromHeader] string jwtToken)
        {
            try
            {
                var AllData = TestController.GetEmailMethode(jwtToken);
                if (AllData != null)
                {
                    using (var db = new DBPOSAPIContext())
                    {
                        var Udata = from employees in db.Employees
                                    join role in db.DepartmentRoles
                                    on employees.Role equals role.Id
                                    join department in db.Departments
                                    on employees.Department equals department.Id
                                    join branch in db.BranchTables
                                    on employees.Branch equals branch.Id
                                    where employees.Email == AllData.Email &&
                                    role.EmployeeRole == "Head"
                                    select new 
                                    {
                                        Success = true,
                                        StatusCode = 200,
                                        Token = jwtToken,
                                        FirstName = employees.FirstName,
                                        LastName = employees.LastName,
                                        Email = employees.Email,
                                        Phone = employees.Phone,
                                        Password = employees.Password,
                                        Employee_Role = role.EmployeeRole,
                                        DepartmentName = department.DepartmentName,
                                        State = branch.State,
                                        City = branch.City,
                                        Branch = branch.Branch,
                                        JoiningDate = employees.JoiningDate,
                                        Salary = employees.Salary
                                    };
                        if (db.AdminTables.Where(x => x.Email == AllData.Email).Count() > 0 || Udata.Count() > 0)
                        {
                            if (searchDataClass.MinValue == 0 && searchDataClass.MaxValue == 0 &&
                               searchDataClass.DepartmentName == "" && searchDataClass.EmployeeRole == "" &&
                               searchDataClass.State == "" && searchDataClass.City == "" &&
                               searchDataClass.Branch == "" && searchDataClass.joiningDate == "")
                            {
                                return Ok("Value is Null");
                            }
                            else
                            {
                                var MIN = db.Employees.Min(x => x.Salary);
                                var Max = db.Employees.Max(x => x.Salary);
                                var User = from employees in db.Employees
                                           join role in db.DepartmentRoles
                                           on employees.Role equals role.Id
                                           join department in db.Departments
                                           on employees.Department equals department.Id
                                           join branch in db.BranchTables
                                           on employees.Branch equals branch.Id
                                           where (
                                           searchDataClass.MinValue == 0 ?
                                           employees.Salary >= MIN :
                                           employees.Salary >= searchDataClass.MinValue
                                           )
                                           &&
                                           (
                                           searchDataClass.MaxValue == 0 ?
                                           employees.Salary <= Max :
                                           employees.Salary <= searchDataClass.MaxValue
                                           )
                                           &&
                                           (
                                           searchDataClass.DepartmentName == "" || searchDataClass.DepartmentName == null ?
                                           department.DepartmentName != null :
                                           department.DepartmentName == searchDataClass.DepartmentName
                                           )
                                           &&
                                           (((searchDataClass.DepartmentName == "" || searchDataClass.DepartmentName == null)
                                            &&
                                            (searchDataClass.EmployeeRole == "" || searchDataClass.EmployeeRole == null)) ?
                                            role.EmployeeRole != null :
                                            (searchDataClass.EmployeeRole == "" || searchDataClass.EmployeeRole == null) ?
                                            (searchDataClass.DepartmentName == "" || searchDataClass.DepartmentName == null) ?
                                            role.EmployeeRole != null :
                                            role.EmployeeRole != null :
                                            (searchDataClass.DepartmentName == "" || searchDataClass.DepartmentName == null) ?
                                            role.EmployeeRole != null :
                                            role.EmployeeRole == searchDataClass.EmployeeRole)
                                            &&
                                            (
                                            searchDataClass.State == "" || searchDataClass.State == null ?
                                            branch.State != null :
                                            branch.State == searchDataClass.State
                                            )
                                             &&
                                           (((searchDataClass.State == "" || searchDataClass.State == null) &&
                                            (searchDataClass.City == "" || searchDataClass.City == null)) ?
                                            branch.City != null :
                                            (searchDataClass.City == "" || searchDataClass.City == null) ?
                                            branch.City != null :
                                            branch.City == searchDataClass.City)
                                            &&
                                            (
                                            ((searchDataClass.State == "" || searchDataClass.State == null) &&
                                             (searchDataClass.City == "" || searchDataClass.State == null) &&
                                             (searchDataClass.Branch == "" || searchDataClass.Branch == null)) ?
                                              branch.Branch != null :
                                             (searchDataClass.Branch == "" || searchDataClass.Branch == null) ?
                                              branch.Branch != null :
                                              branch.Branch != searchDataClass.Branch
                                              )
                                              && (
                                              searchDataClass.joiningDate == "" || searchDataClass.joiningDate == null ?
                                                employees.JoiningDate != null :
                                                employees.JoiningDate == Convert.ToDateTime(searchDataClass.joiningDate)
                                            ) && employees.Email != AllData.Email
                                           select new EmployeeClass()
                                           {
                                               FirstName = employees.FirstName,
                                               LastName = employees.LastName,
                                               Email = employees.Email,
                                               Phone = employees.Phone,
                                               Password = employees.Password,
                                               Employee_Role = role.EmployeeRole,
                                               DepartmentName = department.DepartmentName,
                                               State = branch.State,
                                               City = branch.City,
                                               Branch = branch.Branch,
                                               JoiningDate = employees.JoiningDate,
                                               Salary = employees.Salary
                                           };

                                return Ok(User.ToList());
                            }
                        }
                        else
                        {
                            StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                            {

                                Success = false,
                                Message = "User Not Valid!"
                            };
                            return Ok(falseStatusCodeMessageClass);
                        }
                    }
                }
                else
                {
                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                    {
                        Success = false,
                        Message = "Data Not Valid!"
                    };
                    return Ok(falseStatusCodeMessageClass);
                }
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }

        }
    }
}

/*
  try
            {
                var EmialData = TestController.GetEmailMethode(jwtToken);
                if(EmialData != null)
                {
                    using (var db = new DBPOSAPIContext())
                    {
                        if(db.AdminTables.Where(x=>x.Email == EmialData).Count() > 0)
                        {
                            var query = from employees in db.Employees
                                        join role in db.DepartmentRoles
                                            on employees.Role equals role.Id into roleGroup
                                        from role in roleGroup.DefaultIfEmpty()
                                        join department in db.Departments
                                            on employees.Department equals department.Id into departmentGroup
                                        from department in departmentGroup.DefaultIfEmpty()
                                        join branch in db.BranchTables
                                            on employees.Branch equals branch.Id into branchGroup
                                        from branch in branchGroup.DefaultIfEmpty()
                                        select new EmployeeClass()
                                        {
                                            Id= employees.Id,
                                            FirstName = employees.FirstName,
                                            LastName = employees.LastName,
                                            Email = employees.Email,
                                            Phone = employees.Phone,
                                            Employee_Role = role.EmployeeRole,
                                            DepartmentName = department.DepartmentName,
                                            State = branch.State,
                                            City = branch.City,
                                            Branch = branch.Branch,
                                            JoiningDate = employees.JoiningDate,
                                            Salary = employees.Salary
                                        };
                            return Ok(query);
                        }
                        else
                        {
                            return Ok("Data");
                        }
                    }
                }
                else
                {
                    StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                    {
                        Success = false,
                        Message = "User is Not Valid!"
                    };
                    return Ok(value: falseStatusCodeMessageClass);
                }
            }catch (Exception e)
            {
                return Ok(e.Message);
            }
 */
