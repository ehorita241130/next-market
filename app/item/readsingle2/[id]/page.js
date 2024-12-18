//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/item/readsingle2/[id]/"
//   "page.js")
// By Horita.
// On (2024 Dec 1).
//######################################################################
'use client';//Client Component.
// Server Component
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const trcLev = 2;
const path = 'app/item/readsingle2/_/page';
//======================================================================
const url0 = process.env.NEXT_PUBLIC_URL;//New
const url1 = 'api/item/readsingle2';//New
const url2 = `/${url1}`;
//const url2 = `${url0}/${url1}`;
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState, useEffect } from 'react';//Added
import Link   from 'next/link';//Added
import Image  from 'next/image';//Added
import Header from '../../../components/header';//Added
import Footer from '../../../components/footer';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function Page(context){//<1
  //======================================================================
  useEffect( () => 
    {
      async function getSingleItem(){//<2
        const params = await context.params;
        const id = params.id;
        const headers1 =
          { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
          };
        const body1 = { id: id };
        const ob1 =
          {
            method: 'POST',
            headers: headers1,
            body: JSON.stringify(body1)
          };
        const resp = await fetch(url2, ob1);//New
        const jsonData = await resp.json();
        const jsonData1 = jsonData.message;
        const jsonData2 =jsonData.singleItem;
        if( jsonData2 !== undefined ){
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
          let htmlText = '';
          htmlText += `<p>${jsonData1}</p>\n`;
          htmlText += `<p>Id：${id}</p>\n`;
          htmlText += `<p>Title：${title}</p>\n`;
          htmlText += `<p>Price：${price}</p>\n`;
          htmlText += `<p>Email：${email}</p>\n`;
          htmlText += `<p>Description：${description}</p>\n`;
          htmlText += `<p>Image："${image}"</p>\n`;
          htmlText += `<img src=${image} width=750 height=500 alt='item-image' priority/>\n`;
          htmlText += `<p>Link：<a href="${link}">Top-page</Link></a>\n`;
          let elmData = document.getElementById('data');
          elmData.innerHTML = htmlText;//New
        }
        else{
          let htmlText = '';
          htmlText += `<p>${jsonData1}</p>\n`;//Mdf
          elmData.innerHTML = htmlText;//New      
        }
      }//2>
      getSingleItem();
    }, 
    []           
    //[context]
  );
  //======================================================================
  return (
    <>
      <Header/>
      <h3 style={{color:'red'}}>個別アイテム：</h3>
      <div id='data'></div>
      <Footer/>
    </>
  );
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default Page
