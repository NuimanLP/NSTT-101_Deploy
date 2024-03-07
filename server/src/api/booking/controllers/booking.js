'use strict';

const booking = require('../routes/booking');

const { createCoreController } = require('@strapi/strapi').factories;

//Correct the DATE format
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

module.exports = createCoreController('api::booking.booking', ({ strapi }) => ({
    async findUserBookings(ctx) {
        if (!ctx.state.user) {
            return ctx.badRequest('No user found.');
        }

        try {
            const entities = await strapi.entityService.findMany('api::booking.booking', {
                filters: {
                    owner: ctx.state.user.id,
                },
                populate: {
                    Receipt: true,
                    Tour_Table: true
                }
            });

            // console.log(entities);

            const bookings = entities.map(entity => ({
                BookingID: entity.id,
                BookingDate: formatDate(entity.BookingDate),
                Amount: entity.Amount,
                Total_Price: entity.Total_Price,
                PaymentStatus: entity.PaymentStatus,
                Receipt: entity.Receipt,
                EventName: entity.Tour_Table.EventName,
                EventDetail: entity.Tour_Table.EventDescription,
                TourDateInit: formatDate(entity.Tour_Table.TourDateInit),
                TourDateFinish: formatDate(entity.Tour_Table.TourDateFinish),
                Price: entity.Tour_Table.Price,
                Username: ctx.state.user.username
            }));
            return bookings;
        } catch (error) {
            strapi.log.error('findUserBookings:error', error);
            return ctx.internalServerError('Unable to fetch user bookings.');
        }
    },


    async updatePaymentStatus(ctx) {
        const { id } = ctx.params;
        // @ts-ignore
        const { PaymentStatus } = ctx.request.body;

        // Validate PaymentStatus
        if (!PaymentStatus) {
            return ctx.badRequest('PaymentStatus must be provided.');
        }

        try {
            const existingBooking = await strapi.entityService.findOne('api::booking.booking', id);
            if (!existingBooking) {
                return ctx.notFound('Booking not found.');
            }

            const updatedBooking = await strapi.entityService.update('api::booking.booking', id, {
                data: { PaymentStatus },
            });

            return ctx.send({ data: updatedBooking });
        } catch (error) {
            strapi.log.error('updatePaymentStatus:error', error);
            return ctx.internalServerError('Failed to update PaymentStatus.');
        }
    },
    async Check(ctx) {
        const entityId = ctx.params.id;
        const updated = await strapi.entityService.update('api::booking.booking', entityId, {
            data: {
                PaymentStatus: "เสร็จสมบูรณ์"
            }
        })
        return "ตรวจสอบเรียบร้อย"
    }
}));