# GitHub Activity CLI

A simple command-line tool to fetch and display recent GitHub activity for any public user.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher (required for native `fetch` and top-level `await`)

## Installation

1. Clone or download the repository from **https://github.com/Nosawkid/github-api**:
   ```bash
   git clone https://github.com/Nosawkid/github-api.git
   cd github-api
   ```

2. Install the package globally so you can run it from anywhere:
   ```bash
   npm install -g .
   ```

## Usage

```bash
github-activity <username>
```

### Examples

```bash
github-activity Nosawkid
```

**Output:**
```
- Pushed 1 commit to Nosawkid/Api-Health-Monitor
- Created branch in Nosawkid/Api-Health-Monitor
- Starred nestjs/nest
- Pushed 1 commit to Nosawkid/utrack-fe
- Created branch in Nosawkid/utrack-fe
```

## Event Types Supported

| Event | Output |
|---|---|
| `PushEvent` | `Pushed N commit(s) to <repo>` |
| `WatchEvent` | `Starred <repo>` |
| `CreateEvent` | `Created <branch/tag/repo> in <repo>` |
| `IssuesEvent` | `Opened a new issue in <repo>` |

## Error Handling

| Scenario | Message |
|---|---|
| No username provided | `Empty Username` |
| User does not exist | `User Not found` |
| User has no public activity | `No Activities` |
| Any other API failure | `Something went wrong` |

## Notes

- This tool uses the [GitHub Events API](https://docs.github.com/en/rest/activity/events), which is **unauthenticated** by default and subject to a rate limit of **60 requests per hour** per IP address.
- Only **public activity** is returned by the API.
- The GitHub API returns a maximum of the **last 90 days** of activity, capped at **300 events**.

## Uninstall

```bash
npm uninstall -g github-api
```