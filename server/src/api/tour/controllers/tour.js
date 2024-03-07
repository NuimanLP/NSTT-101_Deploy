'use strict';

/**
 * tour controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tour.tour', ({ strapi }) => ({
    async listAllBooking() {
        let tour = await strapi.db.query('api::tour.tour').findMany({
            populate: {
                Booking: {
                    populate: {
                        Receipt: true
                    }
                }
            },
        })
        return tour
    }
}))
