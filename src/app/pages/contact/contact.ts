import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { ThemeService } from '../../services/themeservice';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  standalone: false,
})
export class Contact {
  contactForm: FormGroup;
  darkMode: boolean = false;

  constructor(private fb: FormBuilder, private themeService: ThemeService,
    private translate: TranslateService) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
    this.themeService.darkMode$.subscribe(value => {
      this.darkMode = value;
    });
  }

  sendEmail() {
    if (this.contactForm.valid) {
      // Obtener las traducciones
      const confirmTitle = this.translate.instant('EMAIL.CONFIRM_TITLE');
      const confirmText = this.translate.instant('EMAIL.CONFIRM_TEXT');
      const confirmButton = this.translate.instant('EMAIL.CONFIRM_BUTTON');
      const cancelButton = this.translate.instant('EMAIL.CANCEL_BUTTON');
      const successTitle = this.translate.instant('EMAIL.SUCCESS_TITLE');
      const successText = this.translate.instant('EMAIL.SUCCESS_TEXT');
      const errorTitle = this.translate.instant('EMAIL.ERROR_TITLE');
      const errorText = this.translate.instant('EMAIL.ERROR_TEXT');
      const incompleteTitle = this.translate.instant('EMAIL.INCOMPLETE_TITLE');
      const incompleteText = this.translate.instant('EMAIL.INCOMPLETE_TEXT');

      Swal.fire({
        title: confirmTitle,
        text: confirmText,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#f44336',
        confirmButtonText: confirmButton,
        cancelButtonText: cancelButton
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
            Swal.fire(successTitle, successText, 'success');
            this.contactForm.reset();
          })
          .catch(err => {
            console.error('Error al enviar el correo:', err);
            Swal.fire(errorTitle, errorText, 'error');
          });
        }
      });
    } else {
      const incompleteTitle = this.translate.instant('EMAIL.INCOMPLETE_TITLE');
      const incompleteText = this.translate.instant('EMAIL.INCOMPLETE_TEXT');
      Swal.fire(incompleteTitle, incompleteText, 'warning');
    }
  }
  send2Email() {
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
