function Session(session) {
    return {
        title: session.title || "No title",
        description: session.description || "No description",
        speakers: session.speakers || []
    };
}

function TimeSlot(timeSlot) {
    return {
        timeSlotCode: timeSlot.timeSlotCode || Date.now(),
        start: timeSlot.start || new Date(),
        end: timeSlot.end || new Date(),
        displayTracks: timeSlot.displayTracks || false
    };
}

function Track(track) {
    return {
        name: track.name || "No name"
    };
}

function Booking(booking) {
    return {
        timeSlot: booking.timeSlot || new TimeSlot(),
        track: booking.track || new Track(),
        session: booking.session || new Session(),
        alt: booking.alt || "alt"
    };
}

function Agenda() {
    var tracks = [],
        timeSlots = [],
        bookings = [];

    function getTrack(name) {
        var filteredTracks = $.map(tracks, function(track) {
            if (track.name === name) {
                return track;
            }
        });

        return filteredTracks[0] || null;
    }

    function getTimeSlot(timeSlotCode) {
        var filteredTimeSlots = $.map(timeSlots, function(timeSlot) {
            if (timeSlot.timeSlotCode === timeSlotCode) {
                return timeSlot;
            }
        });

        return filteredTimeSlots[0] || null;
    }

    function getBookingsByTimeSlot(timeSlot, track) {
        var filteredBookings = $.map(bookings, function(booking) {
            if (booking.timeSlot.timeSlotCode === timeSlot.timeSlotCode && (track === undefined || booking.track === track)) {
                return booking;
            }
        });

        return filteredBookings;
    }

    function isOneBookingForAllTracks() {}

    return {
        tracks: tracks,
        timeSlots: timeSlots,
        bookings: bookings,
        getTrack: getTrack,
        getTimeSlot: getTimeSlot,
        getBookingsByTimeSlot: getBookingsByTimeSlot,
        isOneBookingForAllTracks: isOneBookingForAllTracks
    };
}
