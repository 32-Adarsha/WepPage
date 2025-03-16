import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigCertificateComponent } from './big-certificate.component';

describe('BigCertificateComponent', () => {
  let component: BigCertificateComponent;
  let fixture: ComponentFixture<BigCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
