import { getAuthClient } from "../../lib/auth-client";

export default function Navbar({ apiBaseUrl }: { apiBaseUrl: string }) {
  const authClient = getAuthClient(apiBaseUrl);

  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <a href="/" className="navbar-brand">
          Store Locator
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
