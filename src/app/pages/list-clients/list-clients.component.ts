import { Component } from '@angular/core';
import { ClientService } from "../../service/client.service";
import {IClient} from "../../interface/client";

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent {
  clients: IClient[] = [];
  constructor(private clientService : ClientService) {}

  ngOnInit() {
    this.clientService.getAllClients().subscribe((result: IClient[]) => {
      this.clients = result;
      console.log(this.clients);
    })
  }

}
