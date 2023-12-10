import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListInventoryComponent } from './admin-list-inventory.component';

describe('AdminListInventoryComponent', () => {
  let component: AdminListInventoryComponent;
  let fixture: ComponentFixture<AdminListInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
