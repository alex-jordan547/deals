import { helpers } from '@vuelidate/validators';

export const supportedFileType = (value) => {

  if (!helpers.req(value)) {
    return true;
  }
  const fileType = value.split('.').pop();

  console.log(fileType);
  console.log(value);
  return fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' || fileType === 'gif' || fileType === 'bmp' || fileType === 'svg';

}