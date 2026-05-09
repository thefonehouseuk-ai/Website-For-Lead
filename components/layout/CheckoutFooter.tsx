import Link from "next/link";

export function CheckoutFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} The Phone House UK. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy-policy" className="font-medium text-slate-700 hover:underline">
            Privacy Policy
          </Link>
          <a
            href="mailto:support@fonehouse.cloud"
            className="font-medium text-slate-700 hover:underline"
          >
            support@fonehouse.cloud
          </a>
        </div>
      </div>
    </footer>
  );
}
