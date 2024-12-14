//堀
//######################################################################
// File: "route.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/api/item/readsingle2/"
//   "route.js")
// By Horita.
// On (2024 Nov 27).
//######################################################################
const cnt = 7;
const trcLev = 2;//Added.
const path = 'api/item/readsingle2/route';//new
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { NextResponse } from "next/server";
import connectDB        from "../../../utils/database";//Added
import { ItemModel }    from "../../../utils/schemaModels";
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function POST(req){//<1
  const reqBody = await req.json();//New
  const id = reqBody.id;//New
  if( trcLev >= 2 ){//<3
    console.log(`-- ${path}.POST()#1:reqBody=`);
    console.dir(reqBody);
    console.log(`-- ${path}.POST()#2:id=${id}`);
  }//3>
  try{//<2
    await connectDB();//Mdf.
    const singleItem = await ItemModel.findById(id);//Mdf
    const rtnOb1 = 
      {message: 'アイテム読み取り(シングル)成功', singleItem: singleItem};
    return NextResponse.json(rtnOb1)//Added
  }//2>
  catch(err){//<2
    console.log(`-- ${path}.POST()#1:err=`);//Added
    console.dir(err);//Added
    let rtnOb2 = {message: `Failure in readsingle2#${cnt}`};//New
    return NextResponse.json(rtnOb2)//Added
  }//2>
}//1>
//**********************************************************************
