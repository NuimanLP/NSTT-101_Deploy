module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/bookings/user/findUserBookings',
        handler: 'booking.findUserBookings',
      },
      {
        method: 'PUT',
        path: '/bookings/:id/update-payment-status',
        handler: 'booking.updatePaymentStatus',
      },
      {
        method: 'PUT',
        path: '/bookings/:id/Check',
        handler: 'booking.Check'
      }
    ],
  };
  