import { useEffect, useState } from "preact/hooks";
import MoonIcon from "../icons/MoonIcon.astro?raw";
import SunIcon from "../icons/SunIcon.astro?raw";
import { Themes } from "../../constants/theme.constants";

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
  const classesColor = isLight ? "text-slate-900" : "text-green-300"

  return (
    <button class={`hover:bg-gray-300 dark:hover:bg-gray-800 rounded transition hover:scale-110 p-1 border-2 border-black/10 dark:border-white/10 ${classesColor}`}
      aria-label="Theme toggle"
      onClick={handleClick}>
      <span dangerouslySetInnerHTML={{ __html: Icon }} />
    </button>
  )
}

