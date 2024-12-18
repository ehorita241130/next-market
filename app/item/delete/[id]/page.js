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
'use client';//User Component
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const trcLev = 2;//New
const path = 'app/item/delete/_/page';//Added
//======================================================================
const url0 = process.env.NEXT_PUBLIC_URL;//New
const url1A = 'api/item/readsingle';//New
//const url1 = 'http://localhost:3000/api/item/readsingle';
const url1B = 'api/item/delete';//New
//const url2 = 'http://localhost:3000/api/item/delete'
const url2A = `${url0}/${url1A}`;
const url2B = `${url0}/${url1B}`;
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState, useEffect } from 'react'
import { useRouter }           from 'next/navigation' 
import Image                   from 'next/image'   
import useAuth                 from '../../../utils/useAuth'
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function DeleteItem(context){//<1
  if( trcLev >= 2 ){//<2
    console.log(`-- ${path}.DeleteItem()#1A:url2A=\n`, url2A);
    console.log(`-- ${path}.DeleteItem()#1B:url2B=\n`, url2B);
  }//2>
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const loginUserEmail = useAuth();
  //======================================================================
  useEffect(() =>//<2
    {//<3
      //----------------------------------------------------------------------
      async function getSingleItem(){//<4
        const params = await context.params;//New
        const id = params.id;//New
        const response = await fetch(`${url2A}/${id}`, {cache: 'no-store'});
        const jsonData = await response.json();
        const singleItem = jsonData.singleItem;
        if( trcLev >= 2 ){//<5
          console.log(`-- ${path}.DeleteItem()#2:singleItem=`);
          console.dir(singleItem);
        }//5>
        setTitle(singleItem.title);
        setPrice(singleItem.price);
        setImage(singleItem.image);
        setDescription(singleItem.description);
        setEmail(singleItem.email);
      }//4>
      //----------------------------------------------------------------------
      getSingleItem();//Mdf
    },//3>
    [context] 
  );//2>
  //======================================================================
  async function handleSubmit(evt){//<2
    evt.preventDefault() 
    try{//<3
      const params = await context.params;//New
      const id = params.id;//New
      const token1 = localStorage.getItem('token');//New
      const headers1 = 
        { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token1}`
        };
      const body1 = { email: loginUserEmail };
      const ob1 = 
        {
          method: 'DELETE',
          headers: headers1,
          body: JSON.stringify(body1)
        };
      const response = await fetch(`${url2B}/${id}`, ob1);
      const jsonData = await response.json()
      alert(jsonData.message)  
      router.push('/') 
      router.refresh()
    }//3>
    catch(err){//<3
      console.log(`-- ${path}.DeleteItem()#3:err=`); 
      console.dir(err);//Added
      alert('アイテム削除失敗') 
    }//3>
  }//2>
  //======================================================================
  if( loginUserEmail === email ){//<2
    if( trcLev >= 1 ){
      console.log(`-- ${path}.DeleteItem()#4:image=`);
      console.dir(image);
    }
    if( image !== '' ){//<3
      return (
        //======================================================================
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
        //======================================================================
      );   
    }//3>
    else{//<3
      return (
        //======================================================================
        <div>
          <h1>Processing the page....</h1>
        </div>
        //======================================================================
      );
    }//3>
  }//2>
  else{//<2
    return (
      //======================================================================
      <div>
        <h1>権限がありません</h1>
      </div>
      //======================================================================
    );
  }//2>     
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default DeleteItem
