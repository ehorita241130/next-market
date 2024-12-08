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
const trcLev = 2;
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import Link from 'next/link';//Added
import Image from 'next/image';//Added
import Header from '../../../components/header';//Added
import Footer from '../../../components/footer';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
async function getSingleItem(id){
  const url = `http://localhost:3000/api/item/readsingle/${id}`;
  const resp = await fetch(url);//Added.
  const jsonData = await resp.json();
  return jsonData;
  //return resp;
}
//**********************************************************************
async function ReadSingleItem(context){
  if( trcLev >= 2 ){
    console.log('-- item/readsingle/page.ReadSingleItem()#1:context=');
    console.dir(context);
  }
  const params = await context.params;
  const id = params.id;
  if( trcLev >= 2 ){
    console.log(`-- item/readsingle/page.ReadSingleItem()#2:id=${id}`);
  }
  const jsonData = await getSingleItem(id);
  const jsonData1 = jsonData.message;
  const jsonData2 =jsonData.singleItem;
  if( trcLev >= 2 ){
    console.log('-- item/readsingle/page.ReadSingleItem()#3:jsonData=');
    console.dir(jsonData);
    console.log('-- item/readsingle/page.ReadSingleItem()#3:jsonData2=');
    console.dir(jsonData2);
  }
  //======================================================================
  if( jsonData2 !== undefined ){
    const jsonData2Str = 
      jsonData2 === undefined ? 'Undefined' : JSON.stringify(jsonData2);
    const id = jsonData2._id;
    const title = jsonData2.title;
    let image = jsonData2.image;
    if( image.substr(0,1) !== '/' ){
      image = '/' + image;
    }
    const price = jsonData2.price;
    const description = jsonData2.description;
    const email = jsonData2.email;
    const link = '/';
    return (
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
    );
  }
  else{
    return (
      <>
        <Header/>
        <h3 style={{color:'red'}}>個別アイテムのページ：</h3>
        <p>id={id}</p>
        <p>Undefined</p>
        <Footer/>
      </>
    );
  }
  //======================================================================
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default ReadSingleItem
