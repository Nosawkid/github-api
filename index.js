#!/usr/bin/env node
const username = process.argv[2]
if (!username) {
    console.error("Empty Username")
}

try {
    const response = await fetch(`https://api.github.com/users/${username}/events`)
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("User Not found")
        } else {
            throw new Error("Something went wrong")
        }
    }
    const data = await response.json()
    if (data.length === 0) {
        throw new Error("No Activities")
    }


    data.forEach(event => {
        const repoName = event.repo.name

        switch (event.type) {
            case "PushEvent":
                const commitCount = event.payload.commits ? event.payload.commits.length : 1
                const commitWord = commitCount === 1 ? 'commit' : 'commits';
                console.log(`- Pushed ${commitCount} ${commitWord} to ${repoName}`);
                break;

            case "WatchEvent":
                if (event.payload.action === 'started') {
                    console.log(`- Starred ${repoName}`);
                }
                break

            case "CreateEvent":
                const refType = event.payload.ref_type;
                console.log(`- Created ${refType} in ${repoName}`);
                break;

            case 'IssuesEvent':
                if (event.payload.action === 'opened') {
                    console.log(`- Opened a new issue in ${repoName}`);
                }
                break;


            default:
                console.log("Invalid Event")
        }

    })
} catch (error) {
    console.log(error.message)
}