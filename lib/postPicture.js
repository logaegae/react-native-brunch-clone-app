import { domain } from '../config';

exports.newBgPhoto = (image, token) => {
  const apiUrl = `${domain}/api/upload/newBgPhoto`;
  const uri = image.uri;
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1].split("?")[0];
  const formData = new FormData();

  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  
  const options = {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'x-access-token' : token
    },
  };
  return fetch(apiUrl, options);
}