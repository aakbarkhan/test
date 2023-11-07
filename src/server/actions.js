import HttpError from '@wasp/core/HttpError.js'

export const createChat = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { userId, driverId, message } = args;

  const user = await context.entities.User.findUnique({
    where: { id: userId }
  });

  const driver = await context.entities.Driver.findUnique({
    where: { id: driverId }
  });

  if (!user || !driver) { throw new HttpError(404) }

  return context.entities.Chat.create({
    data: {
      userId,
      driverId,
      message
    }
  });
}

export const createBooking = async ({ userId, driverId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: userId }
  });
  const driver = await context.entities.Driver.findUnique({
    where: { id: driverId }
  });

  if (!user || !driver) { throw new HttpError(404) };

  return context.entities.Booking.create({
    data: {
      userId: user.id,
      driverId: driver.id
    }
  });
}

export const updateDriverLocation = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const driver = await context.entities.Driver.findUnique({
    where: { id: args.driverId }
  });
  if (driver.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Driver.update({
    where: { id: args.driverId },
    data: { location: args.location }
  });
}