import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { listProjects, saveProjects } from "../services/projectService";
import { load, save } from "../lib/storage";
import { Toast } from "../components/AppShell";

const ProjectsContext = createContext(null);
const ToastContext = createContext(() => {});
const ThemeContext = createContext(null);

function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const ready = useRef(false);

  useEffect(() => {
    listProjects().then((list) => {
      setProjects(list);
      ready.current = true;
    });
  }, []);

  useEffect(() => {
    if (ready.current) saveProjects(projects);
  }, [projects]);

  const value = useMemo(
    () => ({
      projects,
      add: (p) => {
        const project = { ...p, id: crypto.randomUUID(), status: "aktif", createdAt: new Date().toISOString() };
        setProjects((list) => [project, ...list]);
        return project;
      },
      update: (id, patch) => setProjects((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p))),
      remove: (id) => setProjects((list) => list.filter((p) => p.id !== id)),
      replaceAll: setProjects,
    }),
    [projects]
  );
  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => load("theme", "sistem"));
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "sistem") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme === "gelap" ? "dark" : "light");
    save("theme", theme);
  }, [theme]);
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);
  const show = useCallback((message, tone) => {
    window.clearTimeout(timer.current);
    setToast({ message, tone, key: Date.now() });
    timer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <Toast toast={toast} />
    </ToastContext.Provider>
  );
}

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ProjectsProvider>{children}</ProjectsProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export const useProjects = () => useContext(ProjectsContext);
export const useToast = () => useContext(ToastContext);
export const useTheme = () => useContext(ThemeContext);
