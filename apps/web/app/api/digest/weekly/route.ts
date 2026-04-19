import {
  buildRecommendationDigest,
  buildWatchlist,
  buildWeeklyDigest,
  createSampleProfile
} from "@ani-manager/ai-core";
import { buildSeasonLineup } from "@ani-manager/content-ingestion";

export async function GET() {
  const profile = createSampleProfile();
  const catalog = buildSeasonLineup();
  const digest = buildRecommendationDigest({ profile, catalog });
  const watchlist = buildWatchlist({ catalog, digest });

  return Response.json(buildWeeklyDigest({ profile, digest, watchlist }));
}
