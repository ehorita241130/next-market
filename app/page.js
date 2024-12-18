//堀
'use client';//Client Component.
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState, useEffect } from 'react';//Added
import Image  from 'next/image';
import Link   from 'next/link';
import Footer from './components/footer';//Added
import Header from './components/header';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function Page(){
  useEffect( () =>
    {
      function fill1(){
        console.log('-- fill1(): called.');//Tracing.
        let elmData = document.getElementById('data');
        elmData.innerHTML = '<p>こんにちは</p>';
      }
      fill1();
    },
    []
  );
  //======================================================================
  return (
    <>
    <Header/>
    <h1>Next Market のトップページです．</h1>
      <div id='data'></div>
    <Footer/>
    </>
  );
  //======================================================================
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default Page
