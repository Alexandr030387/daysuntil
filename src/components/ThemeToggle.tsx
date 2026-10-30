import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-11 w-11 place-items-center rounded-full active:bg-muted"
    >
      {theme === "dark" ? <Sun className="h-6 w-6" strokeWidth={2.5} /> : <Moon className="h-6 w-6" strokeWidth={2.5} />}
    </button>
  );
}
