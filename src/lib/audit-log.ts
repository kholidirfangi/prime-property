import { prisma } from "@/lib/prisma";

type AuditInput = {
  action: string;

  entityType: string;
  entityId?: string;

  description?: string;

  performedById: string;
};

export async function createAuditLog(
  data: AuditInput,
) {
  await prisma.auditLog.create({
    data,
  });
}