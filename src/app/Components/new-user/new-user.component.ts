import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { RegisterData, User } from 'src/app/Interfaces/user';
import { generarMensajeError, generarMensajeExito } from 'src/app/Helpers/messages';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  userService = inject(UserService);
  auth = inject(AuthService);

  @Output() close = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() user: User = {
    id: 0,
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    subscriptionId: 0
  }

  userForCreation: RegisterData = {
    userName: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  }

 
  async addUser() {
    const res = await this.auth.register(this.userForCreation);
    if (res) {
      console.log(res);
      generarMensajeExito('Usuario creado exitosamente');
      this.refresh.emit();
    } else {
      generarMensajeError('No se ha creado el usuario');
    }
  }
}
