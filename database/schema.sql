set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "dogs" (
	"petfinderDogId" int NOT NULL UNIQUE,
	"photoUrl" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"breed" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	"age" TEXT NOT NULL,
	"gender" TEXT NOT NULL,
	"size" TEXT NOT NULL,
	"color" TEXT NOT NULL,
	"description" TEXT,
	"health" TEXT,
	"goodInAHomeWith" TEXT,
	"adoptionFee" int,
	"characteristics" TEXT
) WITH (
  OIDS=FALSE
);



CREATE TABLE "organizations" (
	"petfinderOrgId" int NOT NULL UNIQUE,
	"address" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"phone" int NOT NULL,
	"petfinderDogId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"location" TEXT,
	"mileRadius" TEXT,
	"breed" TEXT,
	"age" TEXT,
	"size" TEXT,
	"petOwner" TEXT,
	"typeOfOwner" TEXT,
	"currentPetsAtHome" TEXT,
	"privateOutdoorSpaces" TEXT,
	"activityLevel" TEXT,
	"openToSpecialNeeds" BOOLEAN,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "emails" (
	"emailId" serial NOT NULL,
	"userId" int NOT NULL,
	"petfinderOrgId" bigint NOT NULL,
	"petfinderDogId" int NOT NULL,
	"additionalNotes" TEXT,
	"emailSentAt" timestamptz NOT NULL,
	CONSTRAINT "emails_pk" PRIMARY KEY ("emailId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "swipes" (
	"userId" int NOT NULL,
	"petfinderDogId" int NOT NULL,
	"isLiked" BOOLEAN NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "organizations" ADD CONSTRAINT "organizations_fk0" FOREIGN KEY ("petfinderDogId") REFERENCES "dogs"("petfinderDogId");


ALTER TABLE "emails" ADD CONSTRAINT "emails_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "emails" ADD CONSTRAINT "emails_fk1" FOREIGN KEY ("petfinderOrgId") REFERENCES "organizations"("petfinderOrgId");
ALTER TABLE "emails" ADD CONSTRAINT "emails_fk2" FOREIGN KEY ("petfinderDogId") REFERENCES "dogs"("petfinderDogId");

ALTER TABLE "swipes" ADD CONSTRAINT "swipes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "swipes" ADD CONSTRAINT "swipes_fk1" FOREIGN KEY ("petfinderDogId") REFERENCES "dogs"("petfinderDogId");
