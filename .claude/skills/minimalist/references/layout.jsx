/*
  AppShell gaya minimalist (diangkat dari LukaCare src/components/AppShell.jsx).
  - Mobile: top bar sticky + navigasi bawah 4 item.
  - Desktop (lg:): sidebar w-64, navigasi bawah disembunyikan.
  - focus: tanpa navigasi, untuk wizard / checkout.
  Ganti NAV, Logo, dan aksi penting (PriorityAction) sesuai produk.
  `badges` opsional: { "/rute": jumlah } untuk badge hitungan berwarna accent.
*/
import { LuHouse, LuCompass, LuClipboardList, LuShoppingBag, LuUserRound } from "react-icons/lu";
import { Link, useRouter, isActivePath } from "../lib/router";
import { cx } from "../lib/cx";

const NAV = [
  { to: "/", label: "Beranda", icon: LuHouse },
  { to: "/panduan", label: "Panduan", icon: LuCompass },
  { to: "/pantau", label: "Pantau", icon: LuClipboardList },
  { to: "/belanja", label: "Belanja", icon: LuShoppingBag },
];

function Logo() {
  return <span className="text-[1.2rem] font-extrabold tracking-[-0.03em] text-ink">Produk</span>;
}

function CountBadge({ value, className }) {
  if (!value) return null;
  return (
    <span
      className={cx(
        "tabular grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent-deep px-1 text-[11px] font-bold text-white",
        className
      )}
    >
      {value}
    </span>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/90 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="Ke beranda">
          <Logo />
        </Link>
        <Link
          to="/akun"
          className="grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-sunken"
          aria-label="Akun saya"
        >
          <LuUserRound size={22} />
        </Link>
      </div>
    </header>
  );
}

function BottomNav({ badges }) {
  const { pathname } = useRouter();
  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-4">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = isActivePath(pathname, to);
          const badge = badges[to];
          return (
            <li key={to}>
              <Link
                to={to}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold",
                  active ? "text-primary" : "text-muted"
                )}
              >
                <span className={cx("relative grid h-8 w-14 place-items-center rounded-full transition-colors", active && "bg-primary-soft")}>
                  <Icon size={22} aria-hidden="true" />
                  <CountBadge value={badge} className="absolute -right-0.5 -top-1" />
                </span>
                {label}
                {badge > 0 && <span className="sr-only">({badge})</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Sidebar({ badges, footer }) {
  const { pathname } = useRouter();
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line bg-surface px-4 py-6 lg:flex">
      <Link to="/" className="flex items-center gap-2 px-2" aria-label="Ke beranda">
        <Logo />
      </Link>
      <nav aria-label="Navigasi utama" className="mt-8">
        <ul className="space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = isActivePath(pathname, to);
            return (
              <li key={to}>
                <Link
                  to={to}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "flex h-11 items-center gap-3 rounded-full px-4 text-[15px] font-semibold transition-colors",
                    active ? "bg-primary-soft text-primary-strong" : "text-ink-soft hover:bg-sunken"
                  )}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                  <CountBadge value={badges[to]} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {footer && <div className="mt-auto space-y-3">{footer}</div>}
    </aside>
  );
}

export function AppShell({ children, focus = false, badges = {}, sidebarFooter }) {
  if (focus) {
    return <div className="min-h-dvh">{children}</div>;
  }
  return (
    <div className="flex min-h-dvh">
      <Sidebar badges={badges} footer={sidebarFooter} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main
          id="konten"
          className="mx-auto w-full max-w-3xl flex-1 px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-6 sm:px-6 lg:max-w-5xl lg:px-10 lg:pb-16 lg:pt-10"
        >
          {children}
        </main>
        <BottomNav badges={badges} />
      </div>
    </div>
  );
}

/* Toast: satu baris, di atas navigasi bawah. Render sekali di provider global. */
export function Toast({ toast }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 flex justify-center px-4 lg:bottom-8"
    >
      {toast && (
        <div
          key={toast.key}
          className={cx(
            "toast-in pointer-events-auto max-w-sm rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg",
            toast.tone === "alert" ? "bg-alert text-white" : "bg-ink text-canvas"
          )}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
