import {AbstractControl} from '@angular/forms';
/**
 * Created by bartek on 4/4/17.
 */
export const passwordMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const password = control.get('password');
  const passwordConfirm = control.get('reenterPassword');

  //
  // if (!password || !passwordConfirm) return null;
  // if (password.value === passwordConfirm.value) {
  //   return null;
  // }
  // else{
  //   return { nomatch: true };
  // }

  if (!password || !passwordConfirm) return null;
  return password.value === passwordConfirm.value ? null : { nomatch: true };
};
