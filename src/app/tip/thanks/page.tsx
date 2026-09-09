import { redirect } from "next/navigation";

export default async function TipThanksRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const sessionId = Array.isArray(params.session_id)
    ? params.session_id[0]
    : params.session_id;
  redirect(sessionId ? `/pay/thanks?session_id=${sessionId}` : "/pay");
}
