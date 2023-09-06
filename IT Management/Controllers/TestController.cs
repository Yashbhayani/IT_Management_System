using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json;
using IT_Management.Model;

namespace IT_Management.Controllers
{
    [Route("api")]
    [ApiController]
    public class TestController : Controller
    {
        public IConfiguration _configuration;

        public TestController(IConfiguration config)
        {
            _configuration = config;
        }

        /*
        [HttpPost]
        public IActionResult Index()
        {
            var claims = new[]{
                             new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                             new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                             new Claim("UserName", "Yash Patel"),
                             new Claim("Email", "yash12@gmail.com")
                         };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                 var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                 var token = new JwtSecurityToken(
                     _configuration["Jwt:ValidIssuer"],
                     _configuration["Jwt:ValidAudience"],
                     claims,
                     expires: DateTime.UtcNow.AddMinutes(10),
                     signingCredentials: signIn);

                 return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }
        */
       
        public static string GetToken(string email, string Department, string Role, IConfiguration _configuration)
        {
            var claims = new[]{
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("Email", email),
                new Claim("Department", Department),
                new Claim("Role", Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:ValidIssuer"],
                _configuration["Jwt:ValidAudience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        /* 
                [HttpGet]
                public IActionResult GetIndex([FromHeader] string jwtToken){
                            IdentityModelEventSource.ShowPII = true;
                            SecurityToken validatedToken;
                            var validationParameters = GetValidationParameters();
                            ClaimsPrincipal principal = new JwtSecurityTokenHandler().ValidateToken(jwtToken, validationParameters, out validatedToken);
                            var data = principal.Identities.ToList()[0].Claims.ToList()[4];
                            return Ok(data.Value);

                            JsonSerializerOptions options = new()
                            {
                                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                                WriteIndented = true
                            };

                            string tylerJson = JsonSerializer.Serialize(data, options);
                            return Ok(clmaims);
                        }*/


        public static GetTokenClass GetEmailMethode(string jwtToken)
        {
            IdentityModelEventSource.ShowPII = true;
            SecurityToken validatedToken;
            var validationParameters = GetValidationParameters();
            ClaimsPrincipal principal = new JwtSecurityTokenHandler().ValidateToken(jwtToken, validationParameters, out validatedToken);
            var Email = principal.Identities.ToList()[0].Claims.ToList()[3];
            var Department = principal.Identities.ToList()[0].Claims.ToList()[4];
            var Role = principal.Identities.ToList()[0].Claims.ToList()[5];
            GetTokenClass getTokenClass = new GetTokenClass()
            {
                Email = Email.Value,
                Department = Department.Value,
                Role = Role.Value,
            };

            return getTokenClass;
            
           /* JsonSerializerOptions options = new()
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true
            };

            string tylerJson = JsonSerializer.Serialize(data, options);
            return Ok(clmaims);*/
        }

        private static TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = false,
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidIssuer = "JWTAuthenticationServer",
                ValidAudience = "JWTServicePostmanClient",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YashBhayani1873@gmail.com")) // The same key as the one that generate the token
            };
        }

    }
}
