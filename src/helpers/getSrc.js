const getSrc = (embed) => {
    var str = embed;
    var regex = /<iframe.*?src="(.*?)"/g;
    var src = regex.exec(str)[1];
    return src;
}

export default getSrc