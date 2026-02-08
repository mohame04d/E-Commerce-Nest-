import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,  
    minLength: [3, 'name must be at least 3 character'],
    maxLength:[30,'name must be at most 30 character'],
    required:[true,'name is required']
  })
  name: string;
  @Prop({type:String,
    unique:[true,'email must be unique'],
    required:[true,'email is required']
  })
  email:string
  @Prop({type:String,
    required:[true,'password is required']
  })
  password:string
  @Prop({enum:['admin','user'],
    default:'user',
    select:false
  })
  role:string
  @Prop({type:String})
  avatar:string
  @Prop({type:Number})
  age:number
  @Prop({type:String})
  phone:string
  @Prop({type:String})
  address:string
  @Prop({type:Boolean,
    enum:[true,false]
  })
  active:boolean
  @Prop({type:String})
  vertificationCode:string
  @Prop({type:String})
  gender:string
}
export const UserSchema = SchemaFactory.createForClass(User);
