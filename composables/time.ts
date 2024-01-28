export const timeAgo = (time) => {
    const between = Date.now() / 1000 - new Date(time).getTime() / 1000
    if (between < 3600) {
        return pluralize(~~(between / 60), ' Minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' Stunde')
    }
}
const pluralize = (time, label) => {
    if (time === 1) {
        return time + label
    }
    return time + label + 'n'
}

export const timeAhead = (time) => {
    const between = new Date(time).getTime() / 1000 - Date.now() / 1000
    if (between < 3600) {
        return pluralize(~~(between / 60), ' Minute')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' Stunde')
    }
}
export const timeDiff = (time) => {
    // either ago or ahead 'in' / 'vor'
    const between = new Date(time).getTime() / 1000 - Date.now() / 1000

    if (between < 0) {
        return 'vor ' + timeAgo(time)
    } else {
        return 'in ' + timeAhead(time)
    }
}

