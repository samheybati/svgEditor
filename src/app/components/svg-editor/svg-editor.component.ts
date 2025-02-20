import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {AttributesDialogComponent} from '../attributes-dialog/attributes-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LabelsDialogComponent} from '../labels-dialog/labels-dialog.component';
import {ColorPickerDialogComponent} from '../color-picker/color-picker.component';

@Component({
  selector: 'app-svg-editor',
  templateUrl: './svg-editor.component.html',
  styleUrls: ['./svg-editor.component.scss'],
  standalone: false
})
export class SvgEditorComponent {
  @ViewChild('svgContainer', {static: false}) svgContainer!: ElementRef;
  uploadedSVG: any;
  selectedElement: any = null;
  attributes: { name: string; value: string }[] = [];
  previewMode: boolean = false;

  constructor(public dialog: MatDialog) {
  }


  public uploadSVG(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.svgContainer.nativeElement.innerHTML = e.target?.result as string;
        this.uploadedSVG = d3.select(this.svgContainer.nativeElement).select('svg');

        let g = this.uploadedSVG.select('g');
        if (g.empty()) {
          g = this.uploadedSVG.append('g');
          g.html(this.uploadedSVG.html());
          this.uploadedSVG.html('');
          this.uploadedSVG.append(() => g.node());
        }


        this.uploadedSVG.on('click', (event: MouseEvent) => {
          event.stopPropagation();
          const target = d3.select(event.target as SVGElement);

          if (!target.empty() && target.node() !== this.uploadedSVG.node()) {
            this.selectedElement = target;
            this.extractAttributes();
            this.highlightSelectedElement();
          }
        });

        const svgElement = this.svgContainer.nativeElement.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxHeight = '80vh';
          svgElement.style.width = 'auto';
          svgElement.style.objectFit = 'contain';
        }
      };
      reader.readAsText(input.files[0]);
    }
  }

  public extractAttributes(): void {
    if (this.selectedElement) {
      this.attributes = [];
      const elementNode = this.selectedElement.node();
      Array.from(elementNode.attributes).forEach((attr: any) => {
        this.attributes.push({name: attr.name, value: attr.value});
      });
    }
  }

  public showAttributesDialog(): void {
    const dialogRef = this.dialog.open(AttributesDialogComponent, {
      width: '400px',
      data: {attributes: this.attributes},
    });

    dialogRef.afterClosed().subscribe((updatedAttributes) => {
      if (updatedAttributes) {
        updatedAttributes.forEach((attr: { name: string; value: string }) => {
          this.selectedElement.attr(attr.name, attr.value);
        });
      }
    });
  }

  public highlightSelectedElement(): void {
    this.uploadedSVG.selectAll('*').style('stroke', 'none');
    if (this.selectedElement) {
      this.selectedElement.style('stroke', 'blue').style('stroke-width', '10px');
    }
  }

  public changeColor(): void {
    if (this.selectedElement && this.previewMode) {
      const previousColor = this.selectedElement.style('fill');

      const dialogRef = this.dialog.open(ColorPickerDialogComponent, {
        width: '400px',
        height: '400px',
        data: {color: previousColor, previewMode: this.previewMode}
      });

      dialogRef.afterClosed().subscribe((newColor) => {
        if (newColor) {
          this.selectedElement.style('fill', newColor);


        }
      });
    }
  }

  public togglePreview(): void {
    this.previewMode = !this.previewMode;
  }

  public onRightClick(event: MouseEvent): void {
    event.preventDefault();

    const [x, y] = d3.pointer(event, this.uploadedSVG.node());

    let existingLabel = this.uploadedSVG.selectAll('g.svg-label-group').filter(function (this: any) {
      const element = d3.select(this);
      const bbox = element.node().getBBox();
      return bbox.x <= x && bbox.x + bbox.width >= x &&
        bbox.y <= y && bbox.y + bbox.height >= y;
    });

    let newPosition = {x, y};

    if (!existingLabel.empty()) {
      const existingLabelNode = existingLabel.node();
      const bbox = existingLabelNode.getBBox();

      const storedX = existingLabel.attr("data-x");
      const storedY = existingLabel.attr("data-y");

      if (storedX && storedY) {
        newPosition = {
          x: parseFloat(storedX),
          y: parseFloat(storedY),
        };
      } else {
        newPosition = {x: bbox.x, y: bbox.y};
      }
    }


    const dialogRef = this.dialog.open(LabelsDialogComponent, {
      width: '70vw',
      height: '70vh',
      data: {
        position: newPosition,
        existingLabel: existingLabel.empty() ? null : existingLabel.node()
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      let labelGroup: any;
      if (!existingLabel.empty()) {
        labelGroup = existingLabel;
      } else {
        labelGroup = this.uploadedSVG.append('g').attr('class', 'svg-label-group');
      }

      labelGroup.selectAll('*').remove();

      if (result.labelType === 'image') {
        labelGroup.append('image')
          .attr('x', result.position.x)
          .attr('y', result.position.y)
          .attr('width', result.imageSize.width)
          .attr('height', result.imageSize.height)
          .attr('href', result.imageUrl);
      } else {
        labelGroup.append('text')
          .attr('x', result.position.x)
          .attr('y', result.position.y)
          .attr('font-size', result.textSize.fontSize)
          .attr('fill', result.labelColor)
          .attr('dominant-baseline', 'middle')
          .attr('text-anchor', 'middle')
          .text(result.labelText);
      }

      labelGroup.attr("data-x", result.position.x);
      labelGroup.attr("data-y", result.position.y);
    });
  }

}
