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

    var agendaTable = $("#agenda table");
    $.each(agenda.tracks, function(i, track) {
        agendaTable.find("thead tr").append($("<td/>", {text: track.name}));
    });

})();
