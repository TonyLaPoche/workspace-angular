import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdresseComponent } from './form-adresse.component';

describe('FormAdresseComponent', () => {
  let component: FormAdresseComponent;
  let fixture: ComponentFixture<FormAdresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAdresseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
