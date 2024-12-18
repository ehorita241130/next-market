//堀
//######################################################################
// File: "imgInput.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/components/"
//   "imgInput.js")
// By Horita.
// On (2024 Dec 17).
//######################################################################
'use client';//Added. As Client Component.
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const path = 'app/components/imgInput';//Added
//v Mdf for my setting.
const url = 'https://api.cloudinary.com/v1_1/djqtoasem/image/upload';
//v Added
//const url = 'https://api.cloudinary.com/v1_1/6fs9n32/image/upload';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from 'react';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function ImgInput(props){
  const [imageFile, setImageFile] = useState('');
  //======================================================================
  async function handleClick(){
    try{
      const data = new FormData()
      data.append('file', imageFile)
      data.append('upload_preset', 'my_upload1');//Mdf for my setting.
      //data.append('upload_preset', 'upclpe2')
      data.append('cloud_name','djqtoasem');//Mdf for my setting.
      //data.append('cloud_name','6fs9n32')
      const response= await fetch(`${url}`, {method: 'POST', body: data})
      const jsonData = await response.json()
      await props.setImage(jsonData.url)
      alert('画像アップロード成功')
    }
    catch(err){
      console.log(`-- ${path}.ImgInput()#1:err=`);//Added
      console.dir(err);//Added
      alert('画像アップロード失敗')
    }
  }
  //======================================================================
  return (
    <div className='img-input'>
      <input type='file' 
        onChange={(evt) => setImageFile(evt.target.files[0])}
        accept='image/png, image/jpg'/>
      <button onClick={handleClick} disabled={!imageFile}>
        画像 Upload
      </button>
    </div>
  );
  //======================================================================
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default ImgInput
