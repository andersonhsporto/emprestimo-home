import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IClient} from "../interface/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  endpoint = 'clientes';
  api = environment.api;

  constructor(private http: HttpClient) {
  }

  getAllClients() {
    return this.http.get<IClient[]>(this.api + this.endpoint);
  }

  getClientByCpf(cpf: string) {
    return this.http.get<IClient>(this.api + this.endpoint + '/' + cpf);
  }

  createClient(client: IClient) {
    return this.http.post(this.api + this.endpoint, client);
  }

  updateClient(client: IClient) {
    return this.http.put(this.api + this.endpoint, client);
  }

  deleteClient(cpf: string) {
    return this.http.delete(this.api + this.endpoint + '/' + cpf);
  }
}
