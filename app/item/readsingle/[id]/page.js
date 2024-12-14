//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/item/readsingle/[id]/"
//   "page.js")
// By Horita.
// On (2024 Dec 1).
//######################################################################
// server component
const trcLev = 1;
//======================================================================
const url0 = process.env.NEXT_PUBLIC_URL;//New
const url1 = 'api/item/readsingle';//New
//const url2 = '/api/item/readsingle';//New
//const url2 = 'http:/api/item/readsingle';//New
const url2 = `${url0}/${url1}`;
//const url1 = 'http://localhost:3000/api/item/readsingle';//Added
//const url = `${url2}/${id}`;//Mdf
//const url = `${url1}/${id}`;//Mdf
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import Link from 'next/link';//Added
import Image from 'next/image';//Added
import Header from '../../../components/header';//Added
import Footer from '../../../components/footer';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
async function getSingleItem(id){
  const url = `${url2}/${id}`;//Mdf
  const resp = await fetch(url);//Added.
  const jsonData = await resp.json();
  return jsonData;
  //return resp;
}
//**********************************************************************
async function ReadSingleItem(context){//<1
  if( trcLev >= 2 ){//<2
    console.log('-- app/item/readsingle/_/page.ReadSingleItem()#1:context=');
    console.dir(context);
  }//2>
  const params = await context.params;
  const id = params.id;
  const url = `${url2}/${id}`;//Mdf
  if( trcLev >= 1 ){//<2
    console.log(`-- app/item/readsingle/_/page.ReadSingleItem()#2:id=${id}`);
  }//2>
  const jsonData = await getSingleItem(id);
  const jsonData1 = jsonData.message;
  const jsonData2 =jsonData.singleItem;
  if( trcLev >= 2 ){//<2
    console.log('-- app/item/readsingle/_/page.ReadSingleItem()#3:jsonData=');
    console.dir(jsonData);
    console.log('-- app/item/readsingle/_/page.ReadSingleItem()#3:jsonData2=');
    console.dir(jsonData2);
  }//2>
  //======================================================================
  if( jsonData2 !== undefined ){//<2. When the specified data is present.
    const jsonData2Str = 
      jsonData2 === undefined ? 'Undefined' : JSON.stringify(jsonData2);
    const id = jsonData2._id;
    const title = jsonData2.title;
    let image = jsonData2.image;
    if( image.substr(0,1) !== '/' ){//<3
      image = '/' + image;
    }//3>
    const price = jsonData2.price;
    const description = jsonData2.description;
    const email = jsonData2.email;
    const link = '/';
    return (
      //======================================================================
      <>
        <Header/>
        <h3 style={{color:'red'}}>個別アイテムのページ：</h3>
        <p>Id：{id}</p>
        <p>Title：{title}</p>
        <p>Price：{price}</p>
        <p>Email：{email}</p>
        <p>Description：{description}</p>
        <p>Image：{`"${image}"`}</p>
        <Image src={image} width={750} height={500} alt='item-image' priority/>
        {/*<img src={image} height='100ex'/>*/}
        <p>Link：<Link href={`${link}`}>Top-page</Link></p>
        <Footer/>
      </>
      //======================================================================
    );
  }//2>
  else{//<2. When the specified data is NOT present.
    return (
      //======================================================================
      <>
        <Header/>
        <h3 style={{color:'red'}}>個別アイテムのページ：</h3>
        <p>id={id}</p>
        <p>Undefined</p>
        <Footer/>
      </>
      //======================================================================
    );
  }//2>
  //======================================================================
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default ReadSingleItem
