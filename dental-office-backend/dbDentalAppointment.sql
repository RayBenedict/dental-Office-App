CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "phone" VARCHAR(20),
  "photo_url" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "dentists" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE,
  "specialization" VARCHAR(100),
  "photo_url" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "appointments" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "dentist_id" INT NOT NULL,
  "appointment_date" TIMESTAMP NOT NULL,
  "status" VARCHAR(20) DEFAULT 'scheduled',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_dentist_booking UNIQUE ("dentist_id", "appointment_date"),
  CONSTRAINT check_status CHECK ("status" IN ('scheduled', 'completed', 'canceled'))
);

CREATE TABLE "notifications" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "appointment_id" INT NOT NULL,
  "notification_type" VARCHAR(50),
  "sent_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "audit_logs" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "action" VARCHAR(255) NOT NULL,
  "details" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Foreign Keys
ALTER TABLE "appointments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "appointments" ADD FOREIGN KEY ("dentist_id") REFERENCES "dentists" ("id") ON DELETE CASCADE;
ALTER TABLE "notifications" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "notifications" ADD FOREIGN KEY ("appointment_id") REFERENCES "appointments" ("id") ON DELETE CASCADE;
ALTER TABLE "audit_logs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL;
