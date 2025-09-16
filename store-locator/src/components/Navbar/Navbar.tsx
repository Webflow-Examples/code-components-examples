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

  const handleLogin = () => {
    // Use the client's built-in signIn method. It will handle the redirect
    // and automatically return the user to this page.
    //@ts-expect-error - signIn is not typed
    authClient.signIn.social({
      provider: "webflow",
      callbackURL: `${import.meta.env.BASE_URL}/setup`,
    });
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <a href={apiBaseUrl} className="navbar-brand">
          {title}
        </a>
        <div className="navbar-links">
          {isPending ? (
            <div>Loading...</div>
          ) : (
            <>
              <a href={apiBaseUrl} className="navbar-link">
                Home
              </a>
              <a href={apiBaseUrl + "/setup"} className="navbar-link">
                Setup
              </a>
              <a href={apiBaseUrl + "/docs"} className="navbar-link">
                Docs
              </a>
              {session ? (
                <button
                  onClick={() => authClient.signOut()}
                  className="navbar-button logout"
                >
                  Logout
                </button>
              ) : (
                <button onClick={handleLogin} className="navbar-button">
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
