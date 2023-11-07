import HttpError from '@wasp/core/HttpError.js'

export const getDriverLocation = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const driver = await context.entities.Driver.findUnique({
    where: { id: args.driverId },
    select: { location: true }
  });

  if (!driver) throw new HttpError(404, `No driver with id ${args.driverId}`);

  return driver.location;
}

export const getUserBookings = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Booking.findMany({
    where: {
      userId: args.userId
    }
  });
}