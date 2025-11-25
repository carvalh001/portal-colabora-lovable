import assertLogo from "@/assets/assert-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Desenvolvido por</span>
          <a
            href="https://assert.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <img
              src={assertLogo}
              alt="Assert"
              className="h-4 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
