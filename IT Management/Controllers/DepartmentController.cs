using IT_Management.EntityModels;
using IT_Management.Model;
using IT_Management.Success;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace IT_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : Controller
    {
        [Route("/GetDepartmentName")]
        [HttpGet]
        public IActionResult GetDepartmentName([FromHeader] string jwtToken)
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
                            var Department = db.Departments.ToList();
                            DepartmentSuccessClassClass departmentSuccessClassClass = new DepartmentSuccessClassClass();
                            departmentSuccessClassClass.listdepartments = new List<Department>();
                            departmentSuccessClassClass.listdepartments.AddRange(Department);
                            departmentSuccessClassClass.Success = 200;
                            departmentSuccessClassClass.verify = true;
                            return Ok(departmentSuccessClassClass);
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

        [Route("/PostDepartmentName")]
        [HttpPost]
        public async Task<IActionResult> PostDepartmentName([FromBody] Department department, [FromHeader] string jwtToken)
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
                            Department department1 = new Department();
                            department1.DepartmentName = department.DepartmentName;
                            db.Departments.Add(department1);
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

        [Route("/PutDepartmentName")]
        [HttpPut]
        public async Task<IActionResult> PutDepartmentName([FromBody] Department department, [FromHeader] string jwtToken)
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
                            if (department.Id > 0)
                            {
                                var department1 = db.Departments.FirstOrDefault(x => x.Id == department.Id);
                                if (department1 != null)
                                {
                                    department1.DepartmentName = department.DepartmentName;
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
