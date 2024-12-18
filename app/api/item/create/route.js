//堀
//######################################################################
// File: "route.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/api/item/create/"
//   "route.js")
// By Horita.
// On (2024 Nov 27).
//######################################################################
const cnt = 7;
const trcLev = 2;//Added.
const path = 'app/api/item/create/route';//New
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { NextResponse } from "next/server";
import connectDB        from "../../../utils/database";//Added
import { ItemModel }    from "../../../utils/schemaModels";
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function POST(req){//<1
  const reqBody = await req.json();//New
  if( trcLev >= 2 ){//<3
    console.log(`-- ${path}.POST()#1:reqBody=`);
    console.dir(reqBody);
  }//3>
  try{//<2
    await connectDB();//Mdf.
    await ItemModel.create(reqBody);//New
    let rtnOb1 = {message: `Success in creating an item#${cnt}`};//New
    return NextResponse.json(rtnOb1)//Added
  }//2>
  catch(err){//<2
    console.log(`-- ${path}.POST()#2:err=`);//Added
    console.dir(err);//Added
    let rtnOb2 = {message: `Failure in creating an item#${cnt}`};//New
    return NextResponse.json(rtnOb2)//Added
  }//2>
}//1>
//**********************************************************************
