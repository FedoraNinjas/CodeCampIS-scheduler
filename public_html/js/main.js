(function() {
    var sessions = [];
    registerSessions(sessions, function(speaker) {
        return speaker;
    });

    var agenda = Agenda();
    registerAgenda(agenda, function(sessionTitle) {
        var filteredSessions = $.map(sessions, function(session) {
            if (session.title === sessionTitle) {
                return session;
            }
        });

        return filteredSessions[0] || null;
    });

    // sort the tracks... kinda
    agenda.tracks = _.sortBy(agenda.tracks, function(track) {
        return track.name;
    });

    var agendaTable = $("#agenda table");
    $.each(agenda.tracks, function(i, track) {
        agendaTable.find("thead tr").append($("<td/>", {text: track.name}));
    });

    var groupedBookings = _.groupBy(agenda.bookings, function(booking) {
        return booking.timeSlot.start;
    });

    _.each(groupedBookings, function(group, key) {
        group = _.sortBy(group, function(session) {
            return session.track.name;
        });
    });
})();
