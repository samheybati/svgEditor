import {Component, Inject, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-svg-preview-dialog',
  templateUrl: './svg-preview-dialog.component.html',
  styleUrls: ['./svg-preview-dialog.component.scss'],
  standalone: false

})
export class SvgPreviewDialogComponent implements AfterViewInit {
  @ViewChild('svgContainer', {static: false}) svgContainer!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<SvgPreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { svgContent: string }
  ) {
  }

  ngAfterViewInit(): void {
    this.svgContainer.nativeElement.innerHTML = this.data.svgContent;
  }

  onReUpload(): void {
    this.dialogRef.close('reupload');
  }

  onContinue(): void {
    this.dialogRef.close('continue');
  }
}
