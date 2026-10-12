import { RouterProvider, Routes, useRouter } from "./lib/router";
import { AppProviders, useProjects } from "./store/AppProviders";
import { AppShell } from "./components/AppShell";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NewProject from "./pages/NewProject";
import Components from "./pages/Components";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const ROUTES = [
  { path: "/", render: () => <Home /> },
  { path: "/proyek", render: () => <Projects /> },
  { path: "/proyek/:id", render: ({ id }) => <ProjectDetail id={id} /> },
  { path: "/mulai", render: () => <NewProject /> },
  { path: "/komponen", render: () => <Components /> },
  { path: "/akun", render: () => <Account /> },
];

// Alur langkah demi langkah tampil dalam mode fokus, tanpa navigasi utama.
const FOCUS_ROUTES = ["/mulai"];

function Screen() {
  const { pathname } = useRouter();
  const { projects } = useProjects();
  const active = projects.filter((p) => p.status === "aktif").length;
  return (
    <AppShell focus={FOCUS_ROUTES.includes(pathname)} badges={{ "/proyek": active }}>
      <Routes routes={ROUTES} fallback={<NotFound />} />
    </AppShell>
  );
}

export default function App() {
  return (
    <RouterProvider mode="history">
      <AppProviders>
        <Screen />
      </AppProviders>
    </RouterProvider>
  );
}
