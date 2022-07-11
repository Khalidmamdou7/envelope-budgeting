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

ALTER TABLE "transactions" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "transactions" ADD FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id");

ALTER TABLE "envelopes_users" ADD FOREIGN KEY ("username") REFERENCES "users" ("username");

ALTER TABLE "envelopes_users" ADD FOREIGN KEY ("envelope_id") REFERENCES "envelopes" ("id");

CREATE FUNCTION env_transaction() RETURNS trigger AS $env_transaction$
    BEGIN
        UPDATE envelopes set budget = budget - NEW.value WHERE id = NEW.envelope_id;
        return NEW;
    END;
$env_transaction$ LANGUAGE plpgsql;

CREATE TRIGGER env_transaction BEFORE INSERT OR UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION env_transaction();