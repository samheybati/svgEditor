import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as d3 from 'd3';

@Component({
  selector: 'app-labels-dialog',
  templateUrl: './labels-dialog.component.html',
  styleUrls: ['./labels-dialog.component.css'],
  standalone: false
})
export class LabelsDialogComponent {
  labelType: 'text' | 'image' = 'text';
  labelText: string = '';
  labelColor: string = '#000000';
  imageUrl: string = '';
  imageSize: { width: number; height: number } = {width: 500, height: 500};
  textSize: { fontSize: number } = {fontSize: 100};
  position: { x: number; y: number } = {x: 0, y: 0};

  constructor(
    public dialogRef: MatDialogRef<LabelsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.existingLabel) {

      const existingLabelNode = data.existingLabel;
      const labelGroup = d3.select(existingLabelNode);

      this.labelType = labelGroup.select('image').empty() ? 'text' : 'image';

      if (this.labelType === 'text') {
        this.labelText = labelGroup.select('text').text()
        this.labelColor = labelGroup.select('text').attr('fill') || '#ff0000';
      }

      if (this.labelType === 'image') {
        this.imageUrl = labelGroup.select('image').attr('href') || '';
        this.imageSize = {
          width: parseInt(labelGroup.select('image').attr('width'), 10) || 500,
          height: parseInt(labelGroup.select('image').attr('height'), 10) || 500,
        };
      }

      this.position = data.position || {x: 0, y: 0};

    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    this.dialogRef.close({
      labelType: this.labelType,
      labelText: this.labelText,
      labelColor: this.labelColor,
      imageUrl: this.imageUrl,
      imageSize: this.imageSize,
      textSize: this.textSize,
      position: this.data.position,
    });
  }

  onDelete(): void {
    if (this.data.existingLabel) {
      d3.select(this.data.existingLabel).remove();
    }
    this.dialogRef.close();
  }
}


