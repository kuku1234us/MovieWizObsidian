/**
 * Suggestion panel component for MovieWiz
 *
 * This module displays the search results in a scrollable list format.
 * It handles keyboard navigation (up/down/enter), selection highlighting,
 * and mouse interactions. The panel supports both keyboard and mouse-based
 * selection of movies/TV shows.
 *
 * @component SuggestionPanel
 */
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

interface SuggestionPanelProps {
  suggestions: any[];
  onSelect: (index: number) => void;
  isFocused: boolean;
}

const SuggestionPanel = forwardRef<
  {
    focus: () => void;
  },
  SuggestionPanelProps
>(({ suggestions, onSelect, isFocused }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const suggestionPanelRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (suggestionPanelRef.current) {
        suggestionPanelRef.current.focus({ preventScroll: true });
      }
    },
  }));

  useEffect(() => {
    if (isFocused) {
      setCurrentIndex(0);
    }
  }, [suggestions, isFocused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused) return;

      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        setCurrentIndex((prevIndex) =>
          Math.min(prevIndex + 1, suggestions.length - 1)
        );
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        onSelect(currentIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, suggestions, currentIndex, onSelect]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [suggestions]);

  return (
    <div
      ref={suggestionPanelRef}
      tabIndex={0}
      className="mt-4 overflow-y-auto overflow-x-hidden"
      role="listbox"
    >
      {suggestions.map((suggestion, index) => (
        <div
          key={suggestion.id}
          className="relative flex items-center p-2 cursor-pointer group"
          style={{
            borderBottom: "1px solid rgba(51, 51, 51, 0.5)",
          }}
          onClick={() => onSelect(index)}
        >
          {index === currentIndex && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "#133646",
                opacity: "0.5",
                zIndex: 1,
              }}
            />
          )}

          <div
            className={`absolute inset-0 hidden group-hover:block ${
              index === currentIndex ? "hidden group-hover:hidden" : ""
            }`}
            style={{
              backgroundColor: "rgb(55, 65, 81)",
              opacity: "0.5",
              zIndex: 1,
            }}
          />

          <div className="flex items-center w-full relative z-10">
            <img
              src={suggestion.poster}
              alt={suggestion.title}
              className="w-12 h-18 mr-4 rounded-sm"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-white">
                {suggestion.title}
              </span>
              <span className="text-sm text-gray-400">
                {suggestion.year} | {suggestion.type}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default SuggestionPanel;
