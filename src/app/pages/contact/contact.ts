import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  standalone: false,
})
export class Contact {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendEmail() {
    if (this.contactForm.valid) {
      Swal.fire({
        title: '¿Enviar mensaje?',
        text: '¿Estás seguro de que deseas enviar este correo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = this.contactForm.value;

          emailjs.send(
            environment.emailjs.serviceId,
            environment.emailjs.templateId,
            {
              from_name: formData.email,
              subject: formData.subject,
              message: formData.message,
              reply_to: formData.email,
            },
            environment.emailjs.publicKey
          )
          .then(() => {
            Swal.fire('Enviado', 'Tu mensaje ha sido enviado correctamente.', 'success');
            this.contactForm.reset();
          })
          .catch(err => {
            console.error('Error al enviar el correo:', err);
            Swal.fire('Error', 'No se pudo enviar el mensaje. Inténtalo más tarde.', 'error');
          });
        }
      });
    } else {
      Swal.fire('Campos incompletos', 'Por favor, completa todos los campos correctamente.', 'warning');
    }
  }
}
