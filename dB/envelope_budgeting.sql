CREATE TABLE "users" (
  "username" varchar PRIMARY KEY,
  "full_name" varchar not null,
  "password" varchar not null,
  "created_at" timestamp
);

CREATE TABLE "envelopes" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar not null,
  "budget" int
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar not null,
  "value" int not null,
  "envelope_id" int not null,
  "time" timestamp
);

CREATE TABLE "envelopes_users" (
  "envelope_id" int,
  "username" varchar,
  PRIMARY Key(envelope_id, username)
);

CREATE TABLE "transactions_envelopes" (
  "envelope_id" int,
  "transaction_id" int,
  PRIMARY Key(envelope_id, transaction_id)
);

ALTER TABLE "transactions" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "transactions" ADD FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id");

ALTER TABLE "envelopes_users" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "envelopes_users" ADD FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id");
