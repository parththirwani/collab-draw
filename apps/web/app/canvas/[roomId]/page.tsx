import ClientCanvasPage from "@/components/canvas/ClientCanvasPage";

export default async function Page({ params }: { params: { roomId: string } }) {
  const roomId = (await params).roomId
  console.log(roomId);
  return <ClientCanvasPage roomId={roomId} />;
}
