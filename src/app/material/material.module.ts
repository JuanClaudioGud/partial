import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  exports: [
    MatProgressSpinnerModule,
  	MatIconModule,
  	MatButtonModule,
  	MatToolbarModule,
  	MatSidenavModule,
  	MatListModule,
  	MatCardModule,
  	MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
  	MatSnackBarModule,
    MatTableModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MatBottomSheetModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    MatBadgeModule,
    MatButtonToggleModule,
  ],
  providers: [
    { 
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, 
      useValue: { 
        useUtc: true,
      },
    },
  ],
})
export class MaterialModule { }