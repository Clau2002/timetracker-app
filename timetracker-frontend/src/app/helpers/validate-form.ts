import { FormGroup } from "@angular/forms";

export default class ValidateForm {
    public static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormGroup) {
              this.validateAllFormFields(control);
            } else {
              control?.markAsDirty({ onlySelf: true });
            }
          });
    }
}