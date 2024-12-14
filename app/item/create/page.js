//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/item/create/"
//   "page.js")
// By Horita.
// On (2024 Dec 1).
//######################################################################
'use client'
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const trcLev = 2;//New
//======================================================================
const url0 = process.env.NEXT_PUBLIC_URL;//New
const url1 = 'api/item/create';//New
const url2 = `${url0}/${url1}`;//New
//const url1 = 'http://localhost:3000/api/item/create';
//======================================================================
const path = 'app/item/create/page';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from 'react'
import { useRouter } from 'next/navigation' 
import useAuth from '../../utils/useAuth';
import Header from '../../components/header';//Added
import Footer from '../../components/footer';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function CreateItem(){//<1
  if( trcLev >= 2 ){//<2
    console.log(`-- ${path}.CreateItem()#1:url2=\n`, url2);
  }//2>
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');//Added
  //
  const router = useRouter();
  //const loginUserEmail = false;//Tmp
  const loginUserEmail = useAuth();
  //======================================================================
  if( trcLev >= 2 ){//<2
    if( loginUserEmail === undefined ){//<3
      console.log(`-- ${path}.CreateItem()#1:loginUserEmail is undefined`);
    }//3>
    else if( loginUserEmail === null ){//<3
      console.log(`-- ${path}.CreateItem()#1:loginUserEmail is null`);
    }//3>
    else if( loginUserEmail === '' ){//<3
      console.log(`-- ${path}.CreateItem()#1:loginUserEmail is empty`);
    }//3>
    else{//<3
      console.log(`-- ${path}.CreateItem()#1:loginUserEmail=${loginUserEmail}`);
    }//3>
  }//2>
  //======================================================================
  async function handleSubmit(evt){//<2
    evt.preventDefault() 
    try{//<3
      const token1 = localStorage.getItem('token');
      if( trcLev >= 2 ){
        console.log(`-- ${path}.CreateItem()#2:token1=`);
        console.dir(token1);
      }
      const headers1 =
        { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token1}`
        };
      const email1 = loginUserEmail? loginUserEmail : email;
      const body1 =
        {
          title: title,
          price: price,
          image: image,
          description: description,
          email: email1
        };
      const ob1 =
        {
          method: 'POST',
          headers: headers1,
          body: JSON.stringify(body1)
        };
      const response = await fetch(url2, ob1);//New
      //const response = await fetch(url1, ob1);
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push('/');
      router.refresh();
    }//3>
    catch(err){//<3
      console.log(`-- ${path}.CreateItem()#3:err=`);
      console.dir(err);
      alert('アイテム作成失敗') 
    }//3>
  }//2>
  //======================================================================
  if( loginUserEmail ){//<2. When loginUserEmail is OK (NOT empty/false).
    return (
      <div>
        <Header/>
        <h1 className='page-title'>アイテム作成1</h1>
        <p>loginUserEmail：{loginUserEmail}</p>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} 
            type='text' name='title' placeholder='アイテム名' size='70' required/><br/>
          <input value={price} onChange={(e) => setPrice(e.target.value)} 
            type='text' name='price' placeholder='価格' size='70' required/><br/>
          <input value={image} onChange={(e) => setImage(e.target.value)} 
            type='text' name='image' placeholder='画像' size='70' required/><br/>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} 
            name='description' rows={15} placeholder='商品説明' cols='70' required>
          </textarea><br/>
          <button>作成</button>
        </form>
        <Footer/>
      </div>
    )
  }//2>
  else{//<2. When loginUserEmail is empty/false.
    return (
      <div>
        <Header/>
        <h1 className='page-title'>アイテム作成2</h1>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} 
            type='text' name='title' placeholder='アイテム名' size='70' required/><br/>
          <input value={price} onChange={(e) => setPrice(e.target.value)} 
            type='text' name='price' placeholder='価格' size='70' required/><br/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} 
            type='text' name='email' placeholder='email' size='70' required/><br/>
          <input value={image} onChange={(e) => setImage(e.target.value)} 
            type='text' name='image' placeholder='画像' size='70' required/><br/>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} 
            name='description' rows={15} placeholder='商品説明' cols='70' required>
          </textarea><br/>
          <button>作成</button>
        </form>
        <Footer/>
      </div>
    )
  }//2>
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default CreateItem
