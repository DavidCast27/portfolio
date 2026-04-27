import { useEffect, useState } from "preact/hooks";
import MoonIcon from "../icons/MoonIcon.astro?raw";
import SunIcon from "../icons/SunIcon.astro?raw";
import { Themes } from "@/constants/theme.constants";
import { iconButtonVariants } from "./icon-button.styles";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? Themes.DARK);
  const isLight = theme === Themes.LIGHT;

  useEffect(() => {
    if (theme === Themes.DARK) {
      document.documentElement.classList.add(Themes.DARK);
    } else {
      document.documentElement.classList.remove(Themes.DARK);
    }
    localStorage.setItem("theme", theme);
    const meta = document.getElementById("meta-theme-color");
    if (meta) meta.setAttribute("content", theme === Themes.DARK ? "#0b0b0c" : "#fafafe");
  }, [theme]);

  const handleClick = () => {
    setTheme(isLight ? Themes.DARK : Themes.LIGHT);
  };

  const Icon = isLight ? MoonIcon : SunIcon;

  return (
    <button
      class={iconButtonVariants({ tone: isLight ? "default" : "primary" })}
      aria-label="Theme toggle"
      onClick={handleClick}
    >
      <span dangerouslySetInnerHTML={{ __html: Icon }} />
    </button>
  );
}
