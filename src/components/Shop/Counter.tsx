function Counter({
  value,
  onChange,
  maxQty = 99,
}: {
  value: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  maxQty?: number;
}) {
  const incrementQty = () => {
    if (value + 1 <= maxQty) onChange(value + 1);
  };
  const decrementQty = () => {
    if (value - 1 >= 1) onChange(value - 1);
  };
  return (
    <div className="relative h-12 w-fit">
      <button
        onClick={decrementQty}
        className="h-full w-6 cursor-pointer  border border-[#E7E7E7]"
      >
        <span className="m-auto">−</span>
      </button>
      <input
        type="number"
        className="h-full w-12 items-center border border-x-0 border-[#E7E7E7] text-center font-semibold"
        value={value}
        // disabled={maxQty == 0}
        onChange={(e) =>
          parseInt(e.target.value) <= maxQty && parseInt(e.target.value) >= 1
            ? onChange(parseInt(e.target.value))
            : onChange && onChange(1)
        }
      />
      <button
        onClick={incrementQty}
        className="h-full w-6 cursor-pointer  border border-[#E7E7E7]"
      >
        <span className="m-auto">+</span>
      </button>
    </div>
  );
}

export default Counter;
