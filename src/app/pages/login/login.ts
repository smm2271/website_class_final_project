import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})


export class Login {
  user_name: string = "";
  password: string = "";
  submitLogin = () => {
    if (this.user_name === "user" && this.password === "password") {
      alert("登入成功");
    } else {
      alert("登入失敗");
    }
  }
}
