import { title } from "process";
import { getAuthClient } from "../../lib/auth-client";

// Props
interface NavbarProps {
  apiBaseUrl: string;
  title: string;
}

// Component
export default function Navbar({ apiBaseUrl, title }: NavbarProps) {
  const authClient = getAuthClient(apiBaseUrl);

  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <a href="/" className="navbar-brand">
          {title}
        </a>
        <div className="navbar-links">
          {isPending ? (
            <div>Loading...</div>
          ) : (
            <>
              <a href="/" className="navbar-link">
                Home
              </a>
              <a href="/setup" className="navbar-link">
                Setup
              </a>
              {session ? (
                <button
                  onClick={() => authClient.signOut()}
                  className="navbar-button logout"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => (authClient as any).signIn.oauth2("webflow")}
                  className="navbar-button"
                >
                  Login with Webflow
                </button>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
