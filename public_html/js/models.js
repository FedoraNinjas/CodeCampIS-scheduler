function Session(session) {
    return {
        title: session.title || "No title",
        description: session.description || "No description",
        speakers: session.speakers || []
    };
}
