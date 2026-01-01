import { useEffect, useState } from "preact/hooks";
import MoonIcon from "../icons/MoonIcon.astro?raw";
import SunIcon from "../icons/SunIcon.astro?raw";
import { Themes } from "@/constants/theme.constants";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? Themes.LIGHT);
  const isLight = theme === Themes.LIGHT

  useEffect(() => {
    if (theme === Themes.DARK) {
      document.documentElement.classList.add(Themes.DARK);
    } else {
      document.documentElement.classList.remove(Themes.DARK);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleClick = () => {
    setTheme(isLight ? Themes.DARK : Themes.LIGHT);
  };

  const Icon = isLight ? MoonIcon : SunIcon
  const classesColor = isLight ? "text-foreground" : "text-primary"

  return (
    <button class={`hover:bg-accent/20 rounded transition hover:scale-110 p-1 border-2 border-border ${classesColor}`}
      aria-label="Theme toggle"
      onClick={handleClick}>
      <span dangerouslySetInnerHTML={{ __html: Icon }} />
    </button>
  )
}
