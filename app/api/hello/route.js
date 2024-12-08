//堀
import { NextResponse } from "next/server"
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function GET(){
  let obj = 
    {
      message1: 'こんにちは.',
      message2: 'さようなら.'
    };
  return NextResponse.json(obj);
}
//**********************************************************************
