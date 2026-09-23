import {
  Check,
  Home,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";

export type SavedAddress = {
  id: number;
  label: string;
  emirate: string;
  area: string;
  street: string;
  building: string;
  apartment: string;
  landmark: string;
  instructions: string;
  isDefault: boolean;
};

type Props = {
  address: SavedAddress;
  onEdit: (
    address: SavedAddress
  ) => void;
  onDelete: (id: number) => void;
  onDefault: (id: number) => void;
};

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onDefault,
}: Props) {
  return (
    <article
      className="
        rounded-[20px]
        border
        border-[var(--primary)]/8
        bg-white
        p-4
        shadow-[0_8px_30px_rgba(45,32,32,0.035)]
        sm:rounded-[24px]
        sm:p-5
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <div
          className="
            flex
            h-[40px]
            w-[40px]
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--surface)]
            text-[var(--primary)]
          "
        >
          <Home size={16} />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <h2
              className="
                text-[11px]
                font-semibold
                text-[var(--foreground)]
              "
            >
              {address.label}
            </h2>

            {address.isDefault && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  bg-[var(--primary)]
                  px-2
                  py-1
                  text-[7px]
                  font-semibold
                  text-white
                "
              >
                <Check size={9} />
                Default
              </span>
            )}
          </div>

          <div
            className="
              mt-3
              flex
              items-start
              gap-2
            "
          >
            <MapPin
              size={13}
              className="
                mt-0.5
                shrink-0
                text-[var(--primary)]
              "
            />

            <p
              className="
                text-[9px]
                leading-5
                text-[var(--foreground)]/50
              "
            >
              {address.building}

              {address.apartment &&
                `, ${address.apartment}`}

              <br />

              {address.street},{" "}
              {address.area}

              <br />

              {address.emirate}, UAE
            </p>
          </div>

          {address.landmark && (
            <p
              className="
                mt-2
                text-[8px]
                text-[var(--foreground)]/40
              "
            >
              Landmark: {address.landmark}
            </p>
          )}
        </div>
      </div>

      <div
        className="
          mt-4
          flex
          items-center
          gap-2
          border-t
          border-[var(--primary)]/8
          pt-3
        "
      >
        <button
          type="button"
          onClick={() =>
            onEdit(address)
          }
          className={actionClass}
        >
          <Pencil size={12} />
          Edit
        </button>

        {!address.isDefault && (
          <button
            type="button"
            onClick={() =>
              onDefault(address.id)
            }
            className={actionClass}
          >
            <Check size={12} />
            Set Default
          </button>
        )}

        <button
          type="button"
          onClick={() =>
            onDelete(address.id)
          }
          className="
            ml-auto
            flex
            h-[34px]
            items-center
            gap-1.5
            rounded-full
            px-3
            text-[8px]
            font-semibold
            text-red-500
            transition
            hover:bg-red-50
          "
        >
          <Trash2 size={12} />
          Delete
        </button>
      </div>
    </article>
  );
}

const actionClass = `
  flex
  h-[34px]
  items-center
  gap-1.5
  rounded-full
  bg-[var(--surface)]
  px-3
  text-[8px]
  font-semibold
  text-[var(--primary)]
  transition
  hover:opacity-80
`;