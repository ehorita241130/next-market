//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/"
//   "page.js")
// By Horita.
// On (2024 Nov 30).
//######################################################################
'use client'
//**********************************************************************
//This is a server component.
const trcLev = 1;
//const trcLev = 2;
const mode = 0;
//======================================================================
const url0 = process.env.NEXT_PUBLIC_URL;//New
const url1 = 'api/item/readall';//New
const url2 = `/${url1}`;//New for test.
//const url2 = '/api/item/readall';//New for test.
//const url2 = './api/item/readall';//New for test.
//const url2 = `${url0}/${url1}`;//New
//const url = 'http://localhost:3000/api/item/readall';
//======================================================================
const path = 'app/item/readall/page';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import Link   from 'next/link';//Added
import Image  from 'next/image';//Added
import Header from '../../components/header';//Added
import Footer from '../../components/footer';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
async function getAllItems(){
  const response = await fetch(url2);//Mdf
  //const response = await fetch(url);
  {cache: "no-store"};//Added
  const jsonData = await response.json();
  if( trcLev >= 2 ){
    console.log(`-- ${path}.getAllItems()#1:jsonData=`); 
    console.dir(jsonData);//Tracing
  }
  return jsonData;//Added
}//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//**********************************************************************
//v This WORKS for for [npm run start]
function Page(){//<1
  //======================================================================
  async function handleSubmit(evt){//<2
    evt.preventDefault() 
    const response = await fetch(url2);//Mdf
    //const response = await fetch(url);
    let items = await getAllItems();
    let message = items.message;
    let items1 = items.allItems;
    let lgt1 = items1.length;
    if( mode === 1 ){
      alert(`-- ${path}.handleSubmit()#1:lgt1=${lgt1}.`);
    }
    let elmData = document.getElementById('data');
    let htmlText = '';
    //----------------------------------------------------------------------
    for(let k=0; k < lgt1; ++k){//______________________________BGN <LOOP.1>
      let item1 = items1[k];
      let id1 = item1._id;
      let link1 = `/item/readsingle2/${id1}`;//New
      //let link1 = `/item/readsingle/${id1}`;
      let title1 = item1.title;
      let description = item1.description;
      let description1 = description.substr(0,60)+' ....';//Mdf
      let email1 = item1.email;
      let price1 = item1.price;
      let image1 = item1.image;
      if( image1.substr(0,1) !== '/' ){
        image1 = '/' + image1;
      }
      htmlText +=
        `<div key=${k+1}>\n`+
          `<p>#${k+1}，Id：${id1}，<a href=${link1}>Link for details</a></p>\n`+
          `<p>Title：${title1}，Price：${price1}円，Email：${email1}</p>\n`+
          `<p>Description：${description1}</p>\n`+
          `<p>Image："${image1}"</p>\n`+
          `<p><Image src=${image1} width=150 height=100 alt='item-image' priority/></p>\n`+
          `<hr/>\n`+
        `</div>\n`;
    }//_________________________________________________________END <LOOP.1>
    elmData.innerHTML = htmlText;//New
  }//2>
  //======================================================================
  return (
    <>
      <Header/>
      <h3 style={{color:'red'}}>アイテム一覧：</h3>
      <form onSubmit={handleSubmit}>
        <button >Show all items.</button>
      </form>
      <div id='data'></div>
      <Footer/>
    </>
  );
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default Page;//For [npm run start]
