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
'use client';//Client Component.
//**********************************************************************
//This is a server component.
const trcLev = 1;
//const trcLev = 2;
const mode = 0;
const path = 'app/item/readall/page';//Added
//======================================================================
const url0 = process.env.NEXT_PUBLIC_URL;//New
const url1 = 'api/item/readall';//New
const url2 = `/${url1}`;//New for test.
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState, useEffect } from 'react';//Added
import Link   from 'next/link';//Added
import Image  from 'next/image';//Added
import Header from '../../components/header';//Added
import Footer from '../../components/footer';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//v This WORKS for for [npm run start]
function Page(){//<1
  useEffect( () =>//<2
    {//<3
      //======================================================================
      async function getAllItems(){//<4
        const response = await fetch(url2);//Mdf
        //{cache: "no-store"};//Added
        const jsonData = await response.json();
        let message = jsonData.message;
        let items1 = jsonData.allItems;
        let lgt1 = items1.length;
        if( mode === 1 ){
          alert(`-- ${path}.getAllItems()#1:lgt1=${lgt1}.`);
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
      }//4>
      getAllItems();
    },//3>
    []
  );//2>
  //======================================================================
  return (
    <>
      <Header/>
      <h3 style={{color:'red'}}>アイテム一覧：</h3>
      <div id='data'></div>
      <Footer/>
    </>
  );
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default Page;//For [npm run start]
