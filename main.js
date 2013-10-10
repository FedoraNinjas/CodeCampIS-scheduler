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

    var agendaTBody = agendaTable.children("tbody");
    _.each(groupedBookings, function(group, key) {
        group = _.sortBy(group, function(session) {
            return session.track.name;
        });

        // gaaaah
        var hours = group[0].timeSlot.start.getHours();
        hours = hours < 10 ? "0" + hours.toString() : hours.toString();
        var minutes = group[0].timeSlot.start.getMinutes();
        minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();

        var slotRow = agendaTBody.append("<tr/>");
        slotRow.append($("<td/>", {text: hours + ":" + minutes}));
        _.each(group, function(booking) {
            slotRow.append($("<td/>", {text: booking.session.title}));
        });
    });
})();
