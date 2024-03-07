'use strict';

module.exports = {
  routes: [ //custom routes
    {
      method: 'GET',
      path: '/tours/listAllBooking',
      handler: 'tour.listAllBooking'
    }
  ]
}
