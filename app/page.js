//堀
import Image from "next/image"
import Link from "next/link"
import Footer from './components/footer';//Added
import Header from './components/header';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function Page(){
  return (
    <>
    <Header/>
    <h1>こんにちは．Next Market のトップページです．</h1>
    <Footer/>
    </>
  )
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default Page
