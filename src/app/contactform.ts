import { FormControl, FormGroup } from "@angular/forms";

export class InvoiceForm extends FormGroup{
    constructor() {
        super({
            description : new FormControl(null),
          rate : new FormControl(null),
          quantity : new FormControl(null),
          amount : new FormControl(null),
          tax : new FormControl(null)
        })
    }
}