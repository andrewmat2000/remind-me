var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSpaStaticFiles(options => options.RootPath = "wwwroot");

builder.Services.AddControllers();
builder.Services.AddMvc(options => options.EnableEndpointRouting = false);

var app = builder.Build();

app.UseSpaStaticFiles();

app.UseMvc()
   .UseRouting();
app.MapControllers();

app.UseSpa(x => {
  x.Options.SourcePath = "wwwroot";

  if (app.Environment.IsDevelopment()) {
    x.UseProxyToSpaDevelopmentServer(Environment.GetEnvironmentVariable("DEV_SERVER_URL") ?? "http://localhost:3000");
  }
});

app.Run();
