export default function SpineLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-end gap-[3px] h-6">
        <span className="w-[3px] h-4 rounded-[1px] bg-gold" />
        <span className="w-[3px] h-6 rounded-[1px] bg-wine" />
        <span className="w-[3px] h-5 rounded-[1px] bg-forest" />
        <span className="w-[3px] h-6 rounded-[1px] bg-parchment-faint" />
      </div>
      <span
        className="text-xl text-parchment"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        Spine
      </span>
    </div>
  );
}