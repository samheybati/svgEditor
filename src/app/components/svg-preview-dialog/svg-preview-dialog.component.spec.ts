import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SvgPreviewDialogComponent} from './svg-preview-dialog.component';

describe('SvgPreviewDialogComponent', () => {
  let component: SvgPreviewDialogComponent;
  let fixture: ComponentFixture<SvgPreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgPreviewDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SvgPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
