import { connectMongo } from "@/lib/db/mongo";
import { ScienceTieInModel } from "@/lib/db/models";
import type { ScienceTieIn } from "@/types/era";

export async function getScienceTieIns(eraSlug: string): Promise<ScienceTieIn[]> {
  await connectMongo();
  return ScienceTieInModel.find({ eraSlug }).lean<ScienceTieIn[]>();
}
