import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';
import {AddSiteComponent} from './add-site.component';
import {ToastrModule} from 'ngx-toastr';
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {RouterTestingModule} from '@angular/router/testing';
import {EntityService} from 'src/app/service/entity.service';
import {HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {SiteCoordinatorModule} from '../../site-coordinator.module';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {SitesModule} from '../sites.module';
import {LocationService} from '../../location/shared/location.service';
import {SitesService} from '../shared/sites.service';
import * as expectedResults from 'src/app/entity/mockStudiesData';
import {DebugElement} from '@angular/core';

describe('AddSiteComponent', () => {
  let component: AddSiteComponent;
  let fixture: ComponentFixture<AddSiteComponent>;
  let addSite: DebugElement;
  let cancelSite: DebugElement;

  beforeEach(async(async () => {
    const sitesServiceSpy = jasmine.createSpyObj<SitesService>('SitesService', {
      add: of(expectedResults.expectedSiteResponse),
    });

    await TestBed.configureTestingModule({
      declarations: [AddSiteComponent],
      imports: [
        SiteCoordinatorModule,
        BrowserAnimationsModule,
        SitesModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        ModalModule.forRoot(),
        ToastrModule.forRoot({
          positionClass: 'toast-top-center',
          preventDuplicates: true,
          enableHtml: true,
        }),
      ],
      providers: [
        EntityService,
        LocationService,
        BsModalService,
        {provide: SitesService, useValue: sitesServiceSpy},
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddSiteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        addSite = fixture.debugElement.query(By.css('[name="add"]'));
        cancelSite = fixture.debugElement.query(By.css('[name="cancel"]'));
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get location list for dropdown and check service is called ', fakeAsync(() => {
    const spyobj = spyOn(component, 'getLocation');
    component.getLocation(expectedResults.expectedStudyId.id);
    fixture.detectChanges();
    expect(spyobj).toHaveBeenCalledTimes(1);
  }));

  it('should click on Add and check service is called', fakeAsync(() => {
    const addSpy = spyOn(component, 'add');
    const addButton = addSite.nativeElement as HTMLInputElement;
    addButton.click();
    expect(addSpy).toHaveBeenCalledTimes(1);
  }));

  it('should click on cancel button and check service is called', fakeAsync(() => {
    const cancelSpy = spyOn(component, 'closeModal');
    const cancelButton = cancelSite.nativeElement as HTMLInputElement;
    cancelButton.click();
    expect(cancelSpy).toHaveBeenCalledTimes(1);
  }));
});
