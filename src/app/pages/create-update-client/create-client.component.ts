import {Component} from '@angular/core';
import {ClientService} from "../../service/client.service";
import {ActivatedRoute} from "@angular/router";
import {IClient} from "../../interface/client";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-update-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {

  clientForm = new FormGroup({
    inputCPF: new FormControl('', Validators.required),
    inputName: new FormControl('', Validators.required),
    inputTelephone: new FormControl('', Validators.required),
    inputStreet: new FormControl('', Validators.required),
    inputNumber: new FormControl(0, Validators.required),
    inputZip: new FormControl('', Validators.required),
    inputIncome: new FormControl(0, Validators.required)
  })
  constructor(private clientService: ClientService,
              private route: ActivatedRoute) {
  }

  clientCPF = "";

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('cpf')) {
      this.loadClient();
    }
  }

  ngOnSubmit() {
    if (this.clientCPF) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const client: IClient = this.fromForm(this.clientForm.value);

    this.clientService.createClient(client).subscribe(result => {
      console.table(client);
    }, error => {
      console.error(error);
    });
  }

  update() {
    const client: IClient = this.fromForm(this.clientForm.value);

    this.clientService.updateClient(client, this.clientCPF).subscribe(result => {
      console.log(client);
    }, error => {
      console.error(error);
    });
  }

  private loadClient() {
    this.clientCPF = String(this.route.snapshot.paramMap.get('cpf'));
    if (this.clientCPF) {
      this.clientService.getClientByCpf(this.clientCPF).subscribe((client: IClient) => {
        this.clientForm.setValue({
          inputCPF: client.CPF,
          inputName: client.nome,
          inputTelephone: client.telefone,
          inputStreet: client.rua,
          inputNumber: client.numero,
          inputZip: client.CEP,
          inputIncome: client.salario
        })
      });
    }
  }
  private fromForm(form: any): IClient {
    return {
      CPF: form.inputCPF,
      nome: form.inputName,
      telefone: form.inputTelephone,
      rua: form.inputStreet,
      numero: form.inputNumber,
      CEP: form.inputZip,
      salario: form.inputIncome
    };
  }

  protected readonly console = console;
}
