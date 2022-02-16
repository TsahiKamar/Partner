import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerIdentifyComponent } from './customer-identify.component';

describe('CustomerIdentifyComponent', () => {
  let component: CustomerIdentifyComponent;
  let fixture: ComponentFixture<CustomerIdentifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerIdentifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerIdentifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
