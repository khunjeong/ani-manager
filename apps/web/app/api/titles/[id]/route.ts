import { getCatalogEntryById } from "@ani-manager/content-ingestion";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const entry = getCatalogEntryById(params.id);

  if (!entry) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }

  return Response.json(entry);
}
