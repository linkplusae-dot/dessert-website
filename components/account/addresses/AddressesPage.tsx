"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

import AddressesHeader from "./AddressesHeader";

import AddressCard, {
  type SavedAddress,
} from "./AddressCard";

import AddressForm, {
  type AddressValues,
} from "./AddressForm";

const initialAddresses: SavedAddress[] = [
  {
    id: 1,
    label: "Home",
    emirate: "Dubai",
    area: "Dubai Marina",
    street: "Al Marsa Street",
    building: "Marina Residence",
    apartment: "Apartment 804",
    landmark: "",
    instructions:
      "Please call on arrival.",
    isDefault: true,
  },
];

const emptyAddress: AddressValues = {
  label: "",
  emirate: "",
  area: "",
  street: "",
  building: "",
  apartment: "",
  landmark: "",
  instructions: "",
  isDefault: false,
};

export default function AddressesPage() {
  const [
    addresses,
    setAddresses,
  ] = useState(initialAddresses);

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    editing,
    setEditing,
  ] =
    useState<SavedAddress | null>(
      null
    );

  const [
    values,
    setValues,
  ] =
    useState<AddressValues>(
      emptyAddress
    );

  const openAdd = () => {
    setEditing(null);

    setValues({
      ...emptyAddress,
      isDefault:
        addresses.length === 0,
    });

    setShowForm(true);
  };

  const openEdit = (
    address: SavedAddress
  ) => {
    setEditing(address);

    setValues({
      label: address.label,
      emirate: address.emirate,
      area: address.area,
      street: address.street,
      building: address.building,
      apartment: address.apartment,
      landmark: address.landmark,
      instructions:
        address.instructions,
      isDefault:
        address.isDefault,
    });

    setShowForm(true);
  };

  const updateValue = (
    field: keyof AddressValues,
    value: string | boolean
  ) => {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (editing) {
      setAddresses((current) =>
        current.map((address) => {
          if (
            values.isDefault &&
            address.id !== editing.id
          ) {
            return {
              ...address,
              isDefault: false,
            };
          }

          if (
            address.id === editing.id
          ) {
            return {
              ...address,
              ...values,
            };
          }

          return address;
        })
      );
    } else {
      const newAddress: SavedAddress = {
        id: Date.now(),
        ...values,
      };

      setAddresses((current) => {
        const updated =
          values.isDefault
            ? current.map(
                (address) => ({
                  ...address,
                  isDefault: false,
                })
              )
            : current;

        return [
          ...updated,
          newAddress,
        ];
      });
    }

    setShowForm(false);
    setEditing(null);
  };

  const setDefault = (
    id: number
  ) => {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,
        isDefault:
          address.id === id,
      }))
    );
  };

  const deleteAddress = (
    id: number
  ) => {
    setAddresses((current) => {
      const removing =
        current.find(
          (address) =>
            address.id === id
        );

      const remaining =
        current.filter(
          (address) =>
            address.id !== id
        );

      if (
        removing?.isDefault &&
        remaining.length
      ) {
        remaining[0] = {
          ...remaining[0],
          isDefault: true,
        };
      }

      return remaining;
    });
  };

  return (
    <section
      className="
        min-h-[70vh]
        bg-[var(--background)]
        pb-8
        lg:pb-14
      "
    >
      <div
        className="
          mx-auto
          max-w-[950px]
          px-3
          py-4
          sm:px-6
          sm:py-7
          lg:px-8
          lg:py-10
        "
      >
        <AddressesHeader
          onAdd={openAdd}
        />

        {addresses.length ? (
          <div
            className="
              grid
              gap-3
              md:grid-cols-2
              md:gap-4
            "
          >
            {addresses.map(
              (address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={openEdit}
                  onDelete={
                    deleteAddress
                  }
                  onDefault={
                    setDefault
                  }
                />
              )
            )}
          </div>
        ) : (
          <div
            className="
              rounded-[22px]
              border
              border-[var(--primary)]/8
              bg-white
              px-5
              py-12
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-[50px]
                w-[50px]
                items-center
                justify-center
                rounded-full
                bg-[var(--surface)]
                text-[var(--primary)]
              "
            >
              <MapPin size={20} />
            </div>

            <h2
              className="
                mt-4
                font-serif
                text-[20px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              No saved addresses
            </h2>

            <p
              className="
                mt-2
                text-[9px]
                text-[var(--foreground)]/40
              "
            >
              Add an address to make
              checkout faster.
            </p>

            <button
              type="button"
              onClick={openAdd}
              className="
                mt-5
                h-[42px]
                rounded-full
                bg-[var(--primary)]
                px-6
                text-[9px]
                font-semibold
                text-white
              "
            >
              Add Address
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <AddressForm
          values={values}
          editing={editing}
          onChange={updateValue}
          onClose={() =>
            setShowForm(false)
          }
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
}