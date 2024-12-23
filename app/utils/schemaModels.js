//堀
//######################################################################
// File: "schemaModels.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/utils/"
//   "schemaModels.js")
// By Horita.
// On (2024 Nov 27).
//######################################################################
import mongoose from 'mongoose';
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const Schema = mongoose.Schema;
//**********************************************************************
const itemSchemaSpec = {
  title: String,        
  image: String,
  price: String,    
  description: String,
  email: String,
};
//======================================================================
const ItemSchema = new Schema(itemSchemaSpec);
//**********************************************************************
const userSchemaSpec = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
};
//======================================================================
const UserSchema = new Schema(userSchemaSpec);//Added.
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const ItemModel = mongoose.models.Item || mongoose.model('Item', ItemSchema)
export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema)
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
