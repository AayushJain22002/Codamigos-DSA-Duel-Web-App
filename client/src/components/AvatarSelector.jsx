import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { useRef, useEffect } from "react";
import { setAvatarIndex } from "../redux/slices/AvatarIndex";

const AvatarSelector = ({ avatars = [], onSelect }) => {
  const dispatch = useDispatch();
  // read selected index from redux store
  const selectedIndex = useSelector((state) => state.avatarIndex.value);

  const contentRef = useRef(null);

  // initialize store index to middle when avatars list changes (only if store value is invalid)
  useEffect(() => {
    if (!avatars || avatars.length === 0) return;
    const middle = Math.floor(avatars.length / 2);
    // if current store index is out of range or undefined, set it to middle
    if (typeof selectedIndex !== "number" || selectedIndex < 0 || selectedIndex >= avatars.length) {
      dispatch(setAvatarIndex(middle));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatars.length]);

  // notify parent whenever selectedIndex changes
  useEffect(() => {
    if (!avatars || avatars.length === 0) return;
    if (typeof selectedIndex === "number" && avatars[selectedIndex]) {
      onSelect?.(avatars[selectedIndex]);
    }
  }, [selectedIndex, avatars, onSelect]);

  // center the selected avatar in the scroller whenever selectedIndex updates
  useEffect(() => {
    const el = contentRef.current;
    if (!el || typeof selectedIndex !== "number") return;
    const child = el.children[selectedIndex];
    if (!child) return;

    const containerCenter = el.clientWidth / 2;
    const childCenter = child.offsetLeft + child.offsetWidth / 2;
    const target = childCenter - containerCenter;

    el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [selectedIndex, avatars.length]);

  // actions that change only Redux state
  const handlePrev = () => {
    if (!avatars.length) return;
    dispatch(setAvatarIndex((selectedIndex - 1 + avatars.length) % avatars.length));
  };

  const handleNext = () => {
    if (!avatars.length) return;
    dispatch(setAvatarIndex((selectedIndex + 1) % avatars.length));
  };

  const handleClick = (index) => {
    dispatch(setAvatarIndex(index));
  };

  // console.log(selectedIndex)
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative p-6 rounded-xl ">
        {/* Prev */}
        <button
          onClick={handlePrev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/60"
        >
          ‹
        </button>

        {/* scroller */}
        <div
          ref={contentRef}
          className="flex gap-6 overflow-x-auto overflow-y-hidden items-center scrollbar-hide px-12 py-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {avatars.map((avatar, idx) => {
            const isSelected = idx === selectedIndex;
            const distance = Math.abs(idx - (typeof selectedIndex === "number" ? selectedIndex : 0));
            const wrapDist = Math.min(distance, avatars.length - distance);

            const sizeClass =
              wrapDist === 0
                ? "scale-110 z-20"
                : wrapDist === 1
                ? "scale-95 z-10 opacity-90"
                : "scale-75 z-0 opacity-60";

            return (
              <div
                key={idx}
                onClick={() => handleClick(idx)}
                className={`flex-shrink-0 snap-center flex justify-center items-center transition-transform duration-300 ${sizeClass}`}
                style={{ width: 96 }}
                role="button"
                aria-pressed={isSelected}
              >
                <div
                  className={`cursor-pointer rounded-full p-1 transition-all border-2 ${
                    isSelected ? "border-yellow-400" : "border-transparent"
                  }`}
                >
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={avatar} alt={`Avatar ${idx + 1}`} />
                    <AvatarFallback>{idx + 1}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/60"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default AvatarSelector;
