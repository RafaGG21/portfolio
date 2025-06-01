import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'popup-description',
  standalone: false,
  templateUrl: './popup-description.html',
  styleUrl: './popup-description.css'
})
export class PopupDescription {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, description: string }) {}
}
