using Cards.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors((setup) =>
{
    setup.AddPolicy(name: "default", (options) =>
    {
        options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Inject DbContext
builder.Services.AddDbContext<CardsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CardsDbConnectionString"))
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("default");

app.UseAuthorization();

app.MapControllers();

app.Run();
