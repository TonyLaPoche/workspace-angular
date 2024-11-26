import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormUserComponent } from './search-form-user.component';

describe('SearchFormUserComponent', () => {
  let component: SearchFormUserComponent;
  let fixture: ComponentFixture<SearchFormUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFormUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFormUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
