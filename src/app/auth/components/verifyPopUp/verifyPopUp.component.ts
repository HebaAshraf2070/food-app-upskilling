import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-verifyPopUp',
  templateUrl: './verifyPopUp.component.html',
  styleUrls: ['./verifyPopUp.component.css']
})
export class VerifyPopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VerifyPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
