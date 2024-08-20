import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCateoryComponent } from './add-edit-cateory.component';

describe('AddEditCateoryComponent', () => {
  let component: AddEditCateoryComponent;
  let fixture: ComponentFixture<AddEditCateoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCateoryComponent]
    });
    fixture = TestBed.createComponent(AddEditCateoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
