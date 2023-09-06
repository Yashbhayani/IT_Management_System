using IT_Management.EntityModels;
using IT_Management.Model;
using IT_Management.Success;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Runtime.ConstrainedExecution;

namespace IT_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentRoleController : Controller
    {
        [Route("/GetDepartmentRoles")]
        [HttpGet]
        public IActionResult GetDepartmentRoles([FromHeader] string jwtToken)
        {
            try
            {
                var data = TestController.GetEmailMethode(jwtToken);
                if (data.Email != null || data.Email != "")
                {
                    using (var db = new DBPOSAPIContext())
                    {
                        if (data.Role == "Head" || data.Role == "Admin")
                        {
                            var DepartmentRole = from dr in db.DepartmentRoles
                                                 join d in db.Departments
                                                 on dr.DepartmentId equals d.Id select new DepartmentRoleNewClass()
                                                 {
                                                     Id = dr.Id,
                                                     Department = d.DepartmentName,
                                                     EmployeeRole = dr.EmployeeRole,
                                                 };
                            DepartmentRolesClass departmentRolesClass = new DepartmentRolesClass();
                            departmentRolesClass.departmentRoleNewClasses = new List<DepartmentRoleNewClass>();
                            departmentRolesClass.departmentRoleNewClasses.AddRange(DepartmentRole);
                            departmentRolesClass.Success = 200;
                            departmentRolesClass.verify = true;
                            return Ok(departmentRolesClass);
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
                        Message = "User can not Authenticate!"
                    };
                    return Ok(value: falseStatusCodeMessageClass);
                }
            }
            catch (Exception e)
            {
                return View(e.Message);
            }
        }

        [Route("/PostDepartmentRoles")]
        [HttpPost]
        public async Task<IActionResult> PostDepartmentRoles([FromHeader] string jwtToken, [FromBody] DepartmentRole departmentRole)
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
                            DepartmentRole departmentRole1 = new DepartmentRole();
                            departmentRole1.DepartmentId = departmentRole.DepartmentId;
                            departmentRole1.EmployeeRole = departmentRole.EmployeeRole;
                            db.DepartmentRoles.Add(departmentRole1);
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

        [Route("/PutDepartmentRoles")]
        [HttpPut]
        public async Task<IActionResult> PutDepartmentRoles([FromBody] DepartmentRole departmentRole, [FromHeader] string jwtToken)
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
                            if (departmentRole.Id > 0)
                            {
                                var departmentRole1 = db.DepartmentRoles.FirstOrDefault(x => x.Id == departmentRole.Id);
                                if (departmentRole1 != null)
                                {
                                    departmentRole1.DepartmentId = departmentRole.DepartmentId;
                                    departmentRole1.EmployeeRole = departmentRole.EmployeeRole;
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
                                    Message = "User is Not Valid!"
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
    }
}
