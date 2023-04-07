import {Component} from '@angular/core';
import {ClientService} from "../../service/client.service";
import {ActivatedRoute} from "@angular/router";
import {IClient} from "../../interface/client";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

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
  clientCPF = "";
  protected readonly console = console;

  constructor(private clientService: ClientService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('cpf')) {
      this.loadClient();
    }
  }

  submit() {
    if (this.clientCPF) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    const client: IClient = this.fromForm(this.clientForm.value);

    this.clientService.createClient(client).subscribe(result => {
      Swal.fire(
        {
          title: 'Cliente criado com sucesso',
          text: 'Cliente com CPF ' + client.CPF + ' foi adicionado ao sistema',
          icon: 'success',
          confirmButtonText: 'Ok'
        }
      )
    }, error => {
      let errorsMessage = this.concatenateErrors(error.error.errors);
      Swal.fire(
        {
          title: 'Erro ao criar cliente',
          text: errorsMessage,
          icon: 'error',
          confirmButtonText: 'Ok'
        }
      )
    });
  }

  update() {
    const client: IClient = this.fromForm(this.clientForm.value);

    this.clientService.updateClient(client, this.clientCPF).subscribe(result => {
      Swal.fire(
        {
          title: 'Cliente atualizado com sucesso',
          text: 'Cliente com CPF ' + client.CPF + ' foi atualizado no sistema',
          icon: 'success',
          confirmButtonText: 'Ok'
        }
      )
    }, error => {
      let errorsMessage = this.concatenateErrors(error.error.errors);

      Swal.fire(
        {
          title: 'Erro ao atualizar cliente',
          text: errorsMessage,
          icon: 'error',
          confirmButtonText: 'Ok'
        }
      )
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

  private concatenateErrors(errors: string[]): string {
    let str = "";
    for (let i = 0; i < errors.length; i++) {
      str += errors[i] + " ";
    }
    return str;
  }
}
