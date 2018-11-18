import axios from 'axios';
import { domain } from '../config';

postPicture = (image, token) => {
  const apiUrl = `${domain}/upload`;
  const uri = image.uri;
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  const formData = new FormData();
  const header = {
    'x-access-token' : token,
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  };

  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  
  axios.post(apiUrl, formData, header)
  .then((res)=>{
    alert(JSON.stringify(res));
  })
}

export default postPicture;