import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InviteCounterpartiesComponent } from './invite-counterparties/invite-counterparties.component';
import { SelectCounterpartiesComponent } from './select-counterparties/select-counterparties.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CounterpartyInfoComponent } from './counterparty-info/counterparty-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CounterpartyGroupsPipe } from './shared/pipes/counterparty-groups/counterparty-groups.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxStatusPipe } from './shared/pipes/checkbox-status/checkbox-status.pipe';
import { IdsPipe } from './shared/pipes/ids/ids.pipe';
import { ExpandingPanelComponent } from './expanding-panel/expanding-panel.component';
import { CamelCasePipe } from './shared/pipes/camel-case/camel-case.pipe';
import { MatSelectModule } from '@angular/material/select';
import { SortSelectComponent } from './sort-select/sort-select.component';
import { SortValuesPipe } from './shared/pipes/sort-values/sort-values.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PictureComponent } from './picture/picture.component';
import { CounterpartyPreviewComponent } from './counterparty-preview/counterparty-preview.component';
import { SelectionComponent } from './selection/selection.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InviteCounterpartiesComponent,
    SelectCounterpartiesComponent,
    CounterpartyInfoComponent,
    CounterpartyGroupsPipe,
    CheckboxComponent,
    CheckboxStatusPipe,
    IdsPipe,
    ExpandingPanelComponent,
    CamelCasePipe,
    SortSelectComponent,
    SortValuesPipe,
    PictureComponent,
    CounterpartyPreviewComponent,
    SelectionComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    HttpClientModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
