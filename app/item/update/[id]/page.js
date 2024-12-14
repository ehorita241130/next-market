//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/item/update/[id]/"
//   "page.js")
// By Horita.
// On (2024 Dec 2).
//######################################################################
'use client'
//**********************************************************************
const url0 = process.env.NEXT_PUBLIC_URL;//New
const url1A = 'api/item/readsingle';//New
//const url1 = 'http://localhost:3000/api/item/readsingle';//New
const url1B = 'api/item/update';//New
//const url2 = 'http://localhost:3000/api/item/update';//New
const url2A = `${url0}/${url1A}`;//New
const url2B = `${url0}/${url1B}`;//New
//**********************************************************************
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' 
import useAuth from '../../../utils/useAuth'
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function UpdateItem(context){
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  //======================================================================
  const router = useRouter();
  const loginUserEmail = useAuth();
  useEffect( 
    () => {
      async function getSingleItem(){
        const params = await context.params;//New
        const id = params.id;//New
        const response = await fetch(`${url2A}/${id}`, {cache: 'no-store'});
        //const response = await fetch(`${url1}/${id}`, {cache: 'no-store'});
        const jsonData = await response.json();
        const singleItem = jsonData.singleItem;
        setTitle(singleItem.title);
        setPrice(singleItem.price);
        setImage(singleItem.image);
        setDescription(singleItem.description);
        setEmail(singleItem.email);
      }
      getSingleItem();//New
    }, [context] );
  //======================================================================
  async function handleSubmit(e){
    e.preventDefault() 
    try{
      const params = await context.params;//New
      const id = params.id;//New
      const headers1 =
        { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        };//New
      const body1 = 
        {
          title: title,
          price: price,
          image: image,
          description: description,
          email: loginUserEmail    
        };//New
      const ob1 = 
        {
          method: 'PUT',
          headers: headers1,
          body: JSON.stringify(body1)
        };//New
      const response = await fetch(`${url2B}/${id}`, ob1);
      //const response = await fetch(`${url2}/${id}`, ob1);
      const jsonData = await response.json();
      alert(jsonData.message)  
      router.push('/') 
      router.refresh()
    }
    catch(err){
      console.log('-- item/update/_/page.UpdateItem()#1:err=');//Added
      console.dir(err);//Added
      alert('アイテム編集失敗') 
    }
  }
  //======================================================================
  if( loginUserEmail === email ){ 
    return (
      <div>
        <h1 className='page-title'>アイテム編集：</h1>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} 
            type='text' name='title' placeholder='アイテム名' size='70' required/><br/>
          <input value={price} onChange={(e) => setPrice(e.target.value)} 
            type='text' name='price' placeholder='価格' size='70' required/><br/>
          <input value={image} onChange={(e) => setImage(e.target.value)} 
            type='text' name='image' placeholder='画像' size='70' required/><br/>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} 
            name='description' rows={15} cols={70}placeholder='商品説明' required>
          </textarea><br/>
          <button>編集</button>
        </form>
      </div>
    );
  }
  else{                            
    return (
      <>
        <h1>アイテム編集：</h1>
        <p style={{color:'red'}}>作成者ではないので変更の権限がありません</p>
      </>
    );
  }  
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default UpdateItem
