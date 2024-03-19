
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuotationService } from './quotation.service';


describe('QuotationService', () => {
  let service: QuotationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuotationService]
    });
    service = TestBed.inject(QuotationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("insert success", () => {
    const mockResponse = {
      affectedRows: 1,
      changedRows: 0,
      fieldCount: 0,
      info: "",
      insertId: 5,
      serverStatus: 2,
      warningStatus: 0
    };

    const insurance = {
      annualizedModalPremium: 30000,
      baseAnnualPremium: 30000,
      baseSumAssured: 921263,
      customerId: 1,
      modalPremium: 30000,
      paymentFrequencyCd: "YEARLY",
      planCode: "T11A20",
      premiumPayingTerm: 5,
      productFamilyCd: "TERM",
      productId: "ECOMMBIG3",
      productTerm: 5,
      productTypeCd: "PLAN",
      selected: true
    };

    service.insert(insurance).subscribe(response => {
      expect(JSON.parse(JSON.stringify(response)).insertId).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/quotation/store');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.annualizedModalPremium).toBe(insurance.annualizedModalPremium);
    expect(req.request.body.baseAnnualPremium).toBe(insurance.baseAnnualPremium);
    expect(req.request.body.baseSumAssured).toBe(insurance.baseSumAssured);
    expect(req.request.body.customerId).toBe(insurance.customerId);
    expect(req.request.body.modalPremium).toBe(insurance.modalPremium);
    expect(req.request.body.paymentFrequencyCd).toBe(insurance.paymentFrequencyCd);
    expect(req.request.body.planCode).toBe(insurance.planCode);
    expect(req.request.body.premiumPayingTerm).toBe(insurance.premiumPayingTerm);
    expect(req.request.body.productFamilyCd).toBe(insurance.productFamilyCd);
    expect(req.request.body.productId).toBe(insurance.productId);
    expect(req.request.body.productTerm).toBe(insurance.productTerm);
    expect(req.request.body.productTypeCd).toBe(insurance.productTypeCd);
    expect(req.request.body.selected).toBe(insurance.selected);

    req.flush(mockResponse);
  });
 


  afterEach(() => {
    httpTestingController.verify();
  });

 
});



