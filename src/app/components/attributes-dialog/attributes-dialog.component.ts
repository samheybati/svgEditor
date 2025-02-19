import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-attributes-dialog',
  templateUrl: './attributes-dialog.component.html',
  styleUrl: './attributes-dialog.component.css',
  standalone: false
})
export class AttributesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AttributesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { attributes: { name: string; value: string }[] }
  ) {
  }

  onSave(): void {
    this.dialogRef.close(this.data.attributes);
  }
}
