//堀
//######################################################################
// File: "route.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/api/item/readsingle/[id]/"
//   "route.js")
// By Horita.
// On (2024 Nov 27).
//######################################################################
import { NextResponse } from "next/server";
import connectDB from        "../../../../utils/database";
import { ItemModel } from    "../../../../utils/schemaModels";
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function GET(request, context){
  try{
    await connectDB();
    let params = await context.params;//Added
    const singleItem = await ItemModel.findById(params.id);//Mdf
    const rtnOb1 = 
      {message: "アイテム読み取り(シングル)成功", singleItem: singleItem};
    return NextResponse.json(rtnOb1);
  }
  catch(err){
    console.log('-- api/item/readsingle/_/route.GET()#1:err=');//New
    console.dir(err);//New
    const rtnOb2 = {message: "アイテム読み取り(シングル)失敗"};
    return NextResponse.json(rtnOb2);
  }
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
