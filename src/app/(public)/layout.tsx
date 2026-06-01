import { SiteNav } from "@/components/public/site-nav";
import { SiteFooter } from "@/components/public/site-footer";
import { PublicBottomBar } from "@/components/public/public-bottom-bar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteNav />
      <main className="flex-1 pt-16 pb-20 md:pb-0">{children}</main>
      <SiteFooter />
      <PublicBottomBar />
    </div>
  );
}
