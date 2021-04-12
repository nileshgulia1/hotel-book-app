import pretty from 'pretty';

const parseHTML = (value) => {
    let p;
    let htmlString = pretty(value);
    let doc = new DOMParser().parseFromString(htmlString, "text/html");
    if (isParseError(doc)) {
        console.log('parsing error')
        p = doc.firstChild.children[1]
        return p.innerHTML;
    }
    p = doc.firstChild;
    return p.textContent;
}

const isParseError = (parsedDocument) => {
    // parser and parsererrorNS could be cached on startup for efficiency.
    var parser = new DOMParser(),
        errorneousParse = parser.parseFromString('<', 'text/xml'),
        parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;

    if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
        return parsedDocument.getElementsByTagName("parsererror").length > 0;
    }

    return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
};

export { parseHTML, isParseError };