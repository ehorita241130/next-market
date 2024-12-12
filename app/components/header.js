//堀
import Image from "next/image"
import Link from "next/link"
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function Header(){
  return (
    <header>
      <Image src="/header.svg" width={332} height={37} alt="header-image" priority/>
      <p></p>
      <ul>
        <li><Link href="/item/readall">アイテム一覧</Link></li>
        <li><Link href="/item/create">アイテム作成</Link></li>
        <li><Link href="/user/login">ログイン</Link></li>
        <li><Link href="/user/register">ユーザ登録</Link></li>
      </ul>
      <p></p>
      <hr/>
    </header>
  )
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default Header
