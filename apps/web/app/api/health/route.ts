export async function GET() {
  return Response.json({
    status: "ok",
    service: "ani-manager-web",
    checkedAt: new Date().toISOString()
  });
}
