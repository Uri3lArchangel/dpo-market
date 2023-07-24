import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export const EquityInvestmentPostApprovedPayment = async (
  username: string,
  dpopurchased: number,
  amountInvestedInUSD: number,
  walletAddress: string
) => {
  let userObject = await Prisma.user.findFirst({
    where: { username: username },
    include: {
      equityOffers: true,
    },
  });

  if (userObject) {
    if (!userObject.equityOffers) {
      await Prisma.equity.create({
        data: {
          userID: userObject.id,
          totalAmountInvested: amountInvestedInUSD,
          totalTokensToReceive: dpopurchased,
          walletAddress: walletAddress,
          isActive: true,
        },
      });

      let market = await Prisma.market.findFirst({
        where: { marketName: "DPO-MARKET" },
      });
      if (!market) {
        await Prisma.market.create({
          data: {
            marketName: "DPO-MARKET",
            primaryMarketProgress: dpopurchased,
          },
        });
      } else {
        await Prisma.market.update({
          where: { marketName: "DPO-MARKET" },
          data: {
            primaryMarketProgress: dpopurchased+market.primaryMarketProgress,
          },
        });
      }
      await disconnectDB();
      return {
        message: "Investment sucessful",
        description:
          "Await token distribution when the target amount is reached",
        type: "success",
      };
    }
    

    await Prisma.equity.updateMany({
      where: { userID: userObject.equityOffers.userID },
      data: {
        totalAmountInvested:
          userObject.equityOffers.totalAmountInvested + amountInvestedInUSD,
        totalTokensToReceive:
          userObject.equityOffers.totalTokensToReceive + dpopurchased,
        walletAddress: walletAddress,
      },
    });
  }

  let market = await Prisma.market.findFirst({
    where: { marketName: "DPO-MARKET" },
  });
  if (!market) {
    await Prisma.market.create({
      data: {
        marketName: "DPO-MARKET",
        primaryMarketProgress: dpopurchased,
      },
    });
  } else {
    await Prisma.market.update({
      where: { marketName: "DPO-MARKET" },
      data: {
        primaryMarketProgress: dpopurchased+market.primaryMarketProgress,
      },
    });
  }
  await disconnectDB();
  return {
    message: "Investment sucessful",
    description:
      "Await token distribution when the target amount is reached",
    type: "success",
  };
};

export const disconnectDB = async () => {
  await Prisma.$disconnect();
};
