using Microsoft.AspNetCore.SignalR;

namespace DemoSignalR;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, KoiFish koiFish)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, koiFish);
    }
}
