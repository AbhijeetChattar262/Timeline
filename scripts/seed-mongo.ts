import { config } from "dotenv";
config({ path: ".env.local" });

import mongoose from "mongoose";
import { connectMongo } from "../src/lib/db/mongo";
import {
  EraThemeModel,
  ChapterModel,
  ScienceTieInModel,
  MediaAssetModel,
} from "../src/lib/db/models";
import { mahabharatTheme } from "../src/content/mahabharat/theme";
import { mahabharatChapters } from "../src/content/mahabharat/chapters";
import { mahabharatScienceTieIns } from "../src/content/mahabharat/scienceTieIns";
import { mahabharatMedia } from "../src/content/mahabharat/media";

// Chapter slug -> the media asset `key` (from media.ts) to use as its hero image.
const CHAPTER_HERO_MEDIA_KEY: Record<string, string> = {
  "the-field-of-dharma": "bhagavad-gita-event",
  "half-a-circle": "death-of-abhimanyu-event",
};

async function seedTheme() {
  await EraThemeModel.findOneAndUpdate(
    { eraSlug: mahabharatTheme.eraSlug },
    mahabharatTheme,
    { upsert: true, new: true }
  );
}

async function seedMedia() {
  const byKey = new Map<string, mongoose.Types.ObjectId>();
  for (const { key, ...fields } of mahabharatMedia) {
    const explicitType = (fields as { type?: string }).type;
    const type =
      explicitType ??
      ("locationSlug" in fields
        ? "map"
        : "figureSlug" in fields || "eventSlug" in fields
          ? "illustration"
          : "artifact");
    const doc = await MediaAssetModel.findOneAndUpdate(
      { eraSlug: "mahabharat", filePathOrUrl: fields.filePathOrUrl, caption: fields.caption },
      { eraSlug: "mahabharat", type, ...fields },
      { upsert: true, new: true }
    );
    byKey.set(key, doc._id);
  }
  return byKey;
}

async function seedChapters(mediaByKey: Map<string, mongoose.Types.ObjectId>) {
  for (const chapter of mahabharatChapters) {
    const heroMediaKey = CHAPTER_HERO_MEDIA_KEY[chapter.slug];
    const heroMediaId = heroMediaKey ? mediaByKey.get(heroMediaKey) : undefined;
    await ChapterModel.findOneAndUpdate(
      { eraSlug: "mahabharat", slug: chapter.slug },
      { eraSlug: "mahabharat", ...chapter, heroMediaId },
      { upsert: true, new: true }
    );
  }
}

async function seedScienceTieIns() {
  for (const tieIn of mahabharatScienceTieIns) {
    await ScienceTieInModel.findOneAndUpdate(
      { eraSlug: "mahabharat", slug: tieIn.slug },
      { eraSlug: "mahabharat", ...tieIn },
      { upsert: true, new: true }
    );
  }
}

async function main() {
  await connectMongo();
  await seedTheme();
  const mediaByKey = await seedMedia();
  await seedChapters(mediaByKey);
  await seedScienceTieIns();
  console.log(
    `Seeded MongoDB: 1 era theme, ${mediaByKey.size} media asset(s), ${mahabharatChapters.length} chapter(s), ${mahabharatScienceTieIns.length} science tie-in(s).`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
