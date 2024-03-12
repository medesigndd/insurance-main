import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { gender, insurancePackage, paymentFrequency } from 'src/app/models/dropdown';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';
import * as moment from 'moment';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {

  insuranceForm!: FormGroup;

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
    private insuranceService: InsuranceService
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


   onSubmit(){
    const { ...formValue } = this.insuranceForm.value;

    this.removeFormValueIsNull(formValue,'saPerYear');
    this.insuranceService.getProduct({ dob: this.formatDob(formValue.dob), ...formValue }).subscribe((res) => {
      console.log(res);
    });
    
   }

   removeFormValueIsNull(form: any, prop: string): void {
    if (form[prop] === 0 || form[prop] === null) delete form[prop];
   }



   formatDob(dob: string): string{
    return moment(dob).format('YYYY-MM-DD');
   }

 

  ngOnInit() { }

}
