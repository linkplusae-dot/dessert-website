import {
  Schema,
  model,
  models,
  type Model,
} from "mongoose";

export type CustomerDocument = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const customerSchema =
  new Schema<CustomerDocument>(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      passwordHash: {
        type: String,
        required: true,
        select: false,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

const Customer =
  (models.Customer as Model<CustomerDocument>) ||
  model<CustomerDocument>(
    "Customer",
    customerSchema
  );

export default Customer;