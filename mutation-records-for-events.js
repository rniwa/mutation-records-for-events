
function decorateEventWithMutationRecords(element, eventName) {
    function createMutationObserver(observer) {
        var observer;
        if (window.WebKitMutationObserver)
            observer = new WebKitMutationObserver(observer);
        return observer && observer.takeRecords ? observer : null;
    }

    var mutationRecords = [];
    var mutationObserver = createMutationObserver(function (records) {
        mutationRecords.concat(records);
    });
    mutationObserver.observe(element, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });

    element.addEventListener(eventName, function (event) {
        event.mutationRecords = mutationRecords.concat(mutationObserver.takeRecords());
        mutationRecords = [];
    });
}
