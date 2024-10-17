import { FixOrder, PrismaClient } from 'prisma/prisma-client';
import { EmailService } from '../utils/email.service';
import { randomUUID } from 'crypto';
import generateReceiptWithTerms from './generateFixOrderPdf';

export class FixOrderService {
  static async getAll() {
    const prisma = new PrismaClient();
    const results = await prisma.fixOrder.findMany();
    await prisma.$disconnect();
    return results;
  }

  static async getSearch(dt: {
    searchKey: any;
    page: any;
    perPage: any;
    sortBy?: any;
    isAsc?: any;
  }) {
    const prisma = new PrismaClient();
    const { searchKey, page, perPage, sortBy, isAsc } = dt;
    const currentSortBy = !sortBy || sortBy === '' ? 'createdAt' : sortBy;
    const currentIsAsc = isAsc !== 'desc' ? 'asc' : 'desc';
    const skip = page * perPage;
    const brands = await prisma.fixOrder.findMany({
      where: {
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  user: {
                    name: {
                      contains: searchKey,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  reference: isNaN(parseInt(searchKey))
                    ? undefined
                    : parseInt(searchKey),
                },
              ]
            : undefined,
      },
      include: {
        user: true,
      },
      orderBy: {
        [currentSortBy]: isAsc === 'true' ? 'asc' : 'desc',
      },
      skip: skip,
      take: parseInt(perPage),
    });
    const total = await prisma.fixOrder.count({
      where: {
        OR:
          searchKey && searchKey !== ''
            ? [
                {
                  user: {
                    name: {
                      contains: searchKey,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  reference: isNaN(parseInt(searchKey))
                    ? undefined
                    : parseInt(searchKey),
                },
              ]
            : undefined,
      },
    });
    prisma.$disconnect();
    return {
      data: brands,
      total,
    };
  }

  static async insert(data: any) {
    console.log('data', data);
    const prisma = new PrismaClient();
    let id = data?.id;
    if (!!data?.id && data?.id !== '') {
      console.log('data.id in update condition', data.id);
      // get currentOrder
      const currentOrder = await prisma.fixOrder.findUnique({
        where: {
          id: data.id,
        },
        include: {
          repairs: true,
          fixes: true,
          user: true,
          devices: true,
        },
      });

      // remove all fixes
      await prisma.fix.deleteMany({
        where: {
          id: {
            in: currentOrder?.fixes?.map((f: any) => f.id),
          },
        },
      });

      const newFixes = await prisma.fix.createMany({
        data: data.fixes.map((f: any) => ({
          ...f,
          orderId: data.id,
        })),
      });
      if (!newFixes || !Array.isArray(newFixes)) {
        // return null;
      }

      const updated = await prisma.fixOrder.update({
        where: {
          id: data.id,
        },
        data: {
          user: {
            connect: {
              id: data.user.id,
            },
          },
          devices: {
            disconnect: currentOrder?.devices?.map((d: any) => ({
              id: d.id,
            })),
            connect: data.devices.map((d: any) => ({
              id: d.id,
            })),
          },
          repairs: {
            disconnect: currentOrder?.repairs.map((r: any) => ({
              id: r.id,
            })),
            connect: data.repairs.map((r: any) => ({
              id: r.id,
            })),
          },
          problems: data.problems,
          userNote: data.userNote,
          maintenanceNote: data.maintenanceNote,
          expectedDateToFix: new Date(data.expectedDateToFix),
          status: data.status,
          price: data.price,
          vat: data.vat,
          discount: data.discount,
          totalPrice: data.totalPrice,
          doneAt: data.status === 'DONE' ? new Date() : null,
          receivedAt: data.status === 'RECEIVED' ? new Date() : null,
          cancelledAt: data.status === 'CANCELED' ? new Date() : null,
          tokenAt: data.status === 'TOKEN' ? new Date() : null,
          updatedAt: new Date(),
        },
      });
    } else {
      console.log('data.id in insert', data.id);
      const inserted = await prisma.fixOrder.create({
        data: {
          user: {
            connect: {
              id: data.user.id,
            },
          },
          devices: {
            connect: data.devices.map((d: any) => ({
              id: d.id,
            })),
          },
          repairs: {
            connect: data.repairs.map((r: any) => ({
              id: r.id,
            })),
          },
          problems: data.problems,
          userNote: data.userNote,
          maintenanceNote: data.maintenanceNote,
          expectedDateToFix: new Date(data.expectedDateToFix),
          status: data.status,
          price: data.price,
          vat: data.vat,
          discount: data.discount,
          timeToFixMinutes: data.timeToFixMinutes,
          totalPrice: data.totalPrice,
          doneAt: data.status === 'DONE' ? new Date() : null,
          receivedAt: data.status === 'RECEIVED' ? new Date() : null,
          cancelledAt: data.status === 'CANCELED' ? new Date() : null,
          tokenAt: data.status === 'TOKEN' ? new Date() : null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log('inserted', inserted);

      // create fixes
      const insertedNewFixes = await prisma.fix.createMany({
        data: data.fixes.map((c: any) => ({
          id: randomUUID(),
          ...c,
          orderId: inserted.id,
        })),
      });

      if (!insertedNewFixes || !Array.isArray(insertedNewFixes)) {
        // return null;
      }

      id = inserted.id;
    }

    const currentOrder = await prisma.fixOrder.findUnique({
      where: {
        id,
      },
      include: {
        repairs: true,
        fixes: true,
        user: true,
        devices: true,
      },
    });
    await prisma.$disconnect();

    await generateReceiptWithTerms(currentOrder);

    // send Email to user
    await EmailService.sendEmail({
      to: data.user.email,
      subject: 'Fix Order',
      text: `Your order has been ${data.status} check your order at ${process.env.WEB_URL}/fix-order/${id}`,
      html: `<p>Your order has been ${data.status}</p> <a href="${process.env.WEB_URL}/fix-order/${id}">Check your order</a>`,
      attachments: [],
    });

    return id;
  }

  static async update(id: string, data: FixOrder) {
    const prisma = new PrismaClient();
    const updated = await prisma.fixOrder.update({
      where: { id },
      data,
    });
    await prisma.$disconnect();
    return updated;
  }

  static async delete(id: string) {
    const prisma = new PrismaClient();
    const deleted = await prisma.fixOrder.delete({
      where: { id },
    });
    await prisma.$disconnect();
    return deleted;
  }

  static async getById(id: string | null) {
    if (!id) {
      return null;
    }

    const prisma = new PrismaClient();
    const result = await prisma.fixOrder.findUnique({
      where: { id },
      include: {
        repairs: true,
        user: true,
      },
    });
    await prisma.$disconnect();
    return result;
  }
}
