import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFAQsComponent } from './list-faqs.component';

describe('ListFAQsComponent', () => {
  let component: ListFAQsComponent;
  let fixture: ComponentFixture<ListFAQsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFAQsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFAQsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
