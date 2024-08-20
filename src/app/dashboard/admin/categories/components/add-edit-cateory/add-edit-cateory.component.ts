import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-cateory',
  templateUrl: './add-edit-cateory.component.html',
  styleUrls: ['./add-edit-cateory.component.scss']
})
export class AddEditCateoryComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditCateoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
