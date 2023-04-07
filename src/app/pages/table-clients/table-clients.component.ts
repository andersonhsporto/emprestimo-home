import {Component} from '@angular/core';
import {ClientService} from "../../service/client.service";
import {IClient} from "../../interface/client";
import Swal from "sweetalert2";

@Component({
  selector: 'app-table-clients',
  templateUrl: './table-clients.component.html',
  styleUrls: ['./table-clients.component.css']
})
export class TableClientsComponent {
  clients: IClient[] = [];

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.clientService.getAllClients().subscribe((result: IClient[]) => {
      this.clients = result;
    })
  }

  deleteClient(cpf: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(cpf).subscribe(() => {
          Swal.fire(
            'Deletado!',
            'O cliente foi deletado.',
            'success'
          )
          this.ngOnInit();
        })
      }
    })
  }
}
