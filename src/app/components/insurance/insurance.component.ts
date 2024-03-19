import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { gender, insurancePackage, paymentFrequency } from 'src/app/models/dropdown';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';
import * as moment from 'moment';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { forkJoin, switchMap } from 'rxjs';
import { QuotationService } from 'src/app/services/quotation/quotation.service';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {

  insuranceForm!: FormGroup;
  result: string = '';



  genders: gender[] = [
    {id: 1, code: 'MALE',view: 'male'},
    {id: 2, code: 'FEMALE',view: 'female'}
  ];

  paymentFrequencys: paymentFrequency[] = [
    {id: 1, code: 'YEARLY',view: 'รายปี'},
    {id: 2, code: 'HALFYEARLY',view: 'รายครึ่งปี'},
    {id: 3, code: 'QUARTERLY',view: 'ราย 3 เดือน'},
    {id: 4, code: 'MONTHLY',view: 'รายเดือน'}
  ];

  packages: insurancePackage[] = [
    {id: 1, code: 'T11A20',view: 'package 1 (benefit 200K)'},
    {id: 2, code: 'T11A50',view: 'package 2 (benefit 500K)'},
    {id: 3, code: 'T11AM1',view: 'package 3 (benefit 1M)'}
  ];

 

  constructor(
    private fb: FormBuilder,
    private insuranceService: InsuranceService,
    private customerService: CustomerService,
    private quotationService: QuotationService,
    ) {

    this.initForm();
   }

   
   initForm(): void{
    this.insuranceForm = this.fb.group({
      name: '',
      genderCd: '',
      dob: '',
      planCode: '',
      premiumPerYear: 0,
      saPerYear: 0,
      paymentFrequency: '',
    });
   }

   setupFormValue() {
    const { dob, ...values } = this.insuranceForm.value;
    this.formatDob(dob);
    this.removeFormValueIsNull(values,'saPerYear');
    return {dob: this.formatDob(dob), ...values};
   }




   onSubmit(){

      const formValue = this.setupFormValue();

      const observable = forkJoin({
        customer: this.customerService.get(formValue.name),
        insurance: this.insuranceService.getProduct(formValue)
      });
    
      observable.pipe(
        switchMap(({ customer, insurance }) => {
            
            if(customer.data.length <= 0) return [];
            
            const customerId = customer.data[0].id;
            
            const productList = this.getValueObject(insurance,'quotationProductList')[0];
            const quotation = { customerId: customerId, ...productList };

            console.log('quotation : ',quotation);
            

            this.result = this.setResultView(formValue.name,productList.baseSumAssured);
            
            return this.quotationService.insert(quotation);
      
        })
      )
      .subscribe({
        next:(value) => console.log(value),
        
        complete: () => console.log('Inserted!!')
      });
    
   }

   setResultView(name: string, baseSumAssured: number): string{
    return`${name} ได้ทุนประกัน : ${baseSumAssured}`
   }

   getValueObject(obj: object,propName: string){
    return JSON.parse(JSON.stringify(obj))[propName];
   }

   removeFormValueIsNull(form: any, prop: string): void {
    if (form[prop] === 0 || form[prop] === null) delete form[prop];
   }



   formatDob(dob: string): string{
    return moment(dob).format('YYYY-MM-DD');
   }

 

  ngOnInit() { }


}
