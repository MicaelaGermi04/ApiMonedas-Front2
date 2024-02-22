import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';
import { generarMensajeError, generarMensajeExito } from 'src/app/Helpers/messages';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
   userService= inject(UserService);
   auth= inject(AuthService);

  @Output() close = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() user: User = {
    id: 0,
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    subscriptionId: 0
  };

  onSubmit(){
    if(this.user.id){
       this.editUser();
    }
  }

  async editUser(){ 
    const res = await this.userService.editUser(this.user);
    if(res){
      generarMensajeExito('Usuario editado exitosamente');
      this.refresh.emit();
    }else{
      generarMensajeError('Error editando el usuario');
    }
  }
}
