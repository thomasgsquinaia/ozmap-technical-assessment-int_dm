import 'reflect-metadata';

import * as mongoose from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { pre, getModelForClass, Prop, Ref, modelOptions } from '@typegoose/typegoose';

import ObjectId = mongoose.Types.ObjectId;
class Base extends TimeStamps {
  @Prop({ type: String, required: true, default: () => (new ObjectId()).toString() })
  _id: string|any;
}
export class User extends Base {
  @Prop({ required: true, type: String })
  name!: string;

  @Prop({ required: true, type: String })
  email!: string;

  @Prop({ required: true , type: String})
  address: string;

  @Prop({ required: true, type: () => [Number] })
  coordinates: [number, number];

  @Prop({ required: true, default: [], ref: () => Region, type: () => String })
  regions: Ref<Region>[];
}
@pre<Region>('save', async function (next) {
  const region = this as Omit<any, keyof Region> & Region;

  if (!region._id) {
    region._id = new ObjectId().toString();
  }

  if (region.isNew) {
    const user = await UserModel.findOne({ _id: region.user });
    user.regions.push(region._id);
    await user.save({ session: region.$session() });
  }

  next(region.validateSync());
})

@modelOptions({ schemaOptions: { validateBeforeSave: false } })
export class Region extends Base {
  @Prop({ required: true, type: String})
  name!: string;

  @Prop({ required: true, type: () =>  [Number], index: '2dsphere' })
  coordinates!: [number, number];

  @Prop({ ref: () => User, required: true, type: () => String })
  user!: Ref<User>;
}

export const UserModel = getModelForClass(User);
export const RegionModel = getModelForClass(Region);