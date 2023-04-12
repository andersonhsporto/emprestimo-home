import {Component, ViewEncapsulation} from '@angular/core';
import {ClientService} from "../../service/client.service";
import {ActivatedRoute} from "@angular/router";
import {IClient} from "../../interface/client";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-update-client',
  templateUrl: './create-update-client.component.html',
  styleUrls: ['./create-update-client.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateUpdateClientComponent {

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

  ngOnInit():void {
    if (this.route.snapshot.paramMap.get('cpf')) {
      this.getClient();
    } else {
      this.clientForm.controls['inputIncome'].setValue(null);
      this.clientForm.controls['inputNumber'].setValue(null);
    }
  }

  onSubmit():void {
    this.validateAllFormFields(this.clientForm);
    if (this.clientForm.valid) {
      if (this.clientCPF) {
        this.updateClient();
      } else {
        this.createClient();
      }
    }
  }

  createClient():void {
    const client: IClient = this.fromForm(this.clientForm.value);

    this.clientService.createClient(client).subscribe(result => {
      Swal.fire(
        {
          title: 'Cliente criado com sucesso',
          text: 'Cliente com CPF '
            + client.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/ , '$1.$2.$3-$4')
            + ' foi adicionado ao sistema',
          icon: 'success',
          confirmButtonText: 'Ok'
        }
      )
    }, error => {
      if (error.status === 0) {
        this.connectionError();
        return;
      }

      let errorsMessage: string = this.concatenateErrors(error.error.errors);
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

  updateClient():void {
    const client: IClient = this.fromForm(this.clientForm.value);

    this.clientService.updateClient(client, this.clientCPF).subscribe(result => {
      Swal.fire(
        {
          title: 'Cliente atualizado com sucesso',
          text: 'Cliente com CPF '
            + client.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/ , '$1.$2.$3-$4')
            + ' foi atualizado no sistema',
          icon: 'success',
          confirmButtonText: 'Ok'
        }
      )
    }, error => {
      if (error.status === 0) {
        this.connectionError();
        return;
      }

      let errorsMessage: string = this.concatenateErrors(error.error.errors);
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


  isFieldValid(field: string): boolean {
    return !this.clientForm.get(field)!.valid && this.clientForm.get(field)!.touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  private getClient(): void {
    this.clientCPF = String(this.route.snapshot.paramMap.get('cpf'));
    if (this.clientCPF) {
      this.clientService.getClientByCpf(this.clientCPF).subscribe((client: IClient) => {
        this.clientForm.setValue({
          inputCPF: client.cpf,
          inputName: client.nome,
          inputTelephone: client.telefone,
          inputStreet: client.rua,
          inputNumber: client.numero,
          inputZip: client.cep,
          inputIncome: client.rendimentoMensal
        })
      });
    }
  }

  private fromForm(form: any): IClient {
    return {
      cpf: form.inputCPF,
      nome: form.inputName,
      telefone: form.inputTelephone,
      rua: form.inputStreet,
      numero: form.inputNumber,
      cep: form.inputZip,
      rendimentoMensal: form.inputIncome
    };
  }

  private concatenateErrors(errors: string[]): string {
    let str: string = "";
    for (const value of errors) {
      str += value + ' ';
    }
    return str;
  }

  private connectionError(): void {
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
