import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    service = TestBed.inject(CustomerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve data', () => {
    const mockResponse = {status: 200,message: "Success",data:[{
      id:1,
      name:'จริยา'
    }]};

    const name = 'จริยา';
    service.get(name).subscribe(response => {
      expect(response.status).toBe(200);
      expect(response.message).toEqual('Success');
      expect(response.data.length).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/customer/get');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.name).toBe(name);

    req.flush(mockResponse);
  });

  it("if customer doesn't exist response is empty data", () => {
    const mockResponse = {status: 200,message: "Success",data:[]};
    const name = 'sadasdasdasd';

    service.get(name).subscribe(response => {
      expect(response.status).toBe(200);
      expect(response.message).toEqual('Success');
      expect(response.data.length).toBe(0);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/customer/get');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.name).toBe(name);

    req.flush(mockResponse);
  });


  afterEach(() => {
    httpTestingController.verify();
  });

 
});


