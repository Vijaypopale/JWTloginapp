import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../_models";

@Injectable({ providedIn: "root" })
export class UserService {
  URI = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${this.URI}/users`);
  }
}
