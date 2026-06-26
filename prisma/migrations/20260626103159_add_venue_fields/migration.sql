-- AlterTable
ALTER TABLE "Booking" ADD COLUMN "pax" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Listing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "roomCount" INTEGER NOT NULL,
    "bathroomCount" INTEGER NOT NULL,
    "guestCount" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "exterior360" TEXT,
    "interior360" TEXT,
    "floorPlan" TEXT,
    "mapUrl" TEXT,
    "pricingTiers" TEXT NOT NULL DEFAULT '[]',
    "paymentTerms" TEXT NOT NULL DEFAULT '[]',
    "inclusions" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Listing" ("bathroomCount", "category", "createdAt", "description", "guestCount", "id", "imageSrc", "location", "price", "roomCount", "title", "updatedAt", "userId") SELECT "bathroomCount", "category", "createdAt", "description", "guestCount", "id", "imageSrc", "location", "price", "roomCount", "title", "updatedAt", "userId" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
