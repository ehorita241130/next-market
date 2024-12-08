//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/item/delete/[id]/"
//   "page.js")
// By Horita.
// On (2024 Dec 2).
//######################################################################
'use client'
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const trcLev = 1;//New
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' 
import Image from 'next/image'   
import useAuth from '../../../utils/useAuth'
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const url1 = 'http://localhost:3000/api/item/readsingle';
const url2 = 'http://localhost:3000/api/item/delete'
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const DeleteItem = (context) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()
  const loginUserEmail = useAuth() 
  useEffect(() => {
    //----------------------------------------------------------------------
    async function getSingleItem(){
      const params = await context.params;//New
      const id = params.id;//New
      const response = await fetch(`${url1}/${id}`, {cache: 'no-store'});
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      if( trcLev >= 2 ){
        console.log('-- app/item/delete/_/page.DeleteItem()#1:singleItem=');
        console.dir(singleItem);
      }
      setTitle(singleItem.title)
      setPrice(singleItem.price)
      setImage(singleItem.image)
      setDescription(singleItem.description)
      setEmail(singleItem.email) 
    }  
    //----------------------------------------------------------------------
    getSingleItem();//Mdf
  }, [context] );
  //======================================================================
  async function handleSubmit(e){
    e.preventDefault() 
    try{
      const params = await context.params;//New
      const id = params.id;//New
      const token1 = localStorage.getItem('token');//New
      const headers1 = 
        { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token1}`
        };
      const body1 =
        {
          email: loginUserEmail 
        };
      const ob1 = 
        {
          method: 'DELETE',
          headers: headers1,
          body: JSON.stringify(body1)
        };
      const response = await fetch(`${url2}/${id}`, ob1);
      const jsonData = await response.json()
      alert(jsonData.message)  
      router.push('/') 
      router.refresh()
    }
    catch(err){
      console.log('err='); console.dir(err);//Added
      alert('アイテム削除失敗') 
    }
  }
  //======================================================================
  if( loginUserEmail === email ){
    if( trcLev >= 1 ){
      console.log('-- app/item/delete/_/page.DeleteItem()#1:image=');
      console.dir(image);
    }
    if( image !== '' ){
      return (
        <div>
          <h1 className='page-title'>アイテム削除：</h1>
          <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
            <Image src={image} width={750} height={500} alt='item-image' priority/>
            <h3>¥{price}</h3>
            <p>{description}</p>
            <button>削除</button>
          </form>
        </div>
      );   
    }
    else{
      return (
        <h1>Processing the page....</h1>
      );
    }
  }
  else{                 
    return (
      <h1>権限がありません</h1>
    );
  }     
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default DeleteItem
