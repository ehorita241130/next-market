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
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import Link from 'next/link';//Added
import Image from 'next/image';//Added
import Header from '../../components/header';//Added
import Footer from '../../components/footer';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const url = 'http://localhost:3000/api/item/readall';
const path = 'app/item/readall/page';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
async function getAllItems(){
  const response = await fetch(url);
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
//v This works for [npm run dev], but does NOT for [npm run start]
async function ReadAllItems(){//<1
  //console.log(`-- ${path}.ReadAllItems()#1:called.`);
  let items = await getAllItems();
  let message = items.message;
  let items1 = items.allItems;
  if( trcLev >= 2 ){
    console.log(`-- ${path}.ReadAllItems()#1:items1=`); 
    console.dir(items1);
  }
  //let items1 = undefined;//Dummy
  if( items1 === undefined ){
    return (
      //======================================================================
      <>
        <h3>Some errors in {`${path}.ReadAllItems()`}</h3>
      </>
      //======================================================================
    );
  }
  let lgt1 = items1.length;
  console.log(`-- ${path}.ReadAllItems()#1:lgt1=${lgt1}`);
  //======================================================================
  return (//<2
    //======================================================================
    <>
      <Header/>
      <h3 style={{color:'red'}}>こんにちは． アイテム一覧：</h3>
      <p style={{color:'blue'}}>Message：{message}</p>
      <p>{`Count of items：${lgt1}`}</p>
      <hr/>
      {
        (() => {//<4<5
          let rtn = [];
          for(let k=0; k < lgt1; ++k){//______________________________BGN <LOOP.1>
            let item1 = items1[k];
            let id1 = item1._id;
            let link1 = `/item/readsingle/${id1}`;
            //console.log('link1='); console.dir(link1);
            let title1 = item1.title;
            let description = item1.description;
            let description1 = description.substr(0,60)+' ....';//Mdf
            let email1 = item1.email;
            let price1 = item1.price;
            let image1 = item1.image;
            if( image1.substr(0,1) !== '/' ){
              image1 = '/' + image1;
            }
            rtn.push(
              <div key={k+1}>
                <p>#{k+1}，Id：{id1}</p>                
                <p>Title：{title1}，Price：{price1}円，Email：{email1}</p>
                <p>Link：<Link href={`${link1}`}>{id1}</Link></p>
                <p>Description：{description1}</p>
                <p>Image：{`"${image1}"`}</p>
                <p><Image src={image1} width={150} height={100} alt='item-image' priority/></p>
                <hr/>
              </div>
            );
          }//_________________________________________________________END <LOOP.1>
          return rtn;
        })()//5>4>
      }
      <h3 style={{color:'red'}}>さようなら</h3>
      <Footer/>
    </>
    //======================================================================
  );//2>
  //======================================================================
}//1>
//**********************************************************************
//v This WORKS for for [npm run start]
function Page(){//<1
  //======================================================================
  async function handleSubmit(evt){//<2
    evt.preventDefault() 
    const response = await fetch(url);
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
      let link1 = `/item/readsingle/${id1}`;
      //console.log('link1='); console.dir(link1);
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
//export default ReadAllItems;//For [npm run dev]
