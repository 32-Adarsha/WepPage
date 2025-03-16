import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigInfoComponent } from './big-info.component';

describe('BigInfoComponent', () => {
  let component: BigInfoComponent;
  let fixture: ComponentFixture<BigInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
