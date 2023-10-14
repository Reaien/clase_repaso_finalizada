import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditZooPage } from './edit-zoo.page';

describe('EditZooPage', () => {
  let component: EditZooPage;
  let fixture: ComponentFixture<EditZooPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditZooPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
