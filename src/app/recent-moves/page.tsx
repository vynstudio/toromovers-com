import { redirect } from "next/navigation";

/** Legacy path → DID-style city gallery slug */
export default function RecentMovesRedirect() {
  redirect("/orlando-movers-gallery");
}
