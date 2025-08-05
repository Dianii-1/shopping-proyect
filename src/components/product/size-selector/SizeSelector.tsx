import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  avaliableSizes: Size[];

  onSizeChange: (size: Size) => void;
}

export const SizeSelector = ({
  avaliableSizes,
  selectedSize,
  onSizeChange,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="mb-4 font-bold">Tallas disponibles</h3>
      <div className="flex">
        {avaliableSizes.map((size) => (
          <button
            className={clsx("text-lg mx-2 hover:underline", {
              underline: size === selectedSize,
            })}
            key={size}
            onClick={() => onSizeChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
