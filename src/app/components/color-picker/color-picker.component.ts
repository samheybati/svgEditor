import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-color-picker-dialog',
  template: `
    <h2 mat-dialog-title>Change Color</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="mat-mdc-dialog-content">
        <mat-label>Select Color</mat-label>
        <input matInput type="color" [(ngModel)]="selectedColor"/>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="saveColor()">OK</button>
    </mat-dialog-actions>
  `,
  standalone: false
})
export class ColorPickerDialogComponent {
  selectedColor: string;

  constructor(
    public dialogRef: MatDialogRef<ColorPickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedColor = data.color || '#ff0000';
  }

  saveColor(): void {
    this.dialogRef.close(this.selectedColor);
  }
}
