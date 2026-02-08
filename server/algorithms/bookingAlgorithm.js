// Booking Algorithm (Slot Availability Check)
// Purpose: Check if a requested time slot is available for a salon.

const bookingAlgorithm = (existingBookings, requestedDate, requestedTime) => {
    // Simple logic: check if any confirmed booking exists for the same date and time.

    const conflict = existingBookings.find(booking =>
        booking.date === requestedDate &&
        booking.time === requestedTime &&
        booking.status !== 'cancelled'
    );

    return !conflict; // Returns true if available
};

module.exports = bookingAlgorithm;
