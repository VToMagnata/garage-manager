-- CreateTable
CREATE TABLE "Vagancie" (
    "number" TEXT NOT NULL,
    "busy" BOOLEAN NOT NULL DEFAULT false,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "value" DOUBLE PRECISION NOT NULL,
    "feriasIs" BOOLEAN NOT NULL DEFAULT false,
    "feriasExit" TEXT,
    "feriasReturn" TEXT,

    CONSTRAINT "Vagancie_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "vagaNumber" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpf_key" ON "Client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Client_vagaNumber_key" ON "Client"("vagaNumber");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_vagaNumber_fkey" FOREIGN KEY ("vagaNumber") REFERENCES "Vagancie"("number") ON DELETE SET NULL ON UPDATE CASCADE;
