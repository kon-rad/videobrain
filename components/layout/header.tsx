import { useAuth, signOut } from "../../lib/authContext";
import Link from "next/link";

export default function Header(props: any) {
  const { user, loading } = useAuth();

  return (
    <div className="flex h-full flex-row">
      <div className="flex-1 my-auto">
        <Link href="/">
          <div className="flex flex-row rounded">
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              width="60px"
              height="60px"
              className="rounded-xl"
            />
          </div>
        </Link>
      </div>

      <div className="m-auto space-x-6">
        {!user && !loading ? (
          <>
            <Link passHref href="/signup">
              <button className="m-auto"> Signup</button>
            </Link>

            <Link passHref href="/signin">
              <button className="m-auto"> Signin</button>
            </Link>
          </>
        ) : null}
        {user ? (
          <>
            <Link href="/space/video" className="mx-4">
              <button>Search</button>
            </Link>
            <Link href="/space/create" className="mx-4">
              <button>Create Space</button>
            </Link>

            <Link href="/space/list" className="mx-4">
              <button>Spaces</button>
            </Link>

            <button onClick={signOut}> Signout</button>
          </>
        ) : null}
      </div>
    </div>
  );
}
