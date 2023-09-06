using IT_Management.EntityModels;
using IT_Management.Model;
using IT_Management.Success;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace IT_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchTableController : Controller
    {
        [Route("/GetBranch")]
        [HttpGet]
        public IActionResult GetBranch([FromHeader] string jwtToken)
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
                            var BranchData = db.BranchTables.ToList();
                            BranchSuccessClass branchSuccessClass = new BranchSuccessClass();
                            branchSuccessClass.listbranch = new List<BranchTable>();
                            branchSuccessClass.listbranch.AddRange(BranchData);
                            branchSuccessClass.Success =  200;
                            branchSuccessClass.verify = true;

                            return Ok(branchSuccessClass);
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

        [Route("/PostBranch")]
        [HttpPost]
        public async Task<IActionResult> PostBranch([FromBody] BranchTable branchTable, [FromHeader] string jwtToken)
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
                            if(db.BranchTables.Where(x => x.Branch == branchTable.Branch).Count() > 0)
                            {
                                StatusCodeMessageClass falseStatusCodeMessageClass = new StatusCodeMessageClass
                                {
                                    Success = false,
                                    Message = "Branch is Alredy added!"
                                };
                                return Ok(value: falseStatusCodeMessageClass);
                            }

                            BranchTable branchTable1 = new BranchTable();
                            branchTable1.State = branchTable.State;
                            branchTable1.City = branchTable.City;
                            branchTable1.Branch = branchTable.Branch;
                            db.BranchTables.Add(branchTable1);
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

        [Route("/PutBranch")]
        [HttpPut]
        public async Task<IActionResult> PutBranch([FromBody] BranchTable branchTable, [FromHeader] string jwtToken)
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
                            if (branchTable.Id > 0)
                            {
                                var branchTable1 = db.BranchTables.FirstOrDefault(x => x.Id == branchTable.Id);
                                if (branchTable1 != null)
                                {
                                    branchTable1.State = branchTable.State;
                                    branchTable1.City = branchTable.City;
                                    branchTable1.Branch = branchTable.Branch;
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
