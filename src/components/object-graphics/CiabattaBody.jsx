import Sprite from "./Sprite";

export default function CiabattaBody({ frameCoord, yTranslate }) {
  return (
    <div className="relative">
      <div
        className="absolute -left-[16px] -top-[33px]"
        style={{
          transform: `translateY(${yTranslate}px)`,
        }}
      >
        <Sprite frameCoord={frameCoord} size={48} />
      </div>
    </div>
  );
}
