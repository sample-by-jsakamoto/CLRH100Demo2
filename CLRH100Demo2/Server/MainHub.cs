using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace CLRH100Demo2.Server
{
    public class MainHub : Hub
    {
        public void SetHostState(HostState latestHostStae)
        {
            this.Clients.All.updateHostState(latestHostStae);
        }

        public void RequestCurrentState()
        {
            this.Clients.All.requestCurrentState();
        }

        public void RequestToggleState()
        {
            this.Clients.All.requestToggleState();
        }
    }
}