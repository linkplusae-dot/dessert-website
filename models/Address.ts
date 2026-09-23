import {
  Schema,
  model,
  models,
  type Model,
  type Types,
} from "mongoose";

export type AddressDocument = {
  customer: Types.ObjectId;
  label: string;
  recipientName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  area: string;
  emirate: string;
  notes?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const addressSchema =
  new Schema<AddressDocument>(
    {
      customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        index: true,
      },

      label: {
        type: String,
        required: true,
        trim: true,
        default: "Home",
      },

      recipientName: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      addressLine1: {
        type: String,
        required: true,
        trim: true,
      },

      addressLine2: {
        type: String,
        trim: true,
        default: "",
      },

      area: {
        type: String,
        required: true,
        trim: true,
      },

      emirate: {
        type: String,
        required: true,
        trim: true,
        enum: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"],
      },

      notes: {
        type: String,
        trim: true,
        default: "",
      },

      isDefault: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

addressSchema.index({
  customer: 1,
  isDefault: 1,
});

const Address =
  (models.Address as
    Model<AddressDocument>) ||
  model<AddressDocument>(
    "Address",
    addressSchema
  );

export default Address;
