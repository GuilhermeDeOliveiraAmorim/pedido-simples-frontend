import ConfirmLoginChangeInner from "./ConfirmLoginChangeInner";

export default function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return <ConfirmLoginChangeInner token={searchParams.token} />;
}
