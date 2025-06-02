import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

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

          // Aquí va tu lógica de envío (EmailJS, API, etc.)
          console.log('Mensaje enviado:', formData);
          emailjs.send('service_id', 'template_id', {
            from_name: formData.email,
            subject: formData.subject,
            message: formData.message,
          }, 'public_key')
          .then(res => Swal.fire('Enviado', 'Tu mensaje ha sido enviado correctamente.', 'success'))
          .catch(err => console.log('Error al enviar'));
          this.contactForm.reset();
        }
      });
    }
  }

}
