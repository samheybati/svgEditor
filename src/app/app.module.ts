import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SvgEditorComponent} from './components/svg-editor/svg-editor.component';
import {AppRoutingModule} from './app-routing.module';
import {MatToolbar} from '@angular/material/toolbar';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {AttributesDialogComponent} from './components/attributes-dialog/attributes-dialog.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {LabelsDialogComponent} from './components/labels-dialog/labels-dialog.component';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {ColorPickerDialogComponent} from './components/color-picker/color-picker.component';

@NgModule({
  declarations: [AppComponent, SvgEditorComponent, AttributesDialogComponent, LabelsDialogComponent, ColorPickerDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatCard,
    MatCardContent,
    MatIcon,
    MatButton,
    MatDialogContent,
    MatDialogActions,
    MatInput,
    MatDialogTitle,
    MatLabel,
    MatFormField,
    FormsModule,
    MatCardHeader,
    MatButtonToggle,
    MatButtonToggleGroup,
    BrowserAnimationsModule

  ],
  providers: [provideAnimations()],

  bootstrap: [AppComponent]
})
export class AppModule {
}
