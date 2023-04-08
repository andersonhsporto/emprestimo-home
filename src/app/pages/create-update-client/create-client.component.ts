import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ClientService} from "../../service/client.service";
import {ActivatedRoute} from "@angular/router";
import {IClient} from "../../interface/client";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-create-update-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateClientComponent {

  clientForm = new FormGroup({
    inputCPF: new FormControl('',
      Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$')])),
    inputName: new FormControl('', Validators.required),
    inputTelephone: new FormControl('', Validators.required),
    inputStreet: new FormControl('', Validators.required),
    inputNumber: new FormControl(0, Validators.required || Validators.min(0)),
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
    } else {
      this.clientForm.controls['inputIncome'].setValue(null);
      this.clientForm.controls['inputNumber'].setValue(null);
    }
  }

  onSubmit() {
    this.validateAllFormFields(this.clientForm);
    if (this.clientForm.valid) {
      if (this.clientCPF) {
        this.update();
      } else {
        this.create();
      }
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
      if (error.status === 0) {
        this.connectionError();
        return;
      }

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
      if (error.status === 0) {
        this.connectionError();
        return;
      }

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


  isFieldValid(field: string) {
    return !this.clientForm.get(field)!.valid && this.clientForm.get(field)!.touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
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
      str += errors[i] + " \n";
    }
    return str;
  }

  private connectionError() {
    Swal.fire(
      {
        title: 'Erro de conexão',
        text: 'Erro ao conectar com o servidor',
        icon: 'error',
        confirmButtonText: 'Ok'
      }
    )
  }
}
